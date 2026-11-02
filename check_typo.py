import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('initAuth);else initAuth();')
print("--- Around pos ---")
print(repr(text[pos-100:pos+100]))
