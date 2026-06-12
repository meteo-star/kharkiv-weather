/* ============================================================
   v2.js — Meteo Star V2 «Живое небо» (кодовое имя SKY)
   ------------------------------------------------------------
   Загружается СРАЗУ после app.js (оба не defer, в конце body),
   поэтому видит все его глобалы: renderAll, applyTranslations,
   getForecast, NOW_HOUR, ACTIVE_FORECAST_BY_MODEL, currentSourceId,
   state (язык/тема/единицы), t() и т.д.

   ЖЕЛЕЗНОЕ ПРАВИЛО: app.js НЕ редактируется. Связь — monkey-patch
   перезаписываемых top-level function-биндингов классического скрипта.
   Внутренние вызовы renderAll() из app.js резолвятся через тот же
   глобальный биндинг → попадают в нашу обёртку.

   Этап 0: каркас. Объект V2, хуки, диагностика. Подсистемы —
   заглушки, наполняются на этапах 1–7.
   ============================================================ */
(function () {
  'use strict';

  // Каркас работает только на v2.html (body.v2). На классической index.html
  // скрипт не подключён, но двойная защита не мешает.
  if (!document.body || !document.body.classList.contains('v2')) return;

  const DEBUG = /[?&]v2debug\b/.test(location.search);

  /* ---- утилиты ---- */
  const raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (cb) => setTimeout(cb, 16);

  /** Безопасный доступ к языку app.js (state.lang). */
  function currentLang() {
    try { return (typeof state === 'object' && state && state.lang) || 'ru'; }
    catch (_) { return 'ru'; }
  }

  /** Прогноз выбранного источника (как его видит app.js). */
  function activeForecast() {
    try {
      if (typeof getForecast === 'function' && typeof currentSourceId !== 'undefined') {
        return getForecast(currentSourceId);
      }
    } catch (_) {}
    return null;
  }

  /* ============================================================
     Объект V2 — единая точка входа sky-движка.
     На этапе 0 подсистемы пустые; структура зафиксирована, чтобы
     этапы 1–7 наполняли её, не меняя контракт хуков.
     ============================================================ */
  const V2 = {
    version: 'stage-0',
    booted: false,

    // диагностика: сколько раз сработали хуки (видно в DevTools: V2.hooks)
    hooks: { renderAll: 0, applyTranslations: 0 },

    // подсистемы (наполняются позже)
    sky: null,       // этап 1–2: канвас-сцена
    skyline: null,   // этап 2: SVG-силуэт города
    time: null,      // этап 4: «линза времени»
    briefing: null,  // этап 3: строка-брифинг
    odometer: null,  // этап 3: барабанные цифры
    dock: null,      // этап 5: навигация + scrollspy
    glassFx: null,   // этап 7: капли/иней/марево на hero

    /* Вызывается ПОСЛЕ оригинального renderAll(): обновить небо,
       брифинг, одометр, ленту-скраб под свежие данные/источник. */
    afterRenderAll() {
      this.hooks.renderAll++;
      if (DEBUG) {
        const f = activeForecast();
        console.log('[V2] afterRenderAll #' + this.hooks.renderAll,
          '· source=' + (typeof currentSourceId !== 'undefined' ? currentSourceId : '?'),
          '· NOW_HOUR=' + (typeof NOW_HOUR !== 'undefined' ? NOW_HOUR : '?'),
          '· forecast=' + (f ? 'ok' : 'null'));
      }
      // этап 1+: this.sky && this.sky.update(...) и т.д.
    },

    /* Вызывается ПОСЛЕ оригинального applyTranslations(): перевести
       v2-элементы из V2_I18N по текущему языку (этап 3+). */
    applyTranslations() {
      this.hooks.applyTranslations++;
      if (DEBUG) console.log('[V2] applyTranslations #' + this.hooks.applyTranslations + ' · lang=' + currentLang());
      // этап 3+: пробег по [data-v2-i18n] из словаря V2_I18N
    },

    /* Однократная инициализация: создать канвас/док/линзу. На этапе 0
       только фиксируем готовность и синхронизируемся с уже отрисованным
       состоянием (bootstrap app.js успел вызвать applyAll до нашего патча). */
    init() {
      if (this.booted) return;
      this.booted = true;
      // догоняем текущее состояние (первый синхронный applyAll прошёл до патча)
      this.applyTranslations();
      this.afterRenderAll();
      if (DEBUG) console.log('[V2] init() выполнен, version=' + this.version);
    }
  };

  // экспонируем для отладки из DevTools
  window.V2 = V2;

  /* ============================================================
     MONKEY-PATCH render-хуков app.js.
     Сохраняем оригинал, оборачиваем. Если по какой-то причине
     биндинг не функция — тихо пропускаем (не валим v1-логику).
     ============================================================ */
  function patch(name, after) {
    try {
      const orig = window[name];
      if (typeof orig !== 'function') {
        if (DEBUG) console.warn('[V2] не удалось пропатчить ' + name + ' (не функция)');
        return false;
      }
      window[name] = function patched() {
        const r = orig.apply(this, arguments);
        try { after.call(V2); } catch (e) { console.warn('[V2] ошибка в хуке ' + name + ':', e); }
        return r;
      };
      return true;
    } catch (e) {
      console.warn('[V2] patch(' + name + ') исключение:', e);
      return false;
    }
  }

  const okRender = patch('renderAll', V2.afterRenderAll);
  const okI18n = patch('applyTranslations', V2.applyTranslations);

  if (DEBUG) {
    console.log('[V2] monkey-patch: renderAll=' + okRender + ', applyTranslations=' + okI18n);
  }

  // Fallback на случай, если renderAll так и не вызовется (страховка из ТЗ §5):
  // MutationObserver на контейнер дней — если app.js перерисовал дни в обход
  // нашего хука, всё равно догоним сцену. На этапе 0 просто счётчик в DEBUG.
  if (!okRender && DEBUG) {
    const target = document.getElementById('daysGrid');
    if (target) {
      new MutationObserver(() => V2.afterRenderAll())
        .observe(target, { childList: true });
      console.log('[V2] включён MutationObserver-fallback на #daysGrid');
    }
  }

  /* запуск init после готовности DOM (DOM уже готов — app.js отработал внизу body,
     но подстрахуемся requestAnimationFrame, чтобы первый кадр прошёл). */
  raf(() => V2.init());

})();
