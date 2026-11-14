"""公開の前に自動で動く（GitHub Actions）。ファイルの中身から短い印を作って、
読み込みURLの ?v=〇〇 を書き換える → ファイルを更新すると、必ず新しいものが読み込まれる。
手元で試すときは:  python make_version.py
"""
import hashlib, json, pathlib, re

root = pathlib.Path(__file__).parent

def digest(b):
    return hashlib.md5(b).hexdigest()[:8]

# 1) 画像の印 → assets.js（main.js が画像のURLに ?v= をつけるのに使う）
assets = {}
for f in sorted((root / "images").rglob("*")):
    if f.is_file() and f.name != ".gitkeep":
        assets[f.relative_to(root).as_posix()] = digest(f.read_bytes())
(root / "assets.js").write_text("const ASSETS=" + json.dumps(assets, ensure_ascii=False) + ";\n", encoding="utf-8")

# 2) index.html の CSS / JS の ?v= を書き換える
p = root / "index.html"
s = p.read_text(encoding="utf-8")
for name in ("style.css", "assets.js", "config.js", "main.js"):
    f = root / name
    if f.exists():
        s = re.sub(re.escape(name) + r'(\?v=[^"\']*)?(?=["\'])', f"{name}?v={digest(f.read_bytes())}", s)
p.write_text(s, encoding="utf-8")
print(f"画像{len(assets)}件の印と、index.html の ?v= を更新しました")
