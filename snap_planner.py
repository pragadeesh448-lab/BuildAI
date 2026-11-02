import subprocess

script = """
document.body.classList.remove('auth-active', 'intro-active');
document.getElementById('exploreApp').hidden = false;
document.getElementById('procurementSection').scrollIntoView();
"""

with open('snap_harness.html', 'w', encoding='utf-8') as out_f:
    with open('index.html', 'r', encoding='utf-8') as in_f:
        c = in_f.read()
    c = c.replace('</body>', f'<script>{script}</script></body>')
    out_f.write(c)

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--window-size=1440,900",
    "--no-sandbox",
    "--allow-file-access-from-files",
    "--screenshot=procurement_section_view.png",
    "file:///c:/Users/Pragadeesh/Downloads/buildai-local-preview/snap_harness.html"
]

subprocess.run(cmd, capture_output=True)
print("Saved procurement_section_view.png")
