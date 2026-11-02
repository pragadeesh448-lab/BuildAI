import subprocess

cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--window-size=1440,2200",
    "--no-sandbox",
    "--allow-file-access-from-files",
    "--screenshot=current_full_page.png",
    "file:///c:/Users/Pragadeesh/Downloads/buildai-local-preview/index.html"
]

subprocess.run(cmd, capture_output=True)
print("Screenshot taken: current_full_page.png")
