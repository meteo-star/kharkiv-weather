"""Генератор иконок PWA для метеоприложения.
Создаёт PNG разных размеров в стиле проекта (тёмно-синий фон + солнце за облаком + бирюзовый акцент).
Используется только один раз — на этапе подготовки релиза. Не запускается в рантайме.

Запуск: python scripts/gen-icons.py
Результат: icons/icon-192.png, icon-512.png, apple-touch-icon.png, icon-maskable-512.png, favicon-32.png
"""
from PIL import Image, ImageDraw, ImageFilter
import os

OUT_DIR = 'icons'
os.makedirs(OUT_DIR, exist_ok=True)


def radial_bg(size, center, edge):
    """Радиальный градиент через концентрические круги (от центра наружу)."""
    img = Image.new('RGBA', (size, size), edge + (255,))
    cx = cy = size // 2
    max_r = int(size * 0.75)
    for r in range(max_r, 0, -2):
        t = 1 - r / max_r
        c = tuple(int(edge[i] + (center[i] - edge[i]) * t) for i in range(3)) + (255,)
        ImageDraw.Draw(img).ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
    return img


def draw_icon(size, maskable=False, rounded=True):
    """Главный canvas с погодной иконкой.

    maskable: если True — рисуем с safe-zone, контент в центре 80% (Android adaptive icons)
    rounded: если True — клипуем в скруглённый квадрат (~22% корнер-радиус, iOS style)
    """
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))

    # Фон: тёмно-синий с радиальным градиентом
    bg = radial_bg(size, center=(35, 50, 115), edge=(8, 13, 38))
    img.paste(bg, (0, 0), bg)

    # Контент scale: для maskable рисуем уменьшенный (safe-zone padding 10%)
    inner = 0.80 if maskable else 1.0
    cx = size // 2
    cy = size // 2

    # Базовая система координат — нормированная относительно 512px
    def s(v):
        return int(v * size * inner / 512)

    draw = ImageDraw.Draw(img)

    # Солнце с glow ===
    sun_cx = cx + s(-50)
    sun_cy = cy + s(-50)
    sun_r = s(95)

    # Glow вокруг солнца (большой блюрованный круг)
    glow_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(glow_layer).ellipse(
        [sun_cx - sun_r * 2, sun_cy - sun_r * 2,
         sun_cx + sun_r * 2, sun_cy + sun_r * 2],
        fill=(255, 200, 70, 110)
    )
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=max(8, int(28 * size / 512))))
    img.paste(glow_layer, (0, 0), glow_layer)

    # Само солнце (жёлтый круг)
    draw.ellipse(
        [sun_cx - sun_r, sun_cy - sun_r, sun_cx + sun_r, sun_cy + sun_r],
        fill=(252, 211, 77, 255)
    )
    # Внутренний highlight (более светлая точка)
    hi_r = int(sun_r * 0.45)
    draw.ellipse(
        [sun_cx - hi_r + s(-15), sun_cy - hi_r + s(-15),
         sun_cx + hi_r + s(-15), sun_cy + hi_r + s(-15)],
        fill=(255, 245, 180, 220)
    )

    # Облако с лёгким glow ===
    cloud_color = (230, 240, 250, 255)
    # 4 overlapping круга, образующие фигуру облака
    clouds = [
        (cx + s(20),  cy + s(50),  s(95)),  # центральный большой
        (cx + s(80),  cy + s(75),  s(75)),  # правый
        (cx + s(-50), cy + s(75),  s(70)),  # левый
        (cx + s(10),  cy + s(95),  s(85)),  # нижний
    ]

    # Сначала glow облака (полупрозрачный, ярче на краях)
    cloud_glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    cg_draw = ImageDraw.Draw(cloud_glow)
    for ccx, ccy, cr in clouds:
        cg_draw.ellipse(
            [ccx - cr - s(8), ccy - cr - s(8), ccx + cr + s(8), ccy + cr + s(8)],
            fill=(0, 212, 255, 60)
        )
    cloud_glow = cloud_glow.filter(ImageFilter.GaussianBlur(radius=max(4, int(14 * size / 512))))
    img.paste(cloud_glow, (0, 0), cloud_glow)

    # Само облако
    for ccx, ccy, cr in clouds:
        draw.ellipse([ccx - cr, ccy - cr, ccx + cr, ccy + cr], fill=cloud_color)
    # Лёгкий тоновый shading снизу облака (полоса темнее)
    shade = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for ccx, ccy, cr in clouds:
        sd.ellipse(
            [ccx - cr, ccy + cr * 0.4, ccx + cr, ccy + cr],
            fill=(120, 140, 180, 70)
        )
    shade = shade.filter(ImageFilter.GaussianBlur(radius=max(2, int(8 * size / 512))))
    img.paste(shade, (0, 0), shade)

    # Закругление углов (только для НЕ-maskable: на iOS квадрат сам округляется системой,
    # но для favicon и общего вида squircle-маска делает иконку красивее)
    if rounded and not maskable:
        mask = Image.new('L', (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle(
            [0, 0, size - 1, size - 1],
            radius=int(size * 0.22),
            fill=255
        )
        # Применяем маску
        result = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        result.paste(img, (0, 0), mask)
        return result

    # Для maskable — оставляем квадрат (Android сам кропает в нужную форму)
    return img


# Генерация ===
outputs = [
    (512, 'icon-512.png',           False, True),
    (192, 'icon-192.png',           False, True),
    (180, 'apple-touch-icon.png',   False, True),
    (512, 'icon-maskable-512.png',  True,  False),  # для Android adaptive icons
    (192, 'icon-maskable-192.png',  True,  False),
    (32,  'favicon-32.png',         False, True),
]

for size, name, maskable, rounded in outputs:
    img = draw_icon(size, maskable=maskable, rounded=rounded)
    path = os.path.join(OUT_DIR, name)
    img.save(path, 'PNG', optimize=True)
    print(f'  {path}: {size}x{size} {"(maskable)" if maskable else ""}')

print('\nDone.')
