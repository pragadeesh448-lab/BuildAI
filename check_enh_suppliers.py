import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 0
while True:
    pos = text.find('const suppliers', idx)
    if pos == -1: break
    print(f"const suppliers at {pos}:", text[pos:pos+100])
    idx = pos + 15
