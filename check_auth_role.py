import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 0
while True:
    pos = text.find('data-auth-role', idx)
    if pos == -1: break
    print(f"data-auth-role at {pos}:", text[max(0, pos-50):min(len(text), pos+150)])
    idx = pos + 14
