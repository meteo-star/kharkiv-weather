# Метеоагрегатор · Харьков / Высокий

Веб-приложение для агрегации прогноза погоды по 10 источникам в стиле Liquid Glass.

## Что внутри

- Усреднение прогнозов: ECMWF, GFS, ICON, MET Norway, OpenWeatherMap, WeatherAPI, Visual Crossing, Ventusky, AccuWeather, Укргідрометцентр
- Тёмный Liquid Glass UI с неоновыми акцентами
- 3D-иконки погоды, восход/закат, фаза луны, УФ-индекс, AQI
- Интерактивные модалки с почасовым прогнозом на каждый день
- Адаптив под любой экран

## Запуск

Открыть `index.html` в браузере или развернуть на GitHub Pages.

## Демо

https://meteo-star.github.io/kharkiv-weather/

## Технологии

- Чистая статика: HTML + CSS + ванильный JavaScript
- Chart.js через CDN (с проверкой Subresource Integrity)
- Шрифты Onest + JetBrains Mono через Google Fonts
- Без сборщиков, без npm
- Деплой: GitHub Pages

## Источники данных

- [Open-Meteo](https://open-meteo.com/) – основной форкаст (7 моделей: ECMWF, GFS, ICON, GEM, JMA, MeteoFrance, UKMO)
- [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api) – AQI, PM2.5, PM10
- [Open-Meteo Archive](https://open-meteo.com/en/docs/historical-weather-api) – исторические данные (для климатического контекста)
- [Open-Meteo Pollen](https://open-meteo.com/en/docs/air-quality-api) – уровень пыльцы (берёза, ольха, амброзия, злаки)
- [Blitzortung](https://www.blitzortung.org/) – молнии в реальном времени

Все источники бесплатные, без API-ключей.

## Приватность

См. [SECURITY.md](SECURITY.md). Коротко: никакой аналитики, никаких трекеров, никаких персональных данных на сервере. Всё – только в твоём браузере.

## Лицензия

MIT (исходник прототипа), 2026.
