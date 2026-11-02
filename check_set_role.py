import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('function setRole(')
print(text[pos:pos+1500])
