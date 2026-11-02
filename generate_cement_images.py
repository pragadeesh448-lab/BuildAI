import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("assets/products", exist_ok=True)

W, H = 600, 600

def get_font(size, bold=False):
    font_paths = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

CEMENTS = [
    {
        "id": "bb_cem_001",
        "sku": "CEM-ULT-43",
        "name": "UltraTech 43 Grade Ordinary Portland Cement (OPC)",
        "brand": "UltraTech Cement",
        "color": (245, 205, 30), # UltraTech yellow
        "accent": (25, 25, 25), # UltraTech black
        "sack": (220, 215, 205), # Woven sack beige
        "spec": "IS 269:2015 OPC 43 Grade; 50 kg HDPE Bag",
        "grade": "OPC 43",
        "tagline": "THE ENGINEER'S CHOICE",
        "net": "50 kg NET",
        "isi": "IS:269",
        "price": 395,
        "supplierId": "lakshmi",
        "supplierName": "Lakshmi Steel & Structural Traders"
    },
    {
        "id": "bb_cem_002",
        "sku": "CEM-ULT-53",
        "name": "UltraTech 53 Grade High-Strength OPC Cement",
        "brand": "UltraTech Cement",
        "color": (210, 35, 30), # High strength red
        "accent": (25, 25, 25), # Black
        "sack": (215, 212, 205),
        "spec": "IS 12269:2013 High-Strength 53 Grade; 50 kg Bag",
        "grade": "OPC 53",
        "tagline": "ULTRA STRENGTH RCC",
        "net": "50 kg NET",
        "isi": "IS:12269",
        "price": 425,
        "supplierId": "lakshmi",
        "supplierName": "Lakshmi Steel & Structural Traders"
    },
    {
        "id": "bb_cem_003",
        "sku": "CEM-ULT-PPC",
        "name": "UltraTech Super Portland Pozzolana Cement (PPC)",
        "brand": "UltraTech Cement",
        "color": (245, 205, 30),
        "accent": (15, 75, 150), # Blue accent
        "sack": (225, 222, 215),
        "spec": "IS 1489 Part 1 Fly-ash based PPC; 50 kg Bag",
        "grade": "SUPER PPC",
        "tagline": "DENSE & IMPERMEABLE",
        "net": "50 kg NET",
        "isi": "IS:1489",
        "price": 380,
        "supplierId": "babu",
        "supplierName": "Babu Agencies Multi-Material Mart"
    },
    {
        "id": "bb_cem_004",
        "sku": "CEM-ACC-PLUS",
        "name": "ACC Concrete+ High Performance Slag Cement (PSC)",
        "brand": "ACC Cement",
        "color": (215, 30, 30), # ACC Red
        "accent": (25, 115, 60), # Eco green
        "sack": (220, 220, 215),
        "spec": "IS 455 Portland Slag Cement (PSC); 50 kg Bag",
        "grade": "CONCRETE+ PSC",
        "tagline": "HOLCIM EXPERT TECHNOLOGY",
        "net": "50 kg NET",
        "isi": "IS:455",
        "price": 375,
        "supplierId": "babu",
        "supplierName": "Babu Agencies Multi-Material Mart"
    },
    {
        "id": "bb_cem_005",
        "sku": "CEM-DAL-DSP",
        "name": "Dalmia DSP Heavy Weather-Proof Anti-Crack Cement",
        "brand": "Dalmia Cement",
        "color": (15, 110, 180), # Dalmia Blue
        "accent": (220, 50, 40), # Red
        "sack": (225, 223, 218),
        "spec": "DSP Premium Engineered Weather Protection; 50 kg",
        "grade": "DALMIA DSP",
        "tagline": "DHALAI SPECIAL PRO",
        "net": "50 kg NET",
        "isi": "IS:1489",
        "price": 415,
        "supplierId": "lakshmi",
        "supplierName": "Lakshmi Steel & Structural Traders"
    },
    {
        "id": "bb_cem_006",
        "sku": "CEM-AMB-ROOF",
        "name": "Ambuja Plus Roof Special High-Density Cement",
        "brand": "Ambuja Cement",
        "color": (220, 30, 30), # Ambuja Red
        "accent": (15, 45, 120), # Deep Navy
        "sack": (220, 218, 210),
        "spec": "Advanced mineral polymer roof seal mix; 50 kg",
        "grade": "PLUS ROOF",
        "tagline": "GIANT STRENGTH",
        "net": "50 kg NET",
        "isi": "IS:1489",
        "price": 435,
        "supplierId": "babu",
        "supplierName": "Babu Agencies Multi-Material Mart"
    },
    {
        "id": "bb_cem_007",
        "sku": "CEM-BIR-WHT",
        "name": "Birla White Classic Architectural White Portland Cement",
        "brand": "Birla White",
        "color": (30, 110, 60), # Forest Green
        "accent": (210, 170, 30), # Gold
        "sack": (248, 248, 250), # Pure White bag
        "spec": "IS 8042 White Portland Cement; 25 kg Laminated Bag",
        "grade": "WHITE OPC",
        "tagline": "HIGH REFLECTANCE 89%+",
        "net": "25 kg NET",
        "isi": "IS:8042",
        "price": 630,
        "supplierId": "lakshmi",
        "supplierName": "Lakshmi Steel & Structural Traders"
    },
    {
        "id": "bb_cem_008",
        "sku": "CEM-RAM-SUP",
        "name": "Ramco Supercrete High-Early Strength PPC Cement",
        "brand": "The Ramco Cements",
        "color": (25, 80, 160), # Ramco Royal Blue
        "accent": (240, 180, 20), # Yellow
        "sack": (222, 220, 214),
        "spec": "Right product for concrete; 50 kg HDPE Bag",
        "grade": "SUPERCRETE",
        "tagline": "CRACK RESISTANT",
        "net": "50 kg NET",
        "isi": "IS:1489",
        "price": 390,
        "supplierId": "babu",
        "supplierName": "Babu Agencies Multi-Material Mart"
    },
    {
        "id": "bb_cem_009",
        "sku": "CEM-JSW-PSC",
        "name": "JSW Concreel HD Slag Cement Eco-Friendly",
        "brand": "JSW Cement",
        "color": (20, 130, 75), # JSW Green
        "accent": (20, 45, 95), # Navy
        "sack": (222, 222, 220),
        "spec": "Portland Slag Cement high chemical durability; 50 kg",
        "grade": "CONCREEL HD",
        "tagline": "GREEN PRO CERTIFIED",
        "net": "50 kg NET",
        "isi": "IS:455",
        "price": 370,
        "supplierId": "babu",
        "supplierName": "Babu Agencies Multi-Material Mart"
    },
    {
        "id": "bb_cem_010",
        "sku": "CEM-CHT-MAS",
        "name": "Chettinad Super Grade Masonry Mortar Cement",
        "brand": "Chettinad Cement",
        "color": (160, 40, 25), # Maroon red
        "accent": (230, 190, 40), # Gold
        "sack": (224, 220, 212),
        "spec": "IS 3466 Masonry Cement high workability; 50 kg",
        "grade": "MASONRY PRO",
        "tagline": "SUPERIOR BONDING",
        "net": "50 kg NET",
        "isi": "IS:3466",
        "price": 345,
        "supplierId": "lakshmi",
        "supplierName": "Lakshmi Steel & Structural Traders"
    }
]

def render_realistic_cement_bag(c):
    im = Image.new("RGB", (W, H), (246, 248, 251)) # Clean studio grey-white
    draw = ImageDraw.Draw(im)

    # Subtle studio background vignette & ground plane
    for y in range(400, H):
        factor = (y - 400) / 200
        shade = int(246 - factor * 14)
        draw.line([(0, y), (W, y)], fill=(shade, shade + 2, shade + 5))

    # Soft ambient drop shadow underneath bag
    for r in range(45, 0, -3):
        alpha = int(220 * (1 - r / 45))
        sx1 = 110 - r
        sy1 = 490 - int(r * 0.4)
        sx2 = 490 + r
        sy2 = 540 + int(r * 0.7)
        # Draw ellipse layer
        sh_color = (205 - int(alpha * 0.25), 210 - int(alpha * 0.25), 218 - int(alpha * 0.25))
        draw.ellipse([sx1, sy1, sx2, sy2], fill=sh_color)

    # 3D Bag Dimensions
    bx1, by1, bx2, by2 = 145, 110, 455, 505
    sack_base = c["sack"]

    # Draw bag sack with simulated woven polymer fabric texture & 3D curvature
    for x in range(bx1, bx2 + 1):
        rel_x = (x - bx1) / (bx2 - bx1) # 0 to 1
        # Bulge lighting formula: bright highlight around 30% from left, shadow on edges
        light = 0.85 + 0.28 * math.sin(rel_x * math.pi)
        if rel_x < 0.15:
            light *= 0.85 + rel_x
        elif rel_x > 0.85:
            light *= 0.85 + (1 - rel_x)

        r = int(min(255, max(0, sack_base[0] * light)))
        g = int(min(255, max(0, sack_base[1] * light)))
        b = int(min(255, max(0, sack_base[2] * light)))
        
        # Add micro woven weave pattern
        curve_top = int(by1 + 10 * math.sin(rel_x * math.pi))
        curve_bot = int(by2 - 12 * math.sin(rel_x * math.pi))
        draw.line([(x, curve_top), (x, curve_bot)], fill=(r, g, b))

    # Woven HDPE fabric lines
    for y in range(by1 + 15, by2 - 15, 8):
        draw.line([(bx1 + 6, y), (bx2 - 6, y)], fill=(int(sack_base[0]*0.92), int(sack_base[1]*0.92), int(sack_base[2]*0.92)), width=1)

    # Side gusset crease shadows
    for d in range(12):
        shade_left = int(40 * (1 - d / 12))
        draw.line([(bx1 + d, by1 + 15), (bx1 + d, by2 - 15)], fill=(max(0, sack_base[0] - shade_left), max(0, sack_base[1] - shade_left), max(0, sack_base[2] - shade_left)))
        draw.line([(bx2 - d, by1 + 15), (bx2 - d, by2 - 15)], fill=(max(0, sack_base[0] - shade_left), max(0, sack_base[1] - shade_left), max(0, sack_base[2] - shade_left)))

    # Valve Stitching Top and Bottom (Sewn hem thread)
    stitch_top = by1 + 14
    stitch_bot = by2 - 16
    draw.rectangle([bx1 + 4, stitch_top - 6, bx2 - 4, stitch_top + 10], fill=c["accent"])
    draw.rectangle([bx1 + 4, stitch_bot - 8, bx2 - 4, stitch_bot + 8], fill=c["accent"])
    
    # White thread zig-zag
    for x in range(bx1 + 12, bx2 - 12, 12):
        draw.line([(x, stitch_top - 4), (x + 6, stitch_top + 8)], fill=(255, 255, 255), width=2)
        draw.line([(x + 6, stitch_top + 8), (x + 12, stitch_top - 4)], fill=(240, 240, 240), width=2)
        draw.line([(x, stitch_bot - 6), (x + 6, stitch_bot + 6)], fill=(255, 255, 255), width=2)
        draw.line([(x + 6, stitch_bot + 6), (x + 12, stitch_bot - 6)], fill=(240, 240, 240), width=2)

    # Brand Central Shield / Banner
    banner_y1 = 175
    banner_y2 = 330
    draw.rounded_rectangle([bx1 + 18, banner_y1, bx2 - 18, banner_y2], radius=10, fill=c["color"], outline=c["accent"], width=2)
    # Inner border line
    draw.rounded_rectangle([bx1 + 22, banner_y1 + 4, bx2 - 22, banner_y2 - 4], radius=8, outline=(255, 255, 255), width=2)

    # Brand Title
    f_brand = get_font(24, bold=True)
    f_grade = get_font(28, bold=True)
    f_tag = get_font(12, bold=True)
    f_small = get_font(11, bold=True)
    f_isi = get_font(10, bold=True)

    text_brand_col = (255, 255, 255) if (c["color"][0]*0.299 + c["color"][1]*0.587 + c["color"][2]*0.114) < 160 else (20, 20, 20)
    draw.text((W // 2, banner_y1 + 25), c["brand"].upper(), fill=text_brand_col, font=f_brand, anchor="mm")
    
    # Grade Pill
    draw.rounded_rectangle([bx1 + 35, banner_y1 + 52, bx2 - 35, banner_y1 + 104], radius=6, fill=c["accent"])
    draw.text((W // 2, banner_y1 + 78), c["grade"], fill=(255, 255, 255), font=f_grade, anchor="mm")

    # Tagline
    draw.text((W // 2, banner_y2 - 20), c["tagline"], fill=text_brand_col, font=f_tag, anchor="mm")

    # Bottom Seals: 50 kg stamp circle on Left, ISI Certification Mark on Right
    # Net Weight Seal
    cx, cy, rad = 215, 410, 44
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(255, 255, 255), outline=c["accent"], width=3)
    draw.text((cx, cy - 14), "NET WEIGHT", fill=(80, 80, 80), font=f_small, anchor="mm")
    draw.text((cx, cy + 8), c["net"].split()[0], fill=c["accent"], font=get_font(22, bold=True), anchor="mm")
    draw.text((cx, cy + 26), "KG", fill=c["accent"], font=f_small, anchor="mm")

    # ISI Mark Box
    ix1, iy1, ix2, iy2 = 330, 366, 420, 454
    draw.rectangle([ix1, iy1, ix2, iy2], fill=(255, 255, 255), outline=(60, 60, 60), width=2)
    draw.text(((ix1 + ix2) // 2, iy1 + 16), "ISI", fill=(20, 20, 20), font=get_font(18, bold=True), anchor="mm")
    draw.line([(ix1 + 10, iy1 + 30), (ix2 - 10, iy1 + 30)], fill=(120, 120, 120), width=1)
    draw.text(((ix1 + ix2) // 2, iy1 + 44), c["isi"], fill=(40, 40, 40), font=f_isi, anchor="mm")
    draw.text(((ix1 + ix2) // 2, iy1 + 64), "CM/L-829104", fill=(100, 100, 100), font=get_font(8), anchor="mm")

    # Batch verification badge at top corner
    draw.polygon([(bx1 + 18, by1 + 22), (bx1 + 80, by1 + 22), (bx1 + 18, by1 + 84)], fill=(20, 140, 70))
    draw.text((bx1 + 38, by1 + 42), "BIS", fill=(255, 255, 255), font=get_font(10, bold=True), anchor="mm")

    out_file = f"assets/products/{c['id']}.png"
    im.save(out_file, "PNG", quality=95)
    print(f"Generated {out_file} ({c['brand']} - {c['grade']})")

for c in CEMENTS:
    render_realistic_cement_bag(c)

print("All 10 cement images rendered with photo-realistic quality!")
