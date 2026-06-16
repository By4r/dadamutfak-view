#!/usr/bin/env python3
"""Wave 3 nav chrome-sweep — idempotent, href-agnostic.
4 değişiklik:
  1. Sağlıklı Yaşam dropdown'a gruplu "Besin Değerleri" (4 öğe) — desktop + drawer
  2. Avatar dropdown'a "Pro'ya Yükselt" (pro-v1.html, fa-crown)
  3. Avatar dropdown'a "Rozetlerim" (rozetler-v1.html) — nav erişim
  4. Video içerik girişine küçük "Pro" rozeti (anasayfa + arama)
Re-run'da 0 değişiklik (HTML comment / class marker guard'ları).
"""
import re, sys, glob, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "mockups")

CSS_BLOCK = """<style>
/* w3-nav-sweep */
.dropdown .dd-group{margin:6px 0 2px;padding:9px 13px 4px;border-top:1px solid var(--line);font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.d-sub .d-sub-group{margin-top:6px;padding:10px 22px 4px 36px;border-top:1px solid var(--line);font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.acct-menu .acct-pro i{color:#d99812}
.acct-menu .acct-pro:hover{background:linear-gradient(180deg,rgba(251,230,180,.55),rgba(243,209,120,.32))}
.acct-menu .acct-pro:hover,.acct-menu .acct-pro:hover i{color:#8a6410}
.vid-pro{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#8a6410;background:linear-gradient(180deg,#fbe6b4,#f3d178);border:1px solid #e0bc63;padding:2px 8px;border-radius:999px;vertical-align:middle;margin-left:9px}
.vid-pro i{font-size:9px}
</style>
"""

# --- Change 1a: desktop dropdown besin group (span/small form, .dropdown OR .dropdown-health) ---
# href-agnostik + class-tolerant: href="#"/active varyantlarını da yakala (span formu = sadece dropdown).
DESK_ANCHOR_RE = re.compile(
    r'(<a href="[^"]*"(?: class="[^"]*")?><i class="fa-solid fa-stethoscope"></i> <span>Diyetisyen Ara<small>[^<]*</small></span></a>)'
)
DESK_BESIN = (
    '\n            <!--w3-besin-dd-->'
    '\n            <div class="dd-group">Besin Değerleri</div>'
    '\n            <a href="besin-kalori-cetveli-v1.html"><i class="fa-solid fa-fire-flame-curved"></i> <span>Kalori Cetveli<small>Besin kalori değerleri</small></span></a>'
    '\n            <a href="protein-rehberi-v1.html"><i class="fa-solid fa-drumstick-bite"></i> <span>Protein Rehberi<small>Protein kaynakları</small></span></a>'
    '\n            <a href="karbonhidrat-rehberi-v1.html"><i class="fa-solid fa-wheat-awn"></i> <span>Karbonhidrat Rehberi<small>Karbonhidrat kaynakları</small></span></a>'
    '\n            <a href="yag-rehberi-v1.html"><i class="fa-solid fa-bottle-droplet"></i> <span>Yağ Rehberi<small>Sağlıklı yağ kaynakları</small></span></a>'
)

# --- Change 1b: drawer .d-sub besin group (simple form) ---
# href-agnostik; tb-util topbar linki (class href'ten ÖNCE) bu regex'e UYMAZ → korunur.
DRAW_ANCHOR_RE = re.compile(
    r'(<a href="[^"]*"(?: class="[^"]*")?><i class="fa-solid fa-stethoscope"></i> Diyetisyen Ara</a>)'
)
DRAW_BESIN = (
    '\n        <!--w3-besin-dsub-->'
    '\n        <div class="d-sub-group">Besin Değerleri</div>'
    '\n        <a href="besin-kalori-cetveli-v1.html"><i class="fa-solid fa-fire-flame-curved"></i> Kalori Cetveli</a>'
    '\n        <a href="protein-rehberi-v1.html"><i class="fa-solid fa-drumstick-bite"></i> Protein Rehberi</a>'
    '\n        <a href="karbonhidrat-rehberi-v1.html"><i class="fa-solid fa-wheat-awn"></i> Karbonhidrat Rehberi</a>'
    '\n        <a href="yag-rehberi-v1.html"><i class="fa-solid fa-bottle-droplet"></i> Yağ Rehberi</a>'
)

# --- Change 2: avatar "Pro'ya Yükselt" before "Ayarlar / Hesabım" ---
GEAR_ANCHOR = '<a href="hesabim-v1.html"><i class="fa-solid fa-gear"></i> <span>Ayarlar / Hesabım</span></a>'
PRO_ITEM = '<a href="pro-v1.html" class="acct-pro"><i class="fa-solid fa-crown"></i> <span>Pro\'ya Yükselt</span></a>\n            '

# --- Change 3: avatar "Rozetlerim" after "Mutfak Defterim" ---
DEFTER_ANCHOR = '<a href="mutfak-defteri-v1.html"><i class="fa-solid fa-book-bookmark"></i> <span>Mutfak Defterim</span></a>'
ROZET_ITEM = '\n            <a href="rozetler-v1.html"><i class="fa-solid fa-medal"></i> <span>Rozetlerim</span></a>'

VID_PRO = ' <span class="vid-pro"><i class="fa-solid fa-crown"></i> Pro</span>'

def ensure_css(c):
    if '/* w3-nav-sweep */' in c:
        return c
    i = c.find('</head>')
    if i == -1:
        return c
    return c[:i] + CSS_BLOCK + c[i:]

def process(path):
    name = os.path.basename(path)
    with open(path, encoding='utf-8') as f:
        c = f.read()
    orig = c

    # 1a desktop besin
    if '<!--w3-besin-dd-->' not in c:
        c = DESK_ANCHOR_RE.sub(lambda m: m.group(1) + DESK_BESIN, c, count=1)

    # 1b drawer besin
    if '<!--w3-besin-dsub-->' not in c:
        c = DRAW_ANCHOR_RE.sub(lambda m: m.group(1) + DRAW_BESIN, c, count=1)

    # 2 avatar Pro
    if 'acct-pro' not in c and GEAR_ANCHOR in c:
        c = c.replace(GEAR_ANCHOR, PRO_ITEM + GEAR_ANCHOR, 1)

    # 3 avatar Rozetlerim
    if '<span>Rozetlerim</span>' not in c and DEFTER_ANCHOR in c:
        c = c.replace(DEFTER_ANCHOR, DEFTER_ANCHOR + ROZET_ITEM, 1)

    # 4 video Pro badge (anasayfa + arama)
    if 'vid-pro' not in c:
        if name == 'anasayfa-portal-v3a.html':
            anc = '<h2>En lezzetli videolar</h2>'
            if anc in c:
                c = c.replace(anc, anc.replace('</h2>', VID_PRO + '</h2>'), 1)
        elif name == 'arama-v1.html':
            anc = '<h2><i class="fa-solid fa-circle-play"></i> Videolar <span class="cnt">(6)</span></h2>'
            if anc in c:
                c = c.replace(anc, anc.replace('</h2>', VID_PRO + '</h2>'), 1)

    if c != orig:
        c = ensure_css(c)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        return True
    return False

def main():
    changed = []
    for path in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
        if process(path):
            changed.append(os.path.basename(path))
    print(f"CHANGED {len(changed)} files")
    for n in changed:
        print("  ", n)

if __name__ == '__main__':
    main()
