import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = list(re.finditer(r'\}\)\(\);', text))
print("IIFE ends count:", len(matches))
for m in matches:
    pos = m.start()
    line = text[:pos].count('\n') + 1
    print(f"IIFE ends at line {line} (char {pos})")
