import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('function initAuth()')
print("--- Around function initAuth ---")
print(text[pos-200:pos+800])
