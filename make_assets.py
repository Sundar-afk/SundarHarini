from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent
imgs = root / 'assets' / 'images'
music_dir = root / 'assets' / 'music'
imgs.mkdir(parents=True, exist_ok=True)
music_dir.mkdir(parents=True, exist_ok=True)

# couple.jpg
img = Image.new('RGB', (1200, 1500), '#f5ebdf')
d = ImageDraw.Draw(img)
d.rounded_rectangle((80, 90, 1120, 1410), radius=80, fill='#f8f1ea')
for i, color in enumerate(['#e8d0af', '#d0a779', '#f4e5d7']):
    d.rounded_rectangle((60 + i * 150, 120 + i * 150, 1120 - i * 100, 1360 - i * 110), radius=55, fill=color)
for x, y in [(300, 760), (860, 760)]:
    d.ellipse((x - 170, y - 220, x + 170, y + 220), fill='#6b2a2d')
    d.rounded_rectangle((x - 185, y + 70, x + 185, y + 420), radius=34, fill='#6b2a2d')
img.save(imgs / 'couple.jpg')

# couple2.jpg
img2 = Image.new('RGB', (1200, 920), '#f7f0ea')
d2 = ImageDraw.Draw(img2)
d2.rounded_rectangle((100, 80, 1100, 820), radius=60, fill='#f0d6bd')
d2.ellipse((240, 190, 520, 490), fill='#6e2d30')
d2.rounded_rectangle((180, 470, 590, 760), radius=65, fill='#6e2d30')
d2.ellipse((700, 220, 980, 500), fill='#9c6e53')
d2.rounded_rectangle((650, 480, 1020, 770), radius=65, fill='#9c6e53')
for i in range(6):
    x = 180 + i * 150
    d2.rounded_rectangle((x, 80, x + 60, 140), radius=18, fill='#c49c4b')
img2.save(imgs / 'couple2.jpg')

# background.jpg
bg = Image.new('RGB', (1600, 2000), '#f8f3ee')
dbg = ImageDraw.Draw(bg)
for y in range(0, 2000, 70):
    shade = max(225, 250 - (y // 20))
    dbg.rectangle((0, y, 1600, y + 70), fill=(shade, shade - 8, shade - 18))
for cx, cy, r, fill in [(200, 320, 210, '#ecd5b5'), (1400, 320, 210, '#e6c58a'), (200, 1720, 220, '#d9b88f'), (1400, 1720, 220, '#d3ac73')]:
    dbg.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill)
for i in range(18):
    r = 80 + i * 17
    dbg.ellipse((800 - r, 970 - r, 800 + r, 970 + r), outline='#d1a95c', width=2)
dbg.text((700, 950), '❤', fill='#7a2728')
bg.save(imgs / 'background.jpg')

# favicon.svg
(root / 'assets' / 'favicon.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#5f1b24"/><text x="32" y="38" text-anchor="middle" font-size="28" fill="#f5e7c5">❤</text></svg>',
    encoding='utf-8',
)

# empty mp3 placeholder
music_dir.joinpath('wedding.mp3').write_bytes(b'')

print('Created:', sorted(p.name for p in imgs.iterdir()))
print('Music exists:', music_dir.joinpath('wedding.mp3').exists())
