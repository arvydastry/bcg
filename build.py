#!/usr/bin/env python3
"""Surenka maketo puslapius: _parts/ (bendros dalys) + _body/<puslapis>.html (turinys) -> <puslapis>.html.

Kiekvieno _body failo pirmoji eilutė: <!-- meta: {"title": "...", "description": "...", "body_class": "...",
"extra_head": "...", "extra_scripts": "..."} -->. Po surinkimo patikrinamos vidinės nuorodos ir id.
"""
import json, os, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
PARTS = ROOT / "_parts"
BODY = ROOT / "_body"
VERSION = "10"

def read(p):
    return (PARTS / p).read_text(encoding="utf-8")

def build(name):
    src = (BODY / f"{name}.html").read_text(encoding="utf-8")
    m = re.match(r"\s*<!--\s*meta:\s*(\{.*?\})\s*-->\s*\n?", src, re.S)
    if not m:
        sys.exit(f"{name}: trūksta meta eilutės")
    meta = json.loads(m.group(1))
    body = src[m.end():]
    page = (read("head.html") + read("header.html") + body + read("footer.html") + read("scripts.html"))
    repl = {
        "{{title}}": meta.get("title", ""),
        "{{description}}": meta.get("description", ""),
        "{{body_class}}": " ".join(filter(None, [f"page-{name}", meta.get("body_class", "")])),
        "{{extra_head}}": meta.get("extra_head", ""),
        "{{extra_scripts}}": meta.get("extra_scripts", ""),
        "{{v}}": VERSION,
    }
    for k, v in repl.items():
        page = page.replace(k, v)
    # aktyvus meniu punktas ir maketo juostos punktas
    page = page.replace(f'data-nav="{name}"', f'data-nav="{name}" aria-current="page"')
    left = re.findall(r"\{\{[a-z_]+\}\}", page)
    if left:
        print(f"  ! {name}: liko žymės {sorted(set(left))}")
    (ROOT / f"{name}.html").write_text(page, encoding="utf-8")
    return page

def check(pages):
    ids = {n: set(re.findall(r'\sid="([^"]+)"', html)) for n, html in pages.items()}
    warn = 0
    for n, html in pages.items():
        for href in re.findall(r'href="([^"]+)"', html):
            if href.startswith(("http", "mailto:", "tel:", "#", "data:")):
                if href.startswith("#") and len(href) > 1 and href[1:] not in ids[n]:
                    print(f"  ! {n}: nėra id „{href[1:]}“"); warn += 1
                continue
            path, _, frag = href.partition("#")
            path = path.split("?")[0]
            if path.endswith(".html"):
                target = path[:-5]
                if not (ROOT / path).exists():
                    print(f"  ! {n}: nėra failo {path}"); warn += 1
                elif frag and target in ids and frag not in ids[target]:
                    print(f"  ! {n}: {path} neturi id „{frag}“"); warn += 1
            elif not (ROOT / path).exists():
                print(f"  ! {n}: nėra {path}"); warn += 1
        for src in re.findall(r'src="(assets/[^"]+)"', html):
            if not (ROOT / src.split("?")[0]).exists():
                print(f"  ! {n}: nėra {src}"); warn += 1
        if html.count("<h1") != 1:
            print(f"  ! {n}: h1 kiekis {html.count('<h1')}"); warn += 1
    return warn

if __name__ == "__main__":
    names = sys.argv[1:] or sorted(p.stem for p in BODY.glob("*.html"))
    pages = {n: build(n) for n in names}
    # tikrinam visus esamus puslapius, kad nuorodos tarp jų sutaptų
    allpages = {p.stem: p.read_text(encoding="utf-8") for p in ROOT.glob("*.html") if p.stem != "salient-gidas"}
    w = check(allpages)
    print(f"Surinkta: {', '.join(names)}. Įspėjimų: {w}")
