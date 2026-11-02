import os
import math
from PIL import Image, ImageDraw, ImageFilter

PAINT_COLORS = [
    # Whites & Off-Whites (8)
    ("paint_soft_ivory", "Soft Ivory", "#F5F0E6", "Asian Paints · Royale Luxury", 520, "1L can · Warm Scandinavian off-white interior emulsion", "Interior"),
    ("paint_morning_dew", "Morning Dew", "#F2F4F1", "Asian Paints · Royale Luxury", 520, "1L can · Crisp morning dew light neutral", "Interior"),
    ("paint_cotton_wool", "Cotton Wool", "#FAF8F5", "Asian Paints · Royale Luxury", 510, "1L can · Pure breathable cotton off-white", "Interior"),
    ("paint_pearl_white", "Luster Pearl", "#F8F6F0", "Asian Paints · Royale Luxury", 540, "1L can · Subtle pearlescent sheen white", "Interior"),
    ("paint_crisp_linen", "Crisp Linen", "#ECE6DB", "Asian Paints · Royale Luxury", 520, "1L can · Natural unbleached linen neutral", "Interior"),
    ("paint_vanilla_frost", "Vanilla Frost", "#F6EEDB", "Asian Paints · Royale Luxury", 510, "1L can · Sweet warm vanilla interior emulsion", "Interior"),
    ("paint_chalk_white", "Architectural Chalk", "#F0EFEA", "Asian Paints · Apex Ultima", 550, "1L can · High-durability exterior & interior matte", "WeatherProof"),
    ("paint_almond_crush", "Almond Crush", "#EDE4D3", "Asian Paints · Royale Luxury", 520, "1L can · Velvety crushed almond off-white", "Interior"),

    # Greiges & Earthy Neutrals (8)
    ("paint_warm_greige", "Warm Greige", "#C2B8AA", "Asian Paints · Royale Luxury", 530, "1L can · Designer favorite warm grey-beige", "Interior"),
    ("paint_urban_taupe", "Urban Taupe", "#A89F91", "Asian Paints · Royale Luxury", 540, "1L can · Modern sophisticated urban taupe", "Interior"),
    ("paint_desert_dune", "Desert Dune Sand", "#DFCFB7", "Asian Paints · Apex Ultima", 560, "1L can · Sun-drenched desert dune exterior/interior", "WeatherProof"),
    ("paint_raw_jute", "Raw Jute", "#C7B299", "Asian Paints · Royale Luxury", 530, "1L can · Organic earthy jute texture finish", "Interior"),
    ("paint_stone_path", "Muted Stone Path", "#B8B0A2", "Asian Paints · Royale Luxury", 530, "1L can · Timeless mineral stone neutral", "Interior"),
    ("paint_cashmere_mist", "Cashmere Mist", "#DDD5C7", "Asian Paints · Royale Luxury", 540, "1L can · Soft luxury cashmere mineral paint", "Interior"),
    ("paint_driftwood_grey", "Coastal Driftwood", "#9C9488", "Asian Paints · Apex Ultima", 550, "1L can · Weathered coastal timber grey", "WeatherProof"),
    ("paint_italian_latte", "Italian Latte", "#BFA893", "Asian Paints · Royale Luxury", 530, "1L can · Rich creamy Italian latte tone", "Interior"),

    # Greens & Biophilic Living (8)
    ("paint_sage_serenity", "Sage Serenity", "#A5B1A0", "Asian Paints · Royale Luxury", 560, "1L can · Soothing biophilic sage green emulsion", "Interior"),
    ("paint_olive_grove", "Olive Grove", "#6B7B61", "Asian Paints · Royale Luxury", 560, "1L can · Mediterranean olive leaf green", "Interior"),
    ("paint_forest_emerald", "Emerald Forest", "#2F4838", "Asian Paints · Royale Luxury", 580, "1L can · Deep rich botanical emerald accent", "Luxury Sheen"),
    ("paint_eucalyptus_mint", "Eucalyptus Mint", "#9FB4A6", "Asian Paints · Royale Luxury", 550, "1L can · Refreshing pale eucalyptus mint", "Interior"),
    ("paint_moss_velvet", "Deep Moss Velvet", "#3D5236", "Asian Paints · Apex Ultima", 570, "1L can · Forest moss all-weather acrylic", "WeatherProof"),
    ("paint_celadon_mist", "Celadon Mist", "#B5C4B3", "Asian Paints · Royale Luxury", 540, "1L can · Antique jade-celadon calming hue", "Interior"),
    ("paint_cypress_green", "Tuscan Cypress", "#455B46", "Asian Paints · Royale Luxury", 560, "1L can · Classic Tuscan cypress arbor tone", "Interior"),
    ("paint_avocado_cream", "Avocado Cream", "#899B77", "Asian Paints · Royale Luxury", 550, "1L can · Warm organic avocado kitchen/living tone", "Interior"),

    # Blues & Aquas (8)
    ("paint_coastal_slate", "Coastal Slate Blue", "#A8C3D2", "Asian Paints · Apex Ultima", 560, "1L can · Breezy coastal slate blue exterior/interior", "WeatherProof"),
    ("paint_royal_navy", "Royal Velvet Navy", "#2B3F5C", "Asian Paints · Royale Luxury", 590, "1L can · Deep dramatic heritage royal navy", "Luxury Sheen"),
    ("paint_midnight_ocean", "Midnight Ocean", "#1B2A3D", "Asian Paints · Royale Luxury", 590, "1L can · Moody atmospheric deep midnight blue", "Luxury Sheen"),
    ("paint_breeze_aqua", "Aegean Sea Breeze", "#7CAABF", "Asian Paints · Royale Luxury", 560, "1L can · Vibrant Mediterranean sea aqua", "Interior"),
    ("paint_monsoon_sky", "Monsoon Rain Sky", "#8EA3B0", "Asian Paints · Apex Ultima", 550, "1L can · Serene monsoon cloud slate", "WeatherProof"),
    ("paint_arctic_ice", "Arctic Blue Ice", "#C8DBE3", "Asian Paints · Royale Luxury", 540, "1L can · Airy crystalline pale blue", "Interior"),
    ("paint_indigo_ink", "Heritage Indigo", "#243353", "Asian Paints · Royale Luxury", 590, "1L can · Rich traditional Indian indigo accent", "Luxury Sheen"),
    ("paint_duck_egg_blue", "Vintage Duck Egg", "#9BB5B8", "Asian Paints · Royale Luxury", 550, "1L can · Classic Victorian duck egg blue-grey", "Interior"),

    # Earth, Terracottas & Warm Clay (8)
    ("paint_tuscan_terracotta", "Tuscan Terracotta", "#BD8066", "Asian Paints · Apex Ultima", 560, "1L can · Sunbaked Italian terracotta clay", "WeatherProof"),
    ("paint_burnt_sienna", "Burnt Sienna", "#A35638", "Asian Paints · Royale Luxury", 570, "1L can · Rich earthy roasted sienna earth", "Interior"),
    ("paint_cinnamon_bark", "Cinnamon Bark", "#914C36", "Asian Paints · Royale Luxury", 570, "1L can · Warm aromatic cinnamon spice wall paint", "Interior"),
    ("paint_rust_amber", "Warm Amber Rust", "#B86536", "Asian Paints · Royale Luxury", 560, "1L can · Vibrant golden amber rust accent", "Interior"),
    ("paint_crimson_sunset", "Crimson Sunset", "#993636", "Asian Paints · Royale Luxury", 580, "1L can · Deep velvety sunset crimson", "Luxury Sheen"),
    ("paint_moroccan_clay", "Moroccan Red Clay", "#A74A3D", "Asian Paints · Apex Ultima", 570, "1L can · Authentic Marrakech clay red", "WeatherProof"),
    ("paint_paprika_warmth", "Paprika Warmth", "#B4492E", "Asian Paints · Royale Luxury", 570, "1L can · Zesty warm Spanish paprika orange-red", "Interior"),
    ("paint_copper_glow", "Burnished Copper", "#AD5C3D", "Asian Paints · Royale Luxury", 580, "1L can · Metallic undertone warm copper glow", "Luxury Sheen"),

    # Pinks, Corals & Blushes (6)
    ("paint_dusty_rose", "Dusty Rose Blush", "#C98C80", "Asian Paints · Royale Luxury", 550, "1L can · Sophisticated muted dusty rose blush", "Interior"),
    ("paint_blush_quartz", "Rose Quartz Blush", "#E2ADA5", "Asian Paints · Royale Luxury", 540, "1L can · Gentle pastel rose quartz pink", "Interior"),
    ("paint_sunbaked_coral", "Sunbaked Coral", "#D17E70", "Asian Paints · Royale Luxury", 560, "1L can · Warm island sunbaked coral pink", "Interior"),
    ("paint_velvet_petal", "Velvet Petal", "#E8C5BE", "Asian Paints · Royale Luxury", 530, "1L can · Ultra-soft velvety blush off-white", "Interior"),
    ("paint_vintage_mauve", "Vintage Mauve", "#9C6B75", "Asian Paints · Royale Luxury", 560, "1L can · Elegant heritage smoky mauve accent", "Interior"),
    ("paint_apricot_nectar", "Warm Apricot Nectar", "#E5A582", "Asian Paints · Royale Luxury", 540, "1L can · Inviting warm apricot peachy tone", "Interior"),

    # Darks, Charcoals & Luxury Accents (6)
    ("paint_charcoal_noir", "Charcoal Noir", "#383B40", "Asian Paints · Royale Luxury", 590, "1L can · Dramatic matte architectural charcoal", "Luxury Sheen"),
    ("paint_graphite_slate", "Graphite Slate", "#2A2D32", "Asian Paints · Apex Ultima", 590, "1L can · Deep industrial graphite slate grey", "WeatherProof"),
    ("paint_smoky_quartz", "Smoky Quartz", "#484543", "Asian Paints · Royale Luxury", 580, "1L can · Warm complex smoky quartz brown-grey", "Interior"),
    ("paint_espresso_dark", "Espresso Bean", "#3E322D", "Asian Paints · Royale Luxury", 580, "1L can · Deep roasted coffee dark accent wall", "Luxury Sheen"),
    ("paint_pure_obsidian", "Pure Obsidian", "#1E2022", "Asian Paints · Royale Luxury", 600, "1L can · Statement deep velvet black", "Luxury Sheen"),
    ("paint_storm_cloud", "Thunder Storm Cloud", "#4D5660", "Asian Paints · Apex Ultima", 570, "1L can · Dynamic moody storm cloud grey", "WeatherProof")
]

print(f"Total paint colors defined: {len(PAINT_COLORS)}")

import json

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def render_paint_bucket(color_name, hex_code, brand_name, out_path):
    w, h = 600, 600
    im = Image.new('RGB', (w, h), (247, 249, 251))

    # 1. Soft Floor Shadow
    shadow_mask = Image.new('L', (w, h), 0)
    s_draw = ImageDraw.Draw(shadow_mask)
    s_draw.ellipse([110, 470, 490, 530], fill=130)
    s_draw.ellipse([150, 480, 450, 520], fill=190)
    shadow_blurred = shadow_mask.filter(ImageFilter.GaussianBlur(16))
    shadow_layer = Image.new('RGB', (w, h), (30, 40, 55))
    im.paste(shadow_layer, (0, 0), shadow_blurred)

    rgb = hex_to_rgb(hex_code)
    cx1, cy1, cx2, cy2 = 160, 170, 440, 490
    can_w = cx2 - cx1
    can_h = cy2 - cy1

    # 2. Main Can Body (3D white enamel / silver tin)
    can_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(can_img)

    for x in range(cx1, cx2):
        norm_x = (x - cx1) / float(can_w)
        shade = 0.85 + 0.25 * math.cos((norm_x - 0.3) * math.pi)
        r = int(min(255, 235 * shade))
        g = int(min(255, 238 * shade))
        b = int(min(255, 242 * shade))
        c_draw.line([(x, cy1 + 15), (x, cy2 - 15)], fill=(r, g, b, 255))

    # Rims
    c_draw.ellipse([cx1, cy1, cx2, cy1 + 30], fill=(215, 220, 228, 255), outline=(170, 180, 195, 255), width=2)
    c_draw.ellipse([cx1, cy2 - 30, cx2, cy2], fill=(210, 215, 225, 255), outline=(160, 170, 185, 255), width=2)
    c_draw.ellipse([cx1 + 14, cy1 + 5, cx2 - 14, cy1 + 25], fill=(230, 235, 242, 255), outline=(180, 190, 205, 255), width=1)

    # 3. Can Label Brand Header
    is_apex = "Apex" in brand_name
    header_color = (25, 45, 75, 255) if not is_apex else (15, 60, 50, 255)
    gold_border = (220, 170, 45, 255) if not is_apex else (80, 190, 150, 255)
    sub_title = "ROYALE LUXURY" if not is_apex else "APEX ULTIMA"

    c_draw.rectangle([cx1 + 2, 205, cx2 - 2, 255], fill=header_color)
    c_draw.line([(cx1 + 2, 204), (cx2 - 2, 204)], fill=gold_border, width=2)
    c_draw.line([(cx1 + 2, 256), (cx2 - 2, 256)], fill=gold_border, width=2)
    c_draw.text((w // 2, 220), "ASIAN PAINTS", fill=(255, 255, 255), anchor="mm")
    c_draw.text((w // 2, 240), sub_title, fill=gold_border[:3], anchor="mm")

    # 4. Large Color Swatch Window on the Can
    sw_y1, sw_y2 = 270, 420
    c_draw.rectangle([cx1 + 8, sw_y1, cx2 - 8, sw_y2], fill=(rgb[0], rgb[1], rgb[2], 255), outline=(255, 255, 255, 255), width=3)

    # Diagonal gloss sheen
    sheen = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(sheen)
    sh_draw.polygon([(cx1 + 8, sw_y1), (cx1 + 105, sw_y1), (cx1 + 35, sw_y2), (cx1 + 8, sw_y2)], fill=(255, 255, 255, 75))
    can_img = Image.alpha_composite(can_img, sheen)
    c_draw = ImageDraw.Draw(can_img)

    # Swatch badge text card
    c_draw.rectangle([cx1 + 20, 360, cx2 - 20, 410], fill=(255, 255, 255, 235), outline=(210, 215, 225, 255), width=1)
    c_draw.text((w // 2, 375), color_name.upper(), fill=(15, 23, 42), anchor="mm")
    c_draw.text((w // 2, 395), f"CODE: {hex_code.upper()} · LUXURY FINISH", fill=(71, 85, 105), anchor="mm")

    # Bottom Specs
    c_draw.text((w // 2, 442), "TEFLON SURFACE PROTECTOR · 1L NET", fill=(30, 41, 59), anchor="mm")
    c_draw.text((w // 2, 458), "100% ACRYLIC LATEX · ANTI-FUNGAL", fill=(71, 85, 105), anchor="mm")

    # Handle / Bail
    c_draw.ellipse([cx1 - 6, 260, cx1 + 10, 276], fill=(160, 170, 185, 255), outline=(100, 110, 125, 255), width=2)
    c_draw.ellipse([cx2 - 10, 260, cx2 + 6, 276], fill=(160, 170, 185, 255), outline=(100, 110, 125, 255), width=2)
    c_draw.arc([cx1 - 25, 115, cx2 + 25, 270], start=180, end=360, fill=(170, 180, 195, 255), width=5)

    # 5. Designer Color Swatch Floating Chip Card on Right
    chip_x1, chip_y1 = 445, 160
    chip_w, chip_h = 110, 150
    chip_mask = Image.new('L', (w, h), 0)
    ch_s = ImageDraw.Draw(chip_mask)
    ch_s.rounded_rectangle([chip_x1 + 3, chip_y1 + 5, chip_x1 + chip_w + 5, chip_y1 + chip_h + 8], radius=8, fill=100)
    chip_shadow = Image.new('RGB', (w, h), (30, 40, 60))
    im.paste(chip_shadow, (0, 0), chip_mask.filter(ImageFilter.GaussianBlur(10)))

    c_draw.rounded_rectangle([chip_x1, chip_y1, chip_x1 + chip_w, chip_y1 + chip_h], radius=8, fill=(255, 255, 255, 255), outline=(220, 226, 235, 255), width=2)
    c_draw.rounded_rectangle([chip_x1 + 6, chip_y1 + 6, chip_x1 + chip_w - 6, chip_y1 + 95], radius=5, fill=(rgb[0], rgb[1], rgb[2], 255))
    c_draw.text((chip_x1 + chip_w // 2, chip_y1 + 110), color_name[:12], fill=(15, 23, 42), anchor="mm")
    c_draw.text((chip_x1 + chip_w // 2, chip_y1 + 130), hex_code.upper(), fill=(100, 116, 139), anchor="mm")

    im.paste(can_img, (0, 0), can_img)
    im.save(out_path, 'PNG', quality=95)

# Render all 52 images
os.makedirs("assets/products", exist_ok=True)
paint_products = []

for pid, name, hex_c, brand, price, spec, tag in PAINT_COLORS:
    out_img = f"assets/products/{pid}.png"
    render_paint_bucket(name, hex_c, brand, out_img)
    paint_products.append({
        "id": pid,
        "name": f"{brand.split('·')[1].strip()} · {name}",
        "category": "Paints",
        "brand": brand,
        "filter": "finishing",
        "spec": spec,
        "price": price,
        "unit": "litre",
        "img": out_img,
        "tag": tag,
        "stock": "In Stock",
        "color": hex_c
    })

print(f"Rendered {len(paint_products)} paint images!")

# Now update app.js
with open('app.js', 'r', encoding='utf-8') as f:
    app_text = f.read()

start_idx = app_text.find('const products=[') + len('const products=')
end_idx = app_text.find(';\nconst suppliers=[')
existing_prods = json.loads(app_text[start_idx:end_idx])

# Remove any existing paint products if present to avoid duplicates
existing_prods = [p for p in existing_prods if p.get('category') != 'Paints']

# Append the 52 paints
updated_prods = existing_prods + paint_products

# Replace products array in app.js
new_prods_json = json.dumps(updated_prods, indent=1)
app_text = app_text[:start_idx] + new_prods_json + app_text[end_idx:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_text)

print(f"app.js updated with {len(updated_prods)} total products ({len(paint_products)} paints)!")

# Update enhancements.js assortment
with open('enhancements.js', 'r', encoding='utf-8') as f:
    enh_text = f.read()

# All paint ids
all_paint_ids = [p["id"] for p in paint_products]
# Popular paint ids for multi-category supplier
popular_paint_ids = all_paint_ids[:26]

# dk-paints is the dedicated paints supplier, so give them all paints
import re
# Find dk-paints assortment
dk_match = re.search(r'"dk-paints":\s*\[(.*?)\]', enh_text)
if dk_match:
    old_dk = dk_match.group(1)
    # Parse existing and merge
    existing_dk = [x.strip().strip('"').strip("'") for x in old_dk.split(',') if x.strip()]
    merged_dk = list(dict.fromkeys(existing_dk + all_paint_ids))
    new_dk_str = '"dk-paints": ' + json.dumps(merged_dk)
    enh_text = re.sub(r'"dk-paints":\s*\[.*?\]', new_dk_str, enh_text)
    print("Updated dk-paints assortment with all paints!")

# babu is multi-category, give popular paints
babu_match = re.search(r'"babu":\s*\[(.*?)\]', enh_text)
if babu_match:
    old_babu = babu_match.group(1)
    existing_babu = [x.strip().strip('"').strip("'") for x in old_babu.split(',') if x.strip()]
    merged_babu = list(dict.fromkeys(existing_babu + popular_paint_ids))
    new_babu_str = '"babu": ' + json.dumps(merged_babu)
    enh_text = re.sub(r'"babu":\s*\[.*?\]', new_babu_str, enh_text)
    print("Updated babu assortment with popular paints!")

with open('enhancements.js', 'w', encoding='utf-8') as f:
    f.write(enh_text)

print("enhancements.js assortment successfully updated!")
