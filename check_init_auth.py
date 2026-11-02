import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's check where initAuth is defined and called
idx = 0
while True:
    pos = text.find('initAuth', idx)
    if pos == -1: break
    print(f"initAuth at {pos}:", text[max(0, pos-40):pos+60])
    idx = pos + 8
