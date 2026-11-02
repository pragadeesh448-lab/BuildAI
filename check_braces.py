import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('enhancements.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
# Let's check for any syntax error by using node or python check
# Let's count open/close braces
open_b = 0
for i, l in enumerate(lines):
    # ignore string literals roughly
    # count braces
    c_open = l.count('{')
    c_close = l.count('}')
    open_b += c_open - c_close
    if open_b < 0:
        print(f"Line {i+1} closed more braces than opened! open_b = {open_b}")
        break

print(f"Final open_b at end of file: {open_b}")
