import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

ids = ["authLoginForm", "authSupplier", "fillDemoCredentials", "toggleAuthPassword", "authEmail", "authPassword", "authError", "authDemoText", "authHeading", "authIntro", "authSupplierPicker"]
for el_id in ids:
    found = f'id="{el_id}"' in text or f"id='{el_id}'" in text
    print(f"{el_id}: {'FOUND' if found else 'MISSING !!!'}")
