import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs("assets/products", exist_ok=True)

W, H = 600, 600

def get_base_canvas():
    im = Image.new('RGB', (W, H), (246, 248, 251))
    draw = ImageDraw.Draw(im)
    # Subtle studio vignette / floor gradient
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
    # Floating top-right chip
    bx1, by1, bx2, by2 = 390, 30, 570, 115
    d.rounded_rectangle([bx1, by1, bx2, by2], radius=10, fill=(255, 255, 255, 240), outline=(220, 226, 235, 255), width=2)
    d.text((bx1 + 15, by1 + 14), brand.upper()[:18], fill=(30, 41, 59), font=None)
    d.text((bx1 + 15, by1 + 34), code, fill=(100, 116, 139), font=None)
    d.line([(bx1 + 15, by1 + 54), (bx2 - 15, by1 + 54)], fill=(230, 235, 242), width=1)
    d.text((bx1 + 15, by1 + 64), f"₹{price}", fill=(21, 128, 61), font=None)
    d.text((bx1 + 80, by1 + 65), "DEMO SPEC", fill=(148, 163, 184), font=None)
    im.paste(badge, (0, 0), badge)

# 1. CEMENT RENDERER
def render_cement(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 130, 480, 470, 545, blur=22, opacity=130)
    
    is_white = "White" in item["product_name"]
    is_ppc = "PPC" in item["product_name"] or "Blended" in item["product_name"]
    is_rapid = "Rapid" in item["product_name"] or "53" in item["product_name"]
    
    bag_col = (248, 248, 250) if is_white else ((175, 150, 125) if not is_ppc else (150, 155, 162))
    accent_col = (20, 75, 140) if is_rapid else ((180, 40, 30) if not is_white else (20, 120, 90))
    
    # 3D Bag geometry
    bx1, by1, bx2, by2 = 150, 130, 450, 490
    bag = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bag)
    
    # Bag body with rounded corners
    bd.rounded_rectangle([bx1, by1, bx2, by2], radius=16, fill=bag_col + (255,), outline=(100, 90, 80, 255), width=2)
    
    # Shading across the sack
    for x in range(bx1, bx2):
        nx = (x - bx1) / (bx2 - bx1)
        sh = 0.88 + 0.22 * math.sin(nx * math.pi)
        r = int(min(255, bag_col[0] * sh))
        g = int(min(255, bag_col[1] * sh))
        b = int(min(255, bag_col[2] * sh))
        bd.line([(x, by1 + 10), (x, by2 - 10)], fill=(r, g, b, 255))
        
    # Valve stitching top & bottom
    bd.rectangle([bx1, by1, bx2, by1 + 22], fill=accent_col + (255,))
    bd.rectangle([bx1, by2 - 20, bx2, by2], fill=accent_col + (255,))
    for x in range(bx1 + 8, bx2 - 8, 12):
        bd.line([(x, by1 + 5), (x + 6, by1 + 17)], fill=(255, 255, 255, 220), width=2)
        bd.line([(x, by2 - 16), (x + 6, by2 - 4)], fill=(255, 255, 255, 220), width=2)
        
    # Brand & Grade Banner
    bd.rectangle([bx1 + 20, 220, bx2 - 20, 320], fill=accent_col + (255,))
    bd.rectangle([bx1 + 24, 224, bx2 - 24, 316], outline=(255, 255, 255, 200), width=2)
    bd.text((W // 2, 245), item["brand"].upper(), fill=(255, 255, 255), anchor="mm")
    bd.text((W // 2, 280), item["product_name"].upper()[:22], fill=(255, 255, 255), anchor="mm")
    bd.text((W // 2, 302), item["specifications"][:30], fill=(255, 235, 180), anchor="mm")
    
    # 50 kg stamp circle
    bd.ellipse([180, 350, 250, 420], fill=(255, 255, 255, 230), outline=accent_col + (255,), width=3)
    bd.text((215, 375), "NET", fill=(50, 50, 50), anchor="mm")
    bd.text((215, 395), item["pack_size_or_dimensions"].upper(), fill=accent_col, anchor="mm")
    
    # ISI mark stamp
    bd.rectangle([340, 350, 420, 420], fill=(255, 255, 255, 230), outline=(80, 80, 80, 255), width=2)
    bd.text((380, 375), "IS: 12269", fill=(30, 30, 30), anchor="mm")
    bd.text((380, 395), "CM/L-001", fill=(100, 100, 100), anchor="mm")
    
    im.paste(bag, (0, 0), bag)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 2. ELECTRICAL WIRES RENDERER
def render_electrical(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 120, 440, 480, 520, blur=20, opacity=120)
    
    name = item["product_name"]
    is_green = "Earthing" in name
    is_coaxial = "Coaxial" in name
    is_armoured = "Armoured" in name
    is_single = "Single-Core" in name
    is_multi = "Multicore" in name
    is_fr4 = "4.0" in name
    is_fr25 = "2.5" in name
    is_fr15 = "1.5" in name
    
    if is_green:
        jacket_col = (34, 160, 60)
    elif is_coaxial:
        jacket_col = (235, 240, 245)
    elif is_armoured:
        jacket_col = (35, 38, 42)
    elif is_fr4:
        jacket_col = (20, 22, 25)
    elif is_fr25:
        jacket_col = (220, 175, 25)
    elif is_fr15:
        jacket_col = (25, 95, 195)
    elif is_single:
        jacket_col = (200, 35, 30)
    else:
        jacket_col = (205, 40, 35) # Red for 1.0 sq mm
        
    coil = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(coil)
    
    # Multiple concentric wire loops
    cx, cy = 300, 300
    for r in range(160, 80, -14):
        sh = 0.8 + 0.3 * math.sin(r * 0.15)
        cr = int(min(255, jacket_col[0] * sh))
        cg = int(min(255, jacket_col[1] * sh))
        cb = int(min(255, jacket_col[2] * sh))
        cd.ellipse([cx - r, cy - int(r * 0.7), cx + r, cy + int(r * 0.7)], outline=(cr, cg, cb, 255), width=10)
        
    # Cable tie bands with label
    cd.rectangle([280, 170, 320, 430], fill=(255, 255, 255, 240), outline=(180, 190, 205, 255), width=2)
    cd.text((300, 250), item["brand"].upper(), fill=(15, 23, 42), anchor="mm")
    cd.text((300, 280), item["sku"], fill=(100, 116, 139), anchor="mm")
    cd.text((300, 310), item["pack_size_or_dimensions"].upper()[:16], fill=(21, 128, 61), anchor="mm")
    cd.text((300, 340), "1100V · IS 694", fill=(71, 85, 105), anchor="mm")
    
    # Striped copper tips extending out
    cd.line([(380, 220), (450, 190)], fill=jacket_col + (255,), width=8)
    cd.line([(450, 190), (475, 180)], fill=(218, 125, 45, 255), width=5) # Bright copper
    
    im.paste(coil, (0, 0), coil)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 3. LAMINATES & VENEERS RENDERER
def render_surfaces(item, out_path, is_veneer=False):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 470, 490, 530, blur=18, opacity=110)
    
    name = item["product_name"]
    # Determine base palette
    if "Oak" in name or "Teak" in name:
        base_c = (205, 155, 105)
        vein_c = (155, 105, 60)
    elif "Walnut" in name:
        base_c = (115, 75, 50)
        vein_c = (70, 40, 25)
    elif "White" in name:
        base_c = (245, 245, 248)
        vein_c = (210, 215, 225)
    elif "Charcoal" in name or "Black" in name:
        base_c = (48, 52, 58)
        vein_c = (32, 35, 40)
    elif "Marble" in name:
        base_c = (240, 242, 245)
        vein_c = (160, 170, 185)
    elif "Concrete" in name:
        base_c = (165, 170, 175)
        vein_c = (130, 135, 140)
    elif "Metallic" in name:
        base_c = (205, 210, 218)
        vein_c = (160, 170, 180)
    elif "Mahogany" in name or "Burl" in name:
        base_c = (140, 55, 40)
        vein_c = (90, 30, 20)
    else:
        base_c = (195, 175, 150)
        vein_c = (150, 130, 105)
        
    board = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(board)
    
    bx1, by1, bx2, by2 = 140, 120, 460, 480
    bd.rounded_rectangle([bx1, by1, bx2, by2], radius=12, fill=base_c + (255,), outline=(160, 160, 160, 255), width=2)
    
    # Grain lines
    random.seed(hash(item["product_id"]))
    if "Marble" in name:
        for _ in range(6):
            pts = [(random.randint(bx1, bx2), random.randint(by1, by2)) for _ in range(5)]
            pts.sort(key=lambda p: p[0])
            bd.line(pts, fill=vein_c + (160,), width=3)
    elif "Metallic" in name:
        for y in range(by1 + 2, by2 - 2, 4):
            sh = 0.9 + 0.2 * math.sin(y * 0.1)
            bd.line([(bx1 + 2, y), (bx2 - 2, y)], fill=(int(base_c[0]*sh), int(base_c[1]*sh), int(base_c[2]*sh), 255), width=2)
    else:
        for x in range(bx1 + 4, bx2 - 4, random.randint(4, 9)):
            sh = 0.85 + 0.3 * random.random()
            col = (int(base_c[0]*sh), int(base_c[1]*sh), int(base_c[2]*sh), 255)
            bd.line([(x, by1 + 2), (x + random.randint(-4, 4), by2 - 2)], fill=col, width=2)
            
    # Diagonal gloss reflection
    sheen = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sheen)
    sd.polygon([(bx1, by1), (bx1 + 100, by1), (bx1 + 30, by2), (bx1, by2)], fill=(255, 255, 255, 60))
    board = Image.alpha_composite(board, sheen)
    
    im.paste(board, (0, 0), board)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 4. LVT & SPC FLOORING RENDERER
def render_flooring(item, out_path, is_spc=False):
    im = get_base_canvas()
    draw_soft_shadow(im, 100, 460, 500, 530, blur=20, opacity=115)
    
    name = item["product_name"]
    if "Oak" in name or "Wood" in name:
        c1, c2 = (195, 145, 95), (150, 105, 65)
    elif "Walnut" in name or "Smoked" in name:
        c1, c2 = (110, 75, 50), (75, 45, 30)
    elif "Grey" in name or "Slate" in name or "Concrete" in name:
        c1, c2 = (150, 155, 160), (115, 120, 125)
    elif "Ash" in name or "Light" in name:
        c1, c2 = (220, 205, 180), (180, 165, 140)
    elif "Travertine" in name or "Beige" in name:
        c1, c2 = (215, 195, 165), (175, 155, 125)
    else:
        c1, c2 = (180, 140, 100), (140, 100, 70)
        
    plank_img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(plank_img)
    
    # 3 Staggered Planks
    planks = [
        (130, 150, 470, 240),
        (110, 255, 450, 345),
        (140, 360, 480, 450)
    ]
    for px1, py1, px2, py2 in planks:
        pd.rounded_rectangle([px1, py1, px2, py2], radius=6, fill=c1 + (255,), outline=(60, 60, 60, 255), width=2)
        # Texture lines
        for y in range(py1 + 4, py2 - 4, 6):
            sh = 0.88 + 0.24 * math.sin(y * 0.3)
            pd.line([(px1 + 2, y), (px2 - 2, y)], fill=(int(c1[0]*sh), int(c1[1]*sh), int(c1[2]*sh), 255), width=2)
        # Bevel line
        pd.line([(px1 + 2, py2 - 2), (px2 - 2, py2 - 2)], fill=(40, 40, 40, 180), width=2)
        
    # Multi-layer callout badge on corner for SPC
    if is_spc:
        pd.rectangle([340, 400, 460, 440], fill=(25, 45, 75, 240), outline=(255, 255, 255, 255), width=1)
        pd.text((400, 420), "RIGID SPC CORE", fill=(255, 255, 255), anchor="mm")
        
    im.paste(plank_img, (0, 0), plank_img)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 5. MODULAR CARPET PLANKS RENDERER
def render_carpet(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 120, 460, 480, 525, blur=18, opacity=110)
    
    name = item["product_name"]
    if "Blue" in name or "Navy" in name:
        base_c = (40, 75, 120)
    elif "Charcoal" in name or "Graphite" in name:
        base_c = (50, 55, 60)
    elif "Beige" in name or "Eco" in name:
        base_c = (175, 160, 140)
    else:
        base_c = (110, 115, 120)
        
    carpet = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(carpet)
    
    bx1, by1, bx2, by2 = 140, 130, 460, 470
    cd.rounded_rectangle([bx1, by1, bx2, by2], radius=8, fill=base_c + (255,), outline=(40, 40, 40, 255), width=2)
    
    # Carpet weave grid
    for x in range(bx1 + 4, bx2 - 4, 8):
        for y in range(by1 + 4, by2 - 4, 8):
            sh = 0.8 + 0.4 * ((x * 7 + y * 13) % 10) / 10.0
            cd.point((x, y), fill=(int(base_c[0]*sh), int(base_c[1]*sh), int(base_c[2]*sh), 255))
            
    # Subtle ribbed texture lines
    for y in range(by1 + 6, by2 - 6, 12):
        cd.line([(bx1 + 4, y), (bx2 - 4, y)], fill=(int(base_c[0]*0.75), int(base_c[1]*0.75), int(base_c[2]*0.75), 180), width=2)
        
    im.paste(carpet, (0, 0), carpet)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 6. PLYWOOD RENDERER
def render_plywood(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 460, 490, 530, blur=20, opacity=120)
    
    name = item["product_name"]
    is_shuttering = "Shuttering" in name
    is_marine = "Marine" in name
    is_bwr = "BWR" in name
    
    face_col = (45, 40, 38) if is_shuttering else ((200, 160, 110) if not is_marine else (175, 120, 80))
    
    ply = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(ply)
    
    bx1, by1, bx2, by2 = 130, 120, 470, 460
    pd.rounded_rectangle([bx1, by1, bx2, by2], radius=8, fill=face_col + (255,), outline=(70, 60, 50, 255), width=2)
    
    # Multi-ply layered edge (thick bottom layer)
    edge_y1, edge_y2 = by2 - 35, by2
    pd.rectangle([bx1, edge_y1, bx2, edge_y2], fill=(215, 185, 140, 255), outline=(90, 75, 60, 255), width=2)
    # Alternating dark/light veneer glue lines
    for i, y in enumerate(range(edge_y1 + 4, edge_y2 - 2, 5)):
        col = (90, 55, 35, 255) if i % 2 == 0 else (235, 210, 175, 255)
        pd.line([(bx1 + 2, y), (bx2 - 2, y)], fill=col, width=2)
        
    # Face grain
    if not is_shuttering:
        for x in range(bx1 + 4, bx2 - 4, 10):
            sh = 0.9 + 0.2 * math.sin(x * 0.1)
            pd.line([(x, by1 + 4), (x, edge_y1 - 2)], fill=(int(face_col[0]*sh), int(face_col[1]*sh), int(face_col[2]*sh), 255), width=2)
            
    # Certification grade ink stamp on plywood face
    stamp_txt = "IS: 710 MARINE" if is_marine else ("IS: 303 BWR" if is_bwr else ("SHUTTERING 30KG" if is_shuttering else "COMMERCIAL MR"))
    pd.rectangle([180, 230, 420, 310], outline=(150, 30, 20, 220) if not is_shuttering else (220, 180, 40, 220), width=3)
    pd.text((300, 255), item["brand"].upper(), fill=(150, 30, 20) if not is_shuttering else (220, 180, 40), anchor="mm")
    pd.text((300, 285), stamp_txt, fill=(150, 30, 20) if not is_shuttering else (220, 180, 40), anchor="mm")
    
    im.paste(ply, (0, 0), ply)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 7. SANITARYWARE RENDERER
def render_sanitaryware(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 130, 450, 470, 520, blur=22, opacity=120)
    
    name = item["product_name"]
    san = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(san)
    
    if "Toilet" in name or "Urinal" in name:
        # Vitreous china WC
        sd.ellipse([180, 200, 420, 460], fill=(250, 252, 255, 255), outline=(190, 200, 215, 255), width=3)
        sd.ellipse([215, 240, 385, 420], fill=(230, 238, 248, 255), outline=(170, 185, 205, 255), width=2)
        # Cistern box at back
        sd.rounded_rectangle([200, 140, 400, 230], radius=10, fill=(245, 248, 252, 255), outline=(180, 190, 205, 255), width=3)
        sd.ellipse([285, 150, 315, 175], fill=(210, 215, 225, 255), outline=(140, 150, 165, 255), width=2)
    elif "Mixer" in name or "Shower" in name:
        # Chrome plumbing fixture
        sd.rectangle([270, 220, 330, 440], fill=(215, 225, 235, 255), outline=(140, 155, 175, 255), width=3)
        sd.rectangle([240, 220, 360, 260], fill=(235, 242, 250, 255), outline=(140, 155, 175, 255), width=2)
        sd.ellipse([200, 150, 400, 230], fill=(225, 235, 245, 255), outline=(150, 165, 185, 255), width=3)
    elif "Sink" in name and "Kitchen" in name:
        # Stainless steel kitchen sink
        sd.rounded_rectangle([150, 160, 450, 440], radius=16, fill=(210, 218, 226, 255), outline=(130, 140, 155, 255), width=4)
        sd.rounded_rectangle([180, 190, 340, 410], radius=12, fill=(175, 185, 195, 255), outline=(110, 120, 135, 255), width=3)
        sd.ellipse([240, 280, 280, 320], fill=(120, 130, 145, 255))
    else:
        # Countertop / Pedestal Wash Basin
        sd.ellipse([160, 180, 440, 420], fill=(252, 253, 255, 255), outline=(180, 195, 212, 255), width=4)
        sd.ellipse([190, 210, 410, 390], fill=(235, 242, 250, 255), outline=(160, 175, 195, 255), width=2)
        sd.ellipse([285, 285, 315, 315], fill=(180, 190, 205, 255), outline=(120, 130, 145, 255), width=2)
        
    im.paste(san, (0, 0), san)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 8. SKIRTING BOARDS RENDERER
def render_skirting(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 100, 460, 500, 520, blur=18, opacity=110)
    
    name = item["product_name"]
    is_led = "LED" in name
    is_black = "Black" in name
    is_alu = "Aluminium" in name
    is_oak = "Oak" in name
    
    base_c = (35, 38, 42) if is_black else ((210, 218, 226) if is_alu else ((195, 150, 100) if is_oak else (245, 246, 248)))
    
    skb = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(skb)
    
    # 2 Architectural Profiles (Front and Profile Cross Section)
    # Long plank
    sd.rounded_rectangle([110, 240, 490, 380], radius=8, fill=base_c + (255,), outline=(130, 140, 155, 255), width=2)
    # Top curved bevel edge
    sd.line([(110, 260), (490, 260)], fill=(255, 255, 255, 180), width=3)
    
    if is_led:
        # Glowing LED strip channel
        sd.rectangle([110, 350, 490, 370], fill=(255, 240, 160, 255))
        # Warm light glow
        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        gd.rectangle([90, 350, 510, 410], fill=(255, 230, 120, 100))
        glow = glow.filter(ImageFilter.GaussianBlur(12))
        skb = Image.alpha_composite(skb, glow)
        
    im.paste(skb, (0, 0), skb)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 9. STONES RENDERER
def render_stones(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 465, 490, 530, blur=20, opacity=115)
    
    name = item["product_name"]
    if "Galaxy" in name or "Absolute Black" in name:
        base_c = (28, 30, 33)
        is_galaxy = "Galaxy" in name
    elif "Makrana" in name:
        base_c = (248, 249, 252)
    elif "Green" in name:
        base_c = (35, 75, 55)
    elif "Sandstone" in name or "Travertine" in name:
        base_c = (215, 185, 145)
    elif "Kota" in name:
        base_c = (95, 125, 120)
    elif "Tandur" in name:
        base_c = (145, 150, 145)
    else:
        base_c = (220, 222, 225)
        
    stn = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stn)
    
    bx1, by1, bx2, by2 = 140, 125, 460, 475
    sd.rounded_rectangle([bx1, by1, bx2, by2], radius=10, fill=base_c + (255,), outline=(140, 140, 140, 255), width=2)
    
    random.seed(hash(item["product_id"]))
    if "Galaxy" in name:
        # Golden flecks in galaxy granite
        for _ in range(80):
            fx = random.randint(bx1 + 8, bx2 - 8)
            fy = random.randint(by1 + 8, by2 - 8)
            sd.ellipse([fx, fy, fx + random.randint(2, 5), fy + random.randint(2, 5)], fill=(225, 185, 65, 230))
    elif "Makrana" in name or "Green" in name:
        # Veining
        v_col = (175, 180, 195, 160) if "Makrana" in name else (15, 45, 30, 190)
        for _ in range(8):
            pts = [(random.randint(bx1, bx2), random.randint(by1, by2)) for _ in range(6)]
            pts.sort(key=lambda p: p[0])
            sd.line(pts, fill=v_col, width=random.randint(2, 4))
    else:
        # Natural stone speckles
        for _ in range(120):
            fx = random.randint(bx1 + 6, bx2 - 6)
            fy = random.randint(by1 + 6, by2 - 6)
            sd.point((fx, fy), fill=(int(base_c[0]*0.7), int(base_c[1]*0.7), int(base_c[2]*0.7), 200))
            
    # Polished specular sheen
    sheen = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    shd = ImageDraw.Draw(sheen)
    shd.polygon([(bx1, by1), (bx1 + 90, by1), (bx1 + 35, by2), (bx1, by2)], fill=(255, 255, 255, 75))
    stn = Image.alpha_composite(stn, sheen)
    
    im.paste(stn, (0, 0), stn)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# 10. TILES RENDERER
def render_tiles(item, out_path):
    im = get_base_canvas()
    draw_soft_shadow(im, 110, 465, 490, 530, blur=18, opacity=115)
    
    name = item["product_name"]
    is_mosaic = "Mosaic" in name
    is_subway = "Subway" in name
    is_parking = "Parking" in name
    is_wood = "Wood" in name
    
    tile = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    
    bx1, by1, bx2, by2 = 140, 130, 460, 470
    td.rounded_rectangle([bx1, by1, bx2, by2], radius=8, fill=(245, 248, 252, 255), outline=(180, 190, 205, 255), width=3)
    
    if is_mosaic:
        # Tesserae mosaic grid
        for mx in range(bx1 + 6, bx2 - 6, 32):
            for my in range(by1 + 6, by2 - 6, 32):
                c = [(70, 120, 180), (120, 180, 210), (220, 235, 245)][(mx + my) % 3]
                td.rectangle([mx, my, mx + 28, my + 28], fill=c + (255,), outline=(210, 220, 230, 255), width=1)
    elif is_subway:
        # Beveled subway bricks
        row = 0
        for my in range(by1 + 8, by2 - 8, 45):
            offset = 35 if row % 2 == 1 else 0
            for mx in range(bx1 + 8 - offset, bx2 - 8, 70):
                td.rounded_rectangle([max(bx1 + 4, mx), my, min(bx2 - 4, mx + 64), my + 38], radius=3, fill=(255, 255, 255, 255), outline=(190, 200, 215, 255), width=2)
            row += 1
    elif is_parking:
        # Diamond tread heavy texture
        td.rectangle([bx1 + 4, by1 + 4, bx2 - 4, by2 - 4], fill=(135, 140, 145, 255))
        for x in range(bx1 + 10, bx2 - 10, 24):
            for y in range(by1 + 10, by2 - 10, 24):
                td.polygon([(x + 12, y), (x + 24, y + 12), (x + 12, y + 24), (x, y + 12)], fill=(110, 115, 120, 255), outline=(160, 165, 170, 255), width=1)
    elif is_wood:
        td.rectangle([bx1 + 4, by1 + 4, bx2 - 4, by2 - 4], fill=(190, 145, 95, 255))
        for y in range(by1 + 6, by2 - 6, 8):
            td.line([(bx1 + 4, y), (bx2 - 4, y)], fill=(155, 110, 65, 255), width=2)
    else:
        # High gloss polished tile
        td.rectangle([bx1 + 4, by1 + 4, bx2 - 4, by2 - 4], fill=(250, 252, 255, 255))
        td.text((W // 2, H // 2), item["brand"].upper(), fill=(140, 160, 185), anchor="mm")
        sheen = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        shd = ImageDraw.Draw(sheen)
        shd.polygon([(bx1, by1), (bx1 + 120, by1), (bx1 + 40, by2), (bx1, by2)], fill=(255, 255, 255, 90))
        tile = Image.alpha_composite(tile, sheen)
        
    im.paste(tile, (0, 0), tile)
    draw_spec_badge(im, item["product_name"], item["sku"], item["brand"], item["price"])
    im.save(out_path, "PNG", quality=95)

# DISPATCHER
def render_item(item):
    pid = item["product_id"].lower().replace("-", "_")
    out_path = f"assets/products/{pid}.png"
    cat = item["category"]
    
    if cat == "Cement":
        render_cement(item, out_path)
    elif cat == "Electrical Wires & Cables":
        render_electrical(item, out_path)
    elif cat == "Laminates":
        render_surfaces(item, out_path, is_veneer=False)
    elif cat == "Veneers":
        render_surfaces(item, out_path, is_veneer=True)
    elif cat == "LVT Flooring":
        render_flooring(item, out_path, is_spc=False)
    elif cat == "SPC Flooring":
        render_flooring(item, out_path, is_spc=True)
    elif cat == "Modular Carpet Planks":
        render_carpet(item, out_path)
    elif cat == "Plywood":
        render_plywood(item, out_path)
    elif cat == "Sanitaryware":
        render_sanitaryware(item, out_path)
    elif cat == "Skirting Boards":
        render_skirting(item, out_path)
    elif cat == "Stones":
        render_stones(item, out_path)
    elif cat == "Tiles":
        render_tiles(item, out_path)
    return out_path

import process_dataset
count = 0
for row in process_dataset.rows:
    render_item(row)
    count += 1

print(f"Successfully generated {count} studio-quality product images in assets/products/!")
