import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--enable-logging=stderr",
    "--v=1",
    "--no-sandbox",
    "--disable-gpu",
    "http://localhost:8000/index.html"
]

try:
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', timeout=5)
    print("STDOUT:\n", proc.stdout)
    print("STDERR:\n", proc.stderr)
except subprocess.TimeoutExpired as e:
    print("TIMEOUT stdout:\n", e.stdout)
    print("TIMEOUT stderr:\n", e.stderr)
except Exception as e:
    print("Error:", e)
