import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

W, H = 600, 600

def get_base_canvas():
    im = Image.new('RGB', (W, H), (246, 248, 251))
    draw = ImageDraw.Draw(im)
    for y in range(400, H):
        factor = (y - 400) / 200.0
        r = int(246 - factor * 14)
        g = int(248 - factor * 12)
        b = int(251 - factor * 10)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    return im

def draw_soft_shadow(im, x1, y1, x2, y2, blur=18, opacity=110):
    mask = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([x1, y1, x2, y2], fill=opacity)
    blurred = mask.filter(ImageFilter.GaussianBlur(blur))
    shadow_color = Image.new('RGB', (W, H), (25, 32, 45))
    im.paste(shadow_color, (0, 0), blurred)

def draw_spec_badge(im, title, code, brand, price):
    badge = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(badge)
    bx1, by1, bx2, by2 = 390, 30, 570, 115
    d.rounded_rectangle([bx1, by1, bx2, by2], radius=10, fill=(255, 255, 255, 240), outline=(220, 226, 235, 255), width=2)
    d.text((bx1 + 15, by1 + 14), brand.upper()[:18], fill=(30, 41, 59))
    d.text((bx1 + 15, by1 + 34), code, fill=(100, 116, 139))
    d.line([(bx1 + 15, by1 + 54), (bx2 - 15, by1 + 54)], fill=(230, 235, 242), width=1)
    d.text((bx1 + 15, by1 + 64), f"₹{price}", fill=(21, 128, 61))
    d.text((bx1 + 80, by1 + 65), "CERTIFIED", fill=(148, 163, 184))
    im.paste(badge, (0, 0), badge)

# 1. TMT STEEL RENDERER
def render_tmt(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 460, 490, 530, blur=22, opacity=130)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    # 4 Steel Rebars side by side diagonally
    bars = [(160, 140, 220, 470), (230, 140, 290, 470), (300, 140, 360, 470), (370, 140, 430, 470)]
    for bx1, by1, bx2, by2 in bars:
        for x in range(bx1, bx2):
            nx = (x - bx1) / (bx2 - bx1)
            sh = 0.75 + 0.35 * math.sin(nx * math.pi)
            c = int(80 * sh)
            d.line([(x, by1), (x, by2)], fill=(c, c + 5, c + 15, 255))
        # Rib ribs across bar
        for y in range(by1 + 10, by2 - 10, 16):
            d.line([(bx1, y), (bx2, y + 8)], fill=(150, 160, 175, 255), width=3)
    # Tie band
    d.rectangle([140, 280, 450, 310], fill=(220, 170, 30, 255), outline=(150, 110, 10, 255), width=2)
    d.text((295, 295), "FE 550D TMT · PRIMARY STEEL", fill=(20, 20, 20), anchor="mm")
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

# 2. SAND & AGGREGATES RENDERER
def render_sand_aggregate(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 100, 460, 500, 535, blur=24, opacity=120)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    is_sand = "Sand" in p["name"]
    is_blue_metal = "Blue Metal" in p["name"] or "Chips" in p["name"] or "WMM" in p["name"]
    
    if is_blue_metal:
        base_c = (95, 105, 120)
    elif "River" in p["name"]:
        base_c = (205, 175, 125)
    else:
        base_c = (175, 150, 115)
        
    # Heap / Mound of material
    pts = [(120, 470), (160, 340), (240, 240), (300, 210), (360, 240), (440, 340), (480, 470)]
    d.polygon(pts, fill=base_c + (255,), outline=(base_c[0]-30, base_c[1]-30, base_c[2]-30, 255))
    
    # Texture grains / stones
    random.seed(hash(p["sku"]))
    for _ in range(400):
        gx = random.randint(150, 450)
        gy = random.randint(230, 460)
        if (gx - 300)**2 / 160**2 + (gy - 470)**2 / 240**2 <= 1:
            sh = 0.7 + 0.6 * random.random()
            gc = (int(min(255, base_c[0]*sh)), int(min(255, base_c[1]*sh)), int(min(255, base_c[2]*sh)), 255)
            rad = random.randint(1, 4) if is_sand else random.randint(3, 8)
            d.ellipse([gx, gy, gx + rad, gy + rad], fill=gc)
            
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

# 3. BRICKS & BLOCKS RENDERER
def render_bricks(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 465, 490, 530, blur=22, opacity=120)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    is_red = "Red" in p["name"] or "Facing" in p["name"] or "Clay" in p["name"]
    is_aac = "AAC" in p["name"]
    
    base_c = (195, 65, 45) if is_red else ((225, 230, 235) if is_aac else (150, 155, 160))
    
    # 3D Stack of 2 Blocks (isometric-style)
    # Block 1 (bottom)
    d.rectangle([150, 290, 450, 440], fill=base_c + (255,), outline=(base_c[0]-40, base_c[1]-40, base_c[2]-40, 255), width=2)
    # Block 2 (top)
    d.rectangle([180, 160, 420, 290], fill=tuple(min(255, c + 20) for c in base_c) + (255,), outline=(base_c[0]-40, base_c[1]-40, base_c[2]-40, 255), width=2)
    
    if is_aac:
        d.text((300, 225), "AAC LIGHTWEIGHT BLOCK", fill=(70, 80, 95), anchor="mm")
        d.text((300, 365), "THERMAL INSULATION · IS 2185", fill=(70, 80, 95), anchor="mm")
    else:
        d.text((300, 225), p["brand"].upper(), fill=(255, 230, 210) if is_red else (230, 235, 245), anchor="mm")
        d.text((300, 365), "HIGH COMPRESSIVE STRENGTH", fill=(255, 230, 210) if is_red else (230, 235, 245), anchor="mm")
        
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

# 4. PIPES & PLUMBING RENDERER
def render_pipes(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 100, 460, 500, 525, blur=20, opacity=115)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    if "Tank" in p["name"]:
        # Water Tank Cylinder
        d.rounded_rectangle([180, 140, 420, 450], radius=30, fill=(30, 75, 145, 255), outline=(15, 45, 95, 255), width=3)
        # Ribs
        for y in range(190, 420, 45):
            d.line([(180, y), (420, y)], fill=(65, 120, 205, 255), width=5)
        d.text((300, 290), "1000 LITRES", fill=(255, 255, 255), anchor="mm")
        d.text((300, 320), "TRIPLE LAYER UV", fill=(255, 235, 150), anchor="mm")
    elif "Pump" in p["name"]:
        # Submersible pump stainless cylinder
        d.rectangle([230, 160, 370, 450], fill=(215, 225, 235, 255), outline=(140, 150, 165, 255), width=2)
        d.rectangle([210, 380, 390, 450], fill=(45, 95, 165, 255))
        d.text((300, 415), "1.0 HP STAINLESS", fill=(255, 255, 255), anchor="mm")
    else:
        # Pipes bundle
        is_cpvc = "CPVC" in p["name"]
        pipe_col = (245, 235, 215) if is_cpvc else ((115, 125, 135) if "SWR" in p["name"] else (235, 240, 245))
        for px in [160, 235, 310, 385]:
            d.rounded_rectangle([px, 130, px + 55, 460], radius=8, fill=pipe_col + (255,), outline=(140, 145, 150, 255), width=2)
            d.rectangle([px, 130, px + 55, 165], fill=(210, 130, 30, 255) if is_cpvc else (40, 90, 160, 255))
            d.text((px + 27, 300), "ASTRAL · SDR 11" if is_cpvc else "SUPREME · SWR", fill=(80, 80, 80), anchor="mm")
            
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

# 5. CHEMICALS & WATERPROOFING RENDERER
def render_chemicals(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 120, 465, 480, 530, blur=22, opacity=125)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    # 3D Container Bucket / Can
    cx1, cy1, cx2, cy2 = 170, 160, 430, 470
    d.rounded_rectangle([cx1, cy1, cx2, cy2], radius=14, fill=(245, 248, 250, 255), outline=(170, 180, 195, 255), width=2)
    # Bright Yellow/Blue Chemical Brand band
    d.rectangle([cx1 + 2, 210, cx2 - 2, 330], fill=(235, 185, 25, 255))
    d.rectangle([cx1 + 2, 210, cx2 - 2, 250], fill=(25, 50, 120, 255))
    d.text((W // 2, 230), p["brand"].upper(), fill=(255, 255, 255), anchor="mm")
    d.text((W // 2, 280), p["name"].upper()[:22], fill=(20, 20, 20), anchor="mm")
    d.text((W // 2, 310), "WATERPROOFING & BONDING", fill=(15, 35, 95), anchor="mm")
    # Lid rim
    d.ellipse([cx1 - 5, cy1 - 10, cx2 + 5, cy1 + 25], fill=(225, 230, 238, 255), outline=(150, 160, 175, 255), width=2)
    
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

# 6. ROOFING, DOORS & WINDOWS RENDERER
def render_roofing_doors(p, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 465, 490, 530, blur=20, opacity=115)
    obj = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(obj)
    
    name = p["name"]
    if "Door" in name:
        # Architectural Door
        d.rounded_rectangle([170, 120, 430, 470], radius=8, fill=(160, 95, 55, 255) if "Teak" in name else ((215, 220, 225, 255) if "Steel" in name else (210, 175, 130, 255)), outline=(80, 50, 30, 255), width=3)
        # Door panels
        d.rectangle([200, 150, 400, 270], fill=(140, 80, 45, 255) if "Teak" in name else (195, 160, 115, 255), outline=(80, 50, 30, 255), width=2)
        d.rectangle([200, 300, 400, 440], fill=(140, 80, 45, 255) if "Teak" in name else (195, 160, 115, 255), outline=(80, 50, 30, 255), width=2)
        # Handle
        d.ellipse([375, 285, 395, 305], fill=(230, 190, 60, 255), outline=(140, 100, 20, 255), width=2)
    elif "Window" in name:
        # UPVC Window Frame
        d.rounded_rectangle([150, 140, 450, 450], radius=6, fill=(248, 250, 252, 255), outline=(150, 160, 175, 255), width=4)
        # Double panes
        d.rectangle([170, 160, 290, 430], fill=(210, 235, 250, 200), outline=(150, 160, 175, 255), width=2)
        d.rectangle([310, 160, 430, 430], fill=(210, 235, 250, 200), outline=(150, 160, 175, 255), width=2)
    else:
        # Corrugated Roofing Sheet
        d.rounded_rectangle([130, 140, 470, 460], radius=8, fill=(35, 85, 165, 255), outline=(20, 50, 105, 255), width=2)
        for x in range(150, 450, 30):
            d.line([(x, 140), (x, 460)], fill=(75, 135, 225, 255), width=8)
            d.line([(x + 15, 140), (x + 15, 460)], fill=(20, 55, 115, 255), width=6)
            
    im.paste(obj, (0, 0), obj)
    draw_spec_badge(im, p["name"], p["sku"], p["brand"], p["price"])
    im.save(out_path, "PNG")

print("Render helpers defined successfully!")
