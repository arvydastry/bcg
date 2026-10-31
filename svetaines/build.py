#!/usr/bin/env python3
"""Surenka dvi atskiras svetaines: <svetainė>/_parts + <svetainė>/_body -> <svetainė>/*.html.

Bendri failai (style.css, p-*.css, main.js, p-karjera.js, vėliavos) laikomi bendra/assets/ ir kiekvieno
surinkimo metu nukopijuojami į <svetainė>/assets/ – todėl kiekvienas svetainės aplankas yra savarankiškas.
Svetainės nuosavi failai (logotipai, theme.css, sertifikatai) laikomi tik <svetainė>/assets/ ir neperrašomi.

Naudojimas:  python3 svetaines/build.py                 – abi svetainės
             python3 svetaines/build.py skanlika        – viena svetainė
             python3 svetaines/build.py bcg index karjera – tik nurodyti puslapiai
"""
import json, re, sys, shutil, filecmp, pathlib

BASE = pathlib.Path(__file__).resolve().parent
SHARED = BASE / "bendra" / "assets"
SITES = ["bcg", "skanlika"]
VERSION = "1"


def sync(root):
    n = 0
    for src in SHARED.rglob("*"):
        if src.is_dir() or src.name.startswith("."):
            continue
        dst = root / "assets" / src.relative_to(SHARED)
        if not dst.exists() or not filecmp.cmp(src, dst, shallow=False):
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
            n += 1
    return n


def build(root, name):
    parts = root / "_parts"
    read = lambda p: (parts / p).read_text(encoding="utf-8")
    src = (root / "_body" / f"{name}.html").read_text(encoding="utf-8")
    m = re.match(r"\s*<!--\s*meta:\s*(\{.*?\})\s*-->\s*\n?", src, re.S)
    if not m:
        sys.exit(f"{root.name}/{name}: trūksta meta eilutės")
    meta = json.loads(m.group(1))
    page = read("head.html") + read("header.html") + src[m.end():] + read("footer.html") + read("scripts.html")
    for k, v in {
        "{{title}}": meta.get("title", ""),
        "{{description}}": meta.get("description", ""),
        "{{body_class}}": " ".join(filter(None, [f"page-{name}", meta.get("body_class", "")])),
        "{{extra_head}}": meta.get("extra_head", ""),
        "{{extra_scripts}}": meta.get("extra_scripts", ""),
        "{{v}}": VERSION,
    }.items():
        page = page.replace(k, v)
    page = page.replace(f'data-nav="{name}"', f'data-nav="{name}" aria-current="page"')
    left = re.findall(r"\{\{[a-z_]+\}\}", page)
    if left:
        print(f"  ! {root.name}/{name}: liko žymės {sorted(set(left))}")
    (root / f"{name}.html").write_text(page, encoding="utf-8")
    return page


def check(root, pages, other):
    ids = {n: set(re.findall(r'\sid="([^"]+)"', html)) for n, html in pages.items()}
    warn = 0
    for n, html in pages.items():
        tag = f"{root.name}/{n}"
        for href in re.findall(r'href="([^"]+)"', html):
            if href.startswith(("http", "mailto:", "tel:", "#", "data:")):
                if href.startswith("#") and len(href) > 1 and href[1:] not in ids[n]:
                    print(f"  ! {tag}: nėra id „{href[1:]}“"); warn += 1
                continue
            path, _, frag = href.partition("#")
            path = path.split("?")[0]
            if ".." in path:
                print(f"  ! {tag}: nuoroda už svetainės ribų {href}"); warn += 1
            elif path.endswith(".html"):
                if not (root / path).exists():
                    print(f"  ! {tag}: nėra failo {path}"); warn += 1
                elif frag and path[:-5] in ids and frag not in ids[path[:-5]]:
                    print(f"  ! {tag}: {path} neturi id „{frag}“"); warn += 1
            elif not (root / path).exists():
                print(f"  ! {tag}: nėra {path}"); warn += 1
        for src in re.findall(r'src="(assets/[^"]+)"', html):
            if not (root / src.split("?")[0]).exists():
                print(f"  ! {tag}: nėra {src}"); warn += 1
        if html.count("<h1") != 1:
            print(f"  ! {tag}: h1 kiekis {html.count('<h1')}"); warn += 1
        # atskirtos įmonės: kitos įmonės pavadinimas puslapyje neturi pasirodyti
        hits = sorted({h for h in re.findall(other, html)})
        if hits:
            print(f"  ! {tag}: minima kita įmonė {hits}"); warn += 1
    return warn


OTHER = {"bcg": r"Skanlika|skanlika", "skanlika": r"Baltic Contracting|baltcontract|BCG|bcg-"}

if __name__ == "__main__":
    args = sys.argv[1:]
    sites = [args.pop(0)] if args and args[0] in SITES else SITES
    total = 0
    for site in sites:
        root = BASE / site
        copied = sync(root)
        names = args or sorted(p.stem for p in (root / "_body").glob("*.html"))
        for n in names:
            build(root, n)
        allpages = {p.stem: p.read_text(encoding="utf-8") for p in root.glob("*.html")}
        w = check(root, allpages, OTHER[site])
        total += w
        print(f"{site}: surinkta {', '.join(names)}; bendrų failų atnaujinta {copied}; įspėjimų {w}")
    print(f"Iš viso įspėjimų: {total}")
