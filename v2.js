/* ============================================================
   v2.js — Meteo Star V2 «Живое небо» (кодовое имя SKY)
   ------------------------------------------------------------
   Загружается СРАЗУ после app.js (оба не defer, в конце body),
   поэтому видит все его глобалы: renderAll, applyTranslations,
   getForecast, NOW_HOUR, currentSourceId, state, t() и т.д.

   ЖЕЛЕЗНОЕ ПРАВИЛО: app.js НЕ редактируется. Связь — monkey-patch
   перезаписываемых top-level function-биндингов классического скрипта.

   Этап 0: каркас + хуки (готово).
   Этап 1: ядро sky-движка — канвас, градиент по солнцу, звёзды,
           луна с фазой, солнце-диск, облака по cloud_cover.
   ============================================================ */
(function () {
  'use strict';

  if (!document.body || !document.body.classList.contains('v2')) return;

  const DEBUG = /[?&]v2debug\b/.test(location.search);
  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (cb) => setTimeout(() => cb(performance.now()), 16);
  const caf = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : clearTimeout;

  const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  function smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /* ---- безопасные обёртки над глобалами app.js ---- */
  function currentLang() {
    try { return (typeof state === 'object' && state && state.lang) || 'ru'; }
    catch (_) { return 'ru'; }
  }
  function activeForecast() {
    try {
      if (typeof getForecast === 'function' && typeof currentSourceId !== 'undefined') {
        return getForecast(currentSourceId);
      }
    } catch (_) {}
    return null;
  }
  function nowHour() {
    try { return (typeof NOW_HOUR !== 'undefined' && NOW_HOUR != null) ? NOW_HOUR : new Date().getHours(); }
    catch (_) { return new Date().getHours(); }
  }

  /* ============================================================
     ЦВЕТ — утилиты (sRGB lerp между соседними фазами достаточно
     плавный, т.к. блендим только родственные палитры — без хаотичных
     hue-переходов через грязный серый).
     ============================================================ */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToCss(rgb, a) {
    const r = Math.round(rgb[0]), g = Math.round(rgb[1]), b = Math.round(rgb[2]);
    return a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
  }
  function rgbToHex(rgb) {
    const h = (v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
    return '#' + h(rgb[0]) + h(rgb[1]) + h(rgb[2]);
  }
  function mixRgb(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }

  /* ============================================================
     ПАЛИТРЫ НЕБА (ключевые кадры из ТЗ §5).
     Каждая фаза: [верх, середина, горизонт, акцент].
     ============================================================ */
  const PH = {
    night: ['#050714', '#0b1026', '#1a2140', '#6d7bd6'],
    dawn:  ['#2b2a4a', '#7a4b6e', '#ffd9a0', '#ffb27a'],
    day:   ['#3b82d9', '#7ab8f0', '#cfe8ff', '#4aa3ff'],
    dusk:  ['#1f2a5e', '#714674', '#ffc46b', '#ff9d5c']
  };
  const GREY_DAY   = ['#5a6678', '#8b97a8', '#b9c2cf', '#7d8aa0'];
  const GREY_NIGHT = ['#0a0d18', '#141a2a', '#1b2233', '#4a5575'];
  // предразбор в rgb
  const RGB = {};
  for (const k in PH) RGB[k] = PH[k].map(hexToRgb);
  const RGB_GREY_DAY = GREY_DAY.map(hexToRgb);
  const RGB_GREY_NIGHT = GREY_NIGHT.map(hexToRgb);

  function blendPhase(a, b, t) {
    return [mixRgb(a[0], b[0], t), mixRgb(a[1], b[1], t), mixRgb(a[2], b[2], t), mixRgb(a[3], b[3], t)];
  }

  /* Палитра по высоте солнца elev∈[-1..1], rising (утро/вечер) и облачности. */
  function skyPalette(elev, rising, cloudPct) {
    let pal;
    if (elev >= 0.22) {
      pal = RGB.day;
    } else if (elev <= -0.12) {
      pal = RGB.night;
    } else {
      const twi = (elev + 0.12) / 0.34; // 0(ночь) .. 1(день)
      if (rising) {
        // ночь → рассвет → день
        if (twi < 0.5) pal = blendPhase(RGB.night, RGB.dawn, twi / 0.5);
        else pal = blendPhase(RGB.dawn, RGB.day, (twi - 0.5) / 0.5);
      } else {
        // день → закат → ночь
        if (twi > 0.5) pal = blendPhase(RGB.day, RGB.dusk, (1 - twi) / 0.5);
        else pal = blendPhase(RGB.dusk, RGB.night, (0.5 - twi) / 0.5);
      }
    }
    // Пасмурный модификатор: тянем к серому, сила = облачность.
    const cloudK = clamp(cloudPct / 100, 0, 1) * 0.72;
    if (cloudK > 0.001) {
      const dayMix = smoothstep(-0.15, 0.25, elev); // 0 ночь → 1 день
      const grey = [
        mixRgb(RGB_GREY_NIGHT[0], RGB_GREY_DAY[0], dayMix),
        mixRgb(RGB_GREY_NIGHT[1], RGB_GREY_DAY[1], dayMix),
        mixRgb(RGB_GREY_NIGHT[2], RGB_GREY_DAY[2], dayMix),
        mixRgb(RGB_GREY_NIGHT[3], RGB_GREY_DAY[3], dayMix)
      ];
      pal = [
        mixRgb(pal[0], grey[0], cloudK),
        mixRgb(pal[1], grey[1], cloudK),
        mixRgb(pal[2], grey[2], cloudK * 0.85), // горизонт держим чуть теплее
        mixRgb(pal[3], grey[3], cloudK * 0.5)
      ];
    }
    return pal; // [topRgb, midRgb, horRgb, accentRgb]
  }

  /* ============================================================
     СОЛНЕЧНАЯ ГЕОМЕТРИЯ
     elev ≈ sin(π·dayProgress); ночью — отрицательная.
     ============================================================ */
  function hhmmToMin(s) {
    if (!s || typeof s !== 'string') return null;
    const m = s.match(/(\d{1,2}):(\d{2})/);
    if (!m) return null;
    return (+m[1]) * 60 + (+m[2]);
  }
  function solarState(nowMin, sunriseMin, sunsetMin) {
    let dayLen = sunsetMin - sunriseMin;
    if (!(dayLen > 0) || dayLen >= 1440) { sunriseMin = 360; sunsetMin = 1080; dayLen = 720; }
    let elev, sunProgress, rising, nightProgress = 0, isNight = false;
    if (nowMin >= sunriseMin && nowMin <= sunsetMin) {
      const tt = (nowMin - sunriseMin) / dayLen;
      elev = Math.sin(Math.PI * tt);
      sunProgress = tt;
      rising = tt < 0.5;
    } else {
      isNight = true;
      const nightLen = 1440 - dayLen;
      let nt;
      if (nowMin > sunsetMin) nt = (nowMin - sunsetMin) / nightLen;
      else nt = (nowMin + (1440 - sunsetMin)) / nightLen;
      elev = -Math.sin(Math.PI * nt);
      nightProgress = nt;
      sunProgress = nt;
      rising = nowMin < sunriseMin;
    }
    return { elev, sunProgress, rising, nightProgress, isNight };
  }

  /* ============================================================
     ЗВЁЗДЫ — детерминированный seed-PRNG (стабильное поле).
     ============================================================ */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ============================================================
     ОБЛАЧНЫЙ СПРАЙТ — мягкая «пушистая» клякса в offscreen-канвасе,
     заранее отрендеренная (ТЗ §4.7), стампится с трансформом.
     ============================================================ */
  function makeCloudSprite() {
    const S = 256;
    const c = document.createElement('canvas');
    c.width = S; c.height = S;
    const x = c.getContext('2d');
    const puffs = [
      [128, 150, 70], [86, 160, 50], [170, 158, 54],
      [108, 128, 48], [150, 130, 46], [128, 168, 44]
    ];
    for (const [px, py, pr] of puffs) {
      const g = x.createRadialGradient(px, py, 0, px, py, pr);
      g.addColorStop(0, 'rgba(255,255,255,0.85)');
      g.addColorStop(0.55, 'rgba(255,255,255,0.45)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g;
      x.beginPath(); x.arc(px, py, pr, 0, Math.PI * 2); x.fill();
    }
    return c;
  }

  /* ============================================================
     SKY ENGINE
     ============================================================ */
  function SkyEngine() {
    this.canvas = null;
    this.ctx = null;
    this.W = 0; this.H = 0; this.dpr = 1;
    this.running = false;
    this.rafId = null;
    this.lastT = 0;
    this.cloudSprite = null;

    // целевая и сглаженная сцена (плавные переходы при смене источника/города)
    this.target = defaultScene();
    this.cur = defaultScene();
    this._sim = null; // переопределение для DevTools/скраба

    this.stars = [];
    this.clouds = [];
  }

  function defaultScene() {
    return {
      nowMin: 12 * 60, sunriseMin: 330, sunsetMin: 1230,
      cloud: 30, vis: 20, moonIllum: 50, moonWaxing: true,
      wind: 2, windDx: 1
    };
  }

  SkyEngine.prototype.mount = function () {
    let c = document.getElementById('v2Sky');
    if (!c) {
      c = document.createElement('canvas');
      c.id = 'v2Sky';
      c.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(c, document.body.firstChild);
    }
    this.canvas = c;
    this.ctx = c.getContext('2d', { alpha: false });
    this.cloudSprite = makeCloudSprite();
    this.resize();
    this.buildStars();
    this.buildClouds();

    window.addEventListener('resize', () => {
      this.resize(); this.buildStars(); this.buildClouds();
      if (reducedMotion) this.drawFrame(0); // статичный кадр перерисовываем сами
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
    // первый кадр сразу (синхронно с текущей сценой)
    this.cur = Object.assign({}, this.target);
    if (reducedMotion) this.drawFrame(0);
    else this.start();
  };

  SkyEngine.prototype.resize = function () {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.canvas.width = Math.round(this.W * this.dpr);
    this.canvas.height = Math.round(this.H * this.dpr);
    this.canvas.style.width = this.W + 'px';
    this.canvas.style.height = this.H + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.horizonY = this.H * 0.86;
  };

  SkyEngine.prototype.buildStars = function () {
    const isMobile = this.W < 700;
    const count = isMobile ? 110 : 220;
    const rnd = mulberry32(0x5EED1A); // фиксированный seed → стабильное небо
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: rnd(),
        y: rnd() * 0.72,                 // звёзды в верхних ~72% неба
        r: 0.5 + rnd() * 1.3,
        base: 0.35 + rnd() * 0.65,
        tw: 0.6 + rnd() * 2.4,           // частота мерцания
        ph: rnd() * Math.PI * 2,
        big: rnd() > 0.93                // редкие крупные звёзды с лучиками
      });
    }
  };

  SkyEngine.prototype.buildClouds = function () {
    // 2 параллакс-слоя: дальний (мелкий, медленный) + ближний (крупный, быстрый)
    const rnd = mulberry32(0xC10D5);
    const mk = (n, yBand, scaleBase, scaleVar, spd, depth) => {
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push({
          x: rnd(), y: yBand[0] + rnd() * (yBand[1] - yBand[0]),
          s: scaleBase + rnd() * scaleVar,
          spd: spd * (0.6 + rnd() * 0.8),
          depth: depth,
          a: 0.5 + rnd() * 0.5
        });
      }
      return arr;
    };
    const far = mk(7, [0.10, 0.30], 0.55, 0.4, 0.006, 0.6);
    const near = mk(5, [0.28, 0.5], 1.0, 0.7, 0.013, 1.0);
    this.clouds = far.concat(near);
  };

  /* Принять новую целевую сцену (из forecast). Сглаживание — в frame(). */
  SkyEngine.prototype.setScene = function (sc) {
    this.target = Object.assign(defaultScene(), sc);
    if (reducedMotion) { this.cur = Object.assign({}, this.target); this.drawFrame(0); }
  };

  /* DevTools/скраб: жёсткое переопределение части сцены. null = снять. */
  SkyEngine.prototype.simulate = function (partial) {
    if (partial == null) { this._sim = null; }
    else { this._sim = Object.assign(this._sim || {}, partial); }
    if (reducedMotion) { this.cur = this.effectiveTarget(); this.drawFrame(0); }
    if (DEBUG) console.log('[V2.sky] simulate', this._sim);
  };
  SkyEngine.prototype.effectiveTarget = function () {
    return this._sim ? Object.assign({}, this.target, this._sim) : this.target;
  };

  SkyEngine.prototype.start = function () {
    if (this.running || reducedMotion) return;
    this.running = true;
    this.lastT = performance.now();
    const loop = (t) => {
      if (!this.running) return;
      const dt = Math.min((t - this.lastT) / 1000, 0.05);
      this.lastT = t;
      this.frame(dt, t);
      this.rafId = raf(loop);
    };
    this.rafId = raf(loop);
  };
  SkyEngine.prototype.stop = function () {
    this.running = false;
    if (this.rafId) { caf(this.rafId); this.rafId = null; }
  };

  /* Сглаживаем cur → target (экспоненциально), дрейфим облака, рисуем. */
  SkyEngine.prototype.frame = function (dt, t) {
    const tgt = this.effectiveTarget();
    const k = 1 - Math.pow(0.0001, dt); // ~быстрое, но плавное приближение
    // углы (минуты) интерполируем кратчайшим путём по суткам
    this.cur.nowMin = lerpAngleMin(this.cur.nowMin, tgt.nowMin, k);
    this.cur.sunriseMin = lerp(this.cur.sunriseMin, tgt.sunriseMin, k);
    this.cur.sunsetMin = lerp(this.cur.sunsetMin, tgt.sunsetMin, k);
    this.cur.cloud = lerp(this.cur.cloud, tgt.cloud, k);
    this.cur.vis = lerp(this.cur.vis, tgt.vis, k);
    this.cur.moonIllum = lerp(this.cur.moonIllum, tgt.moonIllum, k);
    this.cur.moonWaxing = tgt.moonWaxing;
    this.cur.wind = lerp(this.cur.wind, tgt.wind, k);
    this.cur.windDx = lerp(this.cur.windDx, tgt.windDx, k);

    // дрейф облаков
    const drift = (this.cur.wind * 0.0006 + 0.0008);
    for (const cl of this.clouds) {
      cl.x += cl.spd * this.cur.windDx * drift * cl.depth * (dt * 60);
      if (cl.x > 1.25) cl.x -= 1.5;
      if (cl.x < -0.25) cl.x += 1.5;
    }
    this.drawFrame(t || 0);
  };

  // интерполяция «минут суток» кратчайшим путём (через полночь)
  function lerpAngleMin(a, b, k) {
    let d = b - a;
    if (d > 720) d -= 1440;
    if (d < -720) d += 1440;
    let r = a + d * k;
    r = ((r % 1440) + 1440) % 1440;
    return r;
  }

  SkyEngine.prototype.drawFrame = function (t) {
    const ctx = this.ctx, W = this.W, H = this.H;
    if (!ctx) return;
    const sc = this.cur;
    const sun = solarState(sc.nowMin, sc.sunriseMin, sc.sunsetMin);
    const pal = skyPalette(sun.elev, sun.rising, sc.cloud);

    // --- 1. градиент неба ---
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, rgbToCss(pal[0]));
    grad.addColorStop(0.55, rgbToCss(pal[1]));
    grad.addColorStop(1, rgbToCss(pal[2]));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // expose accent + horizon to CSS (интерфейс «в тон» небу)
    this.publishTokens(pal, sun);

    // --- 2. звёзды ---
    const nightAlpha = clamp(smoothstep(0.06, -0.10, sun.elev), 0, 1); // 0 днём → 1 ночью
    if (nightAlpha > 0.01) {
      const cloudHide = 1 - clamp(sc.cloud / 100, 0, 1) * 0.85;
      const visFactor = clamp((sc.vis == null ? 20 : sc.vis) / 20, 0.35, 1);
      const starGlobal = nightAlpha * cloudHide * visFactor;
      if (starGlobal > 0.02) this.drawStars(starGlobal, t);
    }

    // --- 3. луна (ночь/сумерки) ---
    if (sun.elev < 0.12) {
      const moonA = clamp(smoothstep(0.12, -0.05, sun.elev), 0, 1) * (1 - clamp(sc.cloud / 100, 0, 1) * 0.6);
      if (moonA > 0.02) this.drawMoon(sc, sun, moonA);
    }

    // --- 4. солнце (день/сумерки) ---
    if (sun.elev > -0.06) {
      this.drawSun(sc, sun, pal);
    }

    // --- 5. облака ---
    this.drawClouds(sc, sun, pal);
  };

  SkyEngine.prototype.publishTokens = function (pal, sun) {
    const root = document.documentElement;
    // акцент насыщаем: берём accent-кадр палитры
    const accent = rgbToHex(pal[3]);
    const horizon = rgbToHex(pal[2]);
    root.style.setProperty('--v2-accent', accent);
    root.style.setProperty('--v2-accent-soft', rgbToCss(pal[3], 0.16));
    root.style.setProperty('--v2-accent-strong', rgbToHex(mixRgb(pal[3], [255, 255, 255], 0.25)));
    root.style.setProperty('--v2-sky-horizon', horizon);
    root.style.setProperty('--v2-sky-top', rgbToHex(pal[0]));
    root.style.setProperty('--v2-sky-mid', rgbToHex(pal[1]));
  };

  SkyEngine.prototype.drawStars = function (globalA, t) {
    const ctx = this.ctx, W = this.W, H = this.H;
    const ty = this.horizonY;
    ctx.save();
    for (const s of this.stars) {
      const px = s.x * W;
      const py = s.y * ty;
      const twinkle = reducedMotion ? 1 : (0.65 + 0.35 * Math.sin(t * 0.001 * s.tw + s.ph));
      const a = clamp(s.base * twinkle * globalA, 0, 1);
      if (a < 0.02) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = '#eaf2ff';
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.big && a > 0.3) {
        // тонкие лучики у крупных звёзд
        ctx.globalAlpha = a * 0.5;
        ctx.strokeStyle = '#eaf2ff';
        ctx.lineWidth = 0.6;
        const rr = s.r * 3.2;
        ctx.beginPath();
        ctx.moveTo(px - rr, py); ctx.lineTo(px + rr, py);
        ctx.moveTo(px, py - rr); ctx.lineTo(px, py + rr);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  SkyEngine.prototype.drawMoon = function (sc, sun, alpha) {
    const ctx = this.ctx, W = this.W;
    const arcH = this.horizonY * 0.74;
    // луна по своей дуге через ночь
    const np = sun.isNight ? sun.nightProgress : (sun.rising ? 0.05 : 0.95);
    const cx = W * (0.12 + np * 0.76);
    const cy = this.horizonY - Math.sin(Math.PI * clamp(np, 0.02, 0.98)) * arcH;
    const r = Math.max(16, Math.min(W, this.H) * 0.035);

    ctx.save();
    ctx.globalAlpha = alpha;
    // мягкое сияние
    const halo = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 3.2);
    halo.addColorStop(0, 'rgba(220,230,255,0.28)');
    halo.addColorStop(1, 'rgba(220,230,255,0)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, r * 3.2, 0, Math.PI * 2); ctx.fill();

    // диск с фазой
    drawMoonDisc(ctx, cx, cy, r, sc.moonIllum, sc.moonWaxing);
    ctx.restore();
  };

  SkyEngine.prototype.drawSun = function (sc, sun, pal) {
    const ctx = this.ctx, W = this.W;
    const arcH = this.horizonY * 0.78;
    const cx = W * (0.1 + sun.sunProgress * 0.8);
    const cy = this.horizonY - sun.elev * arcH;
    const r = Math.max(20, Math.min(W, this.H) * 0.045);

    // цвет: высоко — бело-жёлтый, у горизонта — тёплый янтарь
    const warm = clamp(1 - sun.elev * 1.4, 0, 1);
    const core = mixRgb([255, 247, 224], [255, 168, 86], warm);
    const haloC = mixRgb([255, 236, 180], [255, 140, 70], warm);

    ctx.save();
    // ореол
    const glowR = r * (3.4 + warm * 2.2);
    const halo = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, glowR);
    halo.addColorStop(0, rgbToCss(haloC, 0.5));
    halo.addColorStop(0.4, rgbToCss(haloC, 0.18));
    halo.addColorStop(1, rgbToCss(haloC, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, glowR, 0, Math.PI * 2); ctx.fill();
    // диск
    const disc = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.1, cx, cy, r);
    disc.addColorStop(0, rgbToCss(mixRgb(core, [255, 255, 255], 0.4)));
    disc.addColorStop(1, rgbToCss(core));
    ctx.fillStyle = disc;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };

  SkyEngine.prototype.drawClouds = function (sc, sun, pal) {
    const ctx = this.ctx, W = this.W, H = this.H;
    const density = clamp(sc.cloud / 100, 0, 1);
    if (density < 0.04) return;
    // цвет облаков: днём светлые (тон горизонта→белый), ночью тёмно-серые
    const dayMix = smoothstep(-0.10, 0.25, sun.elev);
    const lightCloud = mixRgb(pal[1], [255, 255, 255], 0.5);
    const darkCloud = mixRgb(pal[0], [40, 48, 66], 0.5);
    const cloudRgb = mixRgb(darkCloud, lightCloud, dayMix);
    const baseAlpha = 0.10 + density * 0.6;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    for (const cl of this.clouds) {
      const a = baseAlpha * cl.a * (0.5 + density * 0.5);
      if (a < 0.02) continue;
      const cw = (W * 0.5) * cl.s;
      const ch = cw * 0.62;
      const px = cl.x * (W * 1.4) - W * 0.2;
      const py = cl.y * H;
      ctx.globalAlpha = clamp(a, 0, 0.85);
      // тонируем спрайт: рисуем его как маску, заливая цветом
      ctx.save();
      ctx.translate(px, py);
      ctx.drawImage(this.cloudSprite, -cw / 2, -ch / 2, cw, ch);
      // тон поверх (умножением через 'source-atop' на самом спрайте недоступно
      // без буфера — упрощаем: накладываем цветовой слой с тем же альфа-силуэтом)
      ctx.globalCompositeOperation = 'source-atop';
      ctx.globalAlpha = clamp(a, 0, 0.85);
      ctx.fillStyle = rgbToCss(cloudRgb);
      ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
      ctx.restore();
    }
    ctx.restore();
  };

  /* Фаза луны на канвасе: терминатор-эллипс. illum 0..100, waxing bool. */
  function drawMoonDisc(ctx, cx, cy, r, illum, waxing) {
    const k = clamp((illum == null ? 50 : illum) / 100, 0, 1);
    ctx.save();
    ctx.translate(cx, cy);
    // тень-диск (неосвещённая луна)
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = '#2b3050';
    ctx.fill();
    // освещённая область
    ctx.save();
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
    // Фаза без неоднозначности winding-rule: освещённую область строим из
    // ОДНОЗНАЧНЫХ полу-фигур (полукруг + полуэллипс), каждая = дуга + хорда.
    //   litRight (waxing) — свет справа; иначе слева.
    //   базовый полудиск со стороны света = 50% освещения;
    //   гиббус (k>0.5)  — ДОБАВляем светлый полуэллипс на тёмную сторону;
    //   серп  (k<0.5)   — ВЫРЕЗАЕМ тёмный полуэллипс на светлой стороне.
    const litRight = !!waxing;
    const HALF = Math.PI / 2;
    const LIT = '#eef2ff', SHADOW = '#2b3050';

    // освещённый полудиск (со стороны света)
    ctx.fillStyle = LIT;
    ctx.beginPath();
    ctx.arc(0, 0, r, -HALF, HALF, !litRight);
    ctx.closePath();
    ctx.fill();

    const a = r * Math.abs(2 * k - 1); // x-полуось терминатора
    if (k > 0.5) {
      // гиббус: светлый полуэллипс на тёмной стороне (litRight → слева)
      ctx.fillStyle = LIT;
      ctx.beginPath();
      ctx.ellipse(0, 0, a, r, 0, -HALF, HALF, litRight);
      ctx.closePath();
      ctx.fill();
    } else if (k < 0.5) {
      // серп: тёмный полуэллипс на светлой стороне (litRight → справа)
      ctx.fillStyle = SHADOW;
      ctx.beginPath();
      ctx.ellipse(0, 0, a, r, 0, -HALF, HALF, !litRight);
      ctx.closePath();
      ctx.fill();
    }
    // лёгкая текстура «морей»
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = '#9aa6d8';
    ctx.beginPath(); ctx.arc(-r * 0.25, -r * 0.2, r * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(r * 0.2, r * 0.28, r * 0.16, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(r * 0.3, -r * 0.1, r * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // тонкая кромка
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = 'rgba(220,228,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  // карта cardinal → горизонтальный знак дрейфа (восток-запад)
  const CARD_DX = {
    N: 0.15, NE: 0.7, E: 1, SE: 0.7, S: -0.15, SW: -0.7, W: -1, NW: -0.7
  };

  /* ============================================================
     Объект V2 — единая точка входа.
     ============================================================ */
  const V2 = {
    version: 'stage-1',
    booted: false,
    hooks: { renderAll: 0, applyTranslations: 0 },
    sky: new SkyEngine(),
    skyline: null,
    time: null,
    briefing: null,
    odometer: null,
    dock: null,
    glassFx: null,

    /* Собрать параметры сцены из активного прогноза app.js. */
    computeScene() {
      const f = activeForecast();
      const d = f && f[0];
      const now = new Date();
      const hr = nowHour();
      const nowMin = (hr % 24) * 60 + now.getMinutes();
      if (!d) return { nowMin };
      let h = null;
      if (Array.isArray(d.hourly)) {
        h = d.hourly.find(x => x.h === hr) || d.hourly[Math.min(hr, d.hourly.length - 1)] || d.hourly[0];
      }
      const cloud = (h && h.cl != null) ? h.cl : 40;
      const vis = (h && h.vis != null) ? h.vis : 20;
      const windDx = CARD_DX[d.windDir] != null ? CARD_DX[d.windDir] : 1;
      return {
        nowMin,
        sunriseMin: hhmmToMin(d.sunrise) ?? 330,
        sunsetMin: hhmmToMin(d.sunset) ?? 1230,
        cloud, vis,
        moonIllum: d.moonIllum != null ? d.moonIllum : 50,
        moonWaxing: !!d.moonWaxing,
        wind: (h && h.w != null) ? h.w : (d.wind || 2),
        windDx: windDx || 0.2
      };
    },

    afterRenderAll() {
      this.hooks.renderAll++;
      try {
        if (this.sky && this.sky.ctx) this.sky.setScene(this.computeScene());
      } catch (e) { if (DEBUG) console.warn('[V2] afterRenderAll sky error', e); }
      if (DEBUG) {
        const s = this.computeScene();
        console.log('[V2] afterRenderAll #' + this.hooks.renderAll, JSON.stringify(s));
      }
    },

    applyTranslations() {
      this.hooks.applyTranslations++;
      if (DEBUG) console.log('[V2] applyTranslations #' + this.hooks.applyTranslations + ' · lang=' + currentLang());
    },

    init() {
      if (this.booted) return;
      this.booted = true;
      try { this.sky.mount(); } catch (e) { console.warn('[V2] sky.mount error', e); }
      this.applyTranslations();
      this.afterRenderAll();
      if (DEBUG) console.log('[V2] init() выполнен, version=' + this.version);
    }
  };
  window.V2 = V2;

  /* ---- monkey-patch render-хуков app.js ---- */
  function patch(name, after) {
    try {
      const orig = window[name];
      if (typeof orig !== 'function') { if (DEBUG) console.warn('[V2] не функция: ' + name); return false; }
      window[name] = function patched() {
        const r = orig.apply(this, arguments);
        try { after.call(V2); } catch (e) { console.warn('[V2] хук ' + name + ':', e); }
        return r;
      };
      return true;
    } catch (e) { console.warn('[V2] patch(' + name + ')', e); return false; }
  }
  const okR = patch('renderAll', V2.afterRenderAll);
  const okI = patch('applyTranslations', V2.applyTranslations);
  if (DEBUG) console.log('[V2] monkey-patch: renderAll=' + okR + ', applyTranslations=' + okI);

  raf(() => V2.init());
})();
