#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CİLA-2 FAZ 5 — header teammate site-geneli chrome sweep (idempotent).

NE YAPAR (her hedef üretim sayfasında):
  1. TOPBAR tb-right yeniden düzen: Tarif Ekle + Testler topbar'dan kalkar;
     Diyetisyen Ara (tb-util) + DadaStore/DadaAkademi markalı dünya kapıları gelir.
  2. tb-world CSS bloğu chrome katmanına INSERT (region-swap DEĞİL).
  3. Tarifler dropdown kategori href'leri: kategori-v1.html -> tarif-liste-v1.html?kategori=<slug>
     (mega + drawer; site geneli — shop dahil, sadece href düzeltmesi).
  4. (defter #6 konsolide) Profil dropdown'a "Alışveriş Listem" link insert:
     .acct-menu içinde "Menülerim" satırından SONRA (idempotent; zaten varsa atla).

DİSİPLİN (lessons.md):
  - idempotent (her blok için "zaten var mı" guard)
  - span-guard (tb-right bölgesi beklenenden büyükse ABORT)
  - CSS INSERT (region-swap yok -> CSS yutma riski yok)
  - TR karakter: saf byte değil, Python str (utf-8) — perl -CSD YOK
  - DIVERGENT topbar sayfaları (shop ailesi, akademi-v1, headA varyant) EXCLUDE
  - kategori href fix tüm sayfalara (chrome mega menü her yerde aynı)

ÇALIŞTIRMA (lead green-light sonrası, mockups/ kökünden):
  python3 outputs/cila2-faz5-header-sweep.py            # uygula
  python3 outputs/cila2-faz5-header-sweep.py --dry      # rapor, yazma yok
"""
import sys, os, re, glob

DRY = '--dry' in sys.argv

# Divergent topbar / kapsam-dışı (kendi dünyası/kabuğu olanlar). Topbar markup'ına
# DOKUNMA. (kategori href fix yine de uygulanır — mega menü ortak chrome.)
TOPBAR_EXCLUDE = {
    '_shell.html',              # master (elle güncellendi)
    'akademi-v1.html',          # akademi-kabuk teammate kendi topbar'ını kuruyor
    'dada-shop-v1.html', 'urun-liste-v1.html', 'urun-detay-v1.html',
    'sepet-v1.html', 'odeme-v1.html',   # shop ailesi: Sipariş Takibi/Yardım topbar
    'tarif-detay-v1-headA.html',        # deneysel head varyantı
}
# Tamamen kapsam dışı (chrome taşımaz ya da referans): panel + ref-*
def skip_all(fn):
    return (fn.startswith('panel-shell') or fn.startswith('dyt-')
            or fn.startswith('ref-') or fn == 'hesaplayici-v1.html')

NEW_TBRIGHT_INNER = (
    '      <a class="tb-util" href="diyetisyen-dizin-v1.html"><i class="fa-solid fa-stethoscope"></i> Diyetisyen Ara</a>\n'
    '      <span class="tb-div tb-div-worlds"></span>\n'
    '      <div class="tb-worlds">\n'
    '        <a class="tb-world tb-world-store" href="dada-shop-v1.html"><i class="fa-solid fa-bag-shopping"></i><span class="tw-name">DadaStore</span><i class="fa-solid fa-arrow-right tw-arr"></i></a>\n'
    '        <a class="tb-world tb-world-akademi" href="akademi-v1.html"><i class="fa-solid fa-graduation-cap"></i><span class="tw-name">DadaAkademi</span><span class="tw-soon">Yakında</span></a>\n'
    '      </div>\n'
    '      '
)

NEW_CSS = (
    "\n/* ---- üst bant dünya kapıları: DadaStore + DadaAkademi markalı geçiş (CİLA-2 Faz 5) ---- */\n"
    ".topbar .tb-util{color:#cfc7ba}\n"
    ".topbar .tb-util:hover{color:#fff}\n"
    ".tb-worlds{display:flex;align-items:center;gap:9px}\n"
    ".tb-world{display:inline-flex;align-items:center;gap:8px;height:27px;padding:0 12px;border-radius:var(--radius-sm);font-size:12px;font-weight:700;letter-spacing:.01em;border:1px solid transparent;transition:background .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease)}\n"
    ".tb-world i{font-size:12.5px;transition:color .2s var(--ease)}\n"
    ".tb-world .tw-name{line-height:1}\n"
    ".tb-world .tw-arr{font-size:9px;opacity:0;transform:translateX(-5px);transition:opacity .2s var(--ease),transform .2s var(--ease)}\n"
    ".tb-world:hover .tw-arr{opacity:.92;transform:translateX(0)}\n"
    ".tb-world .tw-soon{font-size:9.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:2px 6px;border-radius:var(--radius-sm);background:rgba(233,226,214,.18);color:#e9e2d6;line-height:1}\n"
    "/* DadaStore — domates dünyası (sıcak, e-ticaret) */\n"
    ".tb-world-store{background:rgba(225,72,39,.18);border-color:rgba(225,72,39,.46);color:#fff}\n"
    ".tb-world-store i{color:#ff7d5e}\n"
    ".tb-world-store:hover{background:var(--tomato);border-color:var(--tomato);color:#fff}\n"
    ".tb-world-store:hover i,.tb-world-store:hover .tw-arr{color:#fff}\n"
    "/* DadaAkademi — petrol dünyası (serin, öğrenme) */\n"
    ".tb-world-akademi{background:rgba(0,96,114,.30);border-color:rgba(95,203,216,.40);color:#fff}\n"
    ".tb-world-akademi i{color:#5fcbd8}\n"
    ".tb-world-akademi:hover{background:var(--c-petrol);border-color:var(--c-petrol);color:#fff}\n"
    ".tb-world-akademi:hover i{color:#fff}\n"
)
CSS_ANCHOR = '.tb-lang-menu a.active,.tb-lang-menu a.active span{color:var(--tomato)}\n'

# tb-right inner bölge yakalayıcı: <div class="tb-right">  ...  <div class="tb-lang"
TBRIGHT_RE = re.compile(
    r'(<div class="tb-right">\s*\n)(.*?)(\s*<div class="tb-lang")',
    re.DOTALL
)
# recipe-world imzası (shop/akademi dünyalarını dışla — ek güvenlik)
RECIPE_SIG = re.compile(r'Diyetisyen Ara')
NON_RECIPE_SIG = re.compile(r'Sipariş Takibi|Erken Kayıt|>\s*Yardım<')

# kategori href: kategori-v1.html data-slug="/X"  -> tarif-liste-v1.html?kategori=X
KAT_RE = re.compile(r'href="kategori-v1\.html" data-slug="/([a-z0-9-]+)"')
# fallback: data-slug'suz bare link -> düz liste. YALNIZ stale-mega taşıyan
# bu 2 sayfada (başka sayfalardaki bare kategori-v1 linkleri breadcrumb/see-all
# gibi İÇERİK linkleridir; dropdown kapsamı dışı, dokunulmaz).
KAT_RE2 = re.compile(r'href="kategori-v1\.html"')
STALE_MEGA = {'mutfaga-giris-v1.html', 'olcu-birimleri-v1.html'}

def kat_sub(m):
    s = m.group(1)
    return f'href="tarif-liste-v1.html?kategori={s}" data-slug="/{s}"'

# --- "Alışveriş Listem" profil-dropdown link insert (defter #6 konsolide) ---
# Anchor: .acct-menu içindeki "Menülerim" satırı; insert-after; idempotent
# (sayfada "Alışveriş Listem" zaten varsa ATLA). Shop/akademi/panel'de .acct-menu
# yok -> doğal hariç (leak-grep ile teyitli).
MENU_ANCHOR_RE = re.compile(
    r'([ \t]*)<a href="mutfak-defteri-v1\.html\?tab=menuler">'
    r'<i class="fa-solid fa-layer-group"></i> <span>Menülerim</span></a>'
)
ALIS_INNER = ('<a href="alisveris-listesi-v1.html">'
              '<i class="fa-solid fa-basket-shopping"></i> '
              '<span>Alışveriş Listem</span></a>')

def process(path):
    fn = os.path.basename(path)
    if skip_all(fn):
        return ('skip-all', fn)
    with open(path, 'r', encoding='utf-8') as f:
        src = f.read()
    orig = src
    notes = []

    # --- 3. kategori href fix (tüm sayfalar, idempotent doğal) ---
    if 'href="kategori-v1.html"' in src:
        n = len(KAT_RE.findall(src))
        src = KAT_RE.sub(kat_sub, src)
        n2 = 0
        if fn in STALE_MEGA:
            n2 = len(KAT_RE2.findall(src))
            if n2:
                src = KAT_RE2.sub('href="tarif-liste-v1.html"', src)
        notes.append(f'kategori-href×{n}' + (f'+bare×{n2}' if n2 else ''))

    # --- "Alışveriş Listem" link (.acct-menu, Menülerim sonrası; idempotent) ---
    if 'class="acct-menu"' in src:
        if '<span>Alışveriş Listem</span>' in src:
            notes.append('alisveris-zaten')
        else:
            am = MENU_ANCHOR_RE.search(src)
            if not am:
                notes.append('ALIS-ANCHOR-YOK!')
            else:
                indent = am.group(1)
                ins = am.group(0) + '\n' + indent + ALIS_INNER
                src = src[:am.start()] + ins + src[am.end():]
                notes.append('alisveris-link')

    # --- topbar (yalnız recipe-world, exclude listesi dışı) ---
    if fn not in TOPBAR_EXCLUDE and 'class="tb-right"' in src:
        if 'class="tb-worlds"' in src:
            notes.append('topbar-zaten')
        else:
            m = TBRIGHT_RE.search(src)
            if not m:
                notes.append('TOPBAR-EŞLEŞMEDİ!')
            elif len(m.group(2)) > 800:
                notes.append(f'TOPBAR-SPAN-GUARD-ABORT({len(m.group(2))}b)')
            elif not RECIPE_SIG.search(m.group(2)) or NON_RECIPE_SIG.search(m.group(2)):
                notes.append('topbar-divergent-atla')
            else:
                src = src[:m.start()] + m.group(1) + NEW_TBRIGHT_INNER + m.group(3) + src[m.end():]
                notes.append('topbar-yeni')
                # CSS insert (yalnız topbar yenilenen sayfaya)
                if '.tb-world{' in src:
                    notes.append('css-zaten')
                elif CSS_ANCHOR in src:
                    src = src.replace(CSS_ANCHOR, CSS_ANCHOR + NEW_CSS, 1)
                    notes.append('css-insert')
                else:
                    notes.append('CSS-ANCHOR-YOK!')

    if src != orig and not DRY:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(src)
    return ('done', fn, notes)

def main():
    os.chdir(os.path.join(os.path.dirname(__file__), '..'))  # mockups/
    files = sorted(glob.glob('*.html'))
    changed = 0
    for p in files:
        r = process(p)
        if r[0] == 'done' and r[2]:
            print(f'  {r[1]:38s} {", ".join(r[2])}')
            changed += 1
    print(f'\n{"[DRY] " if DRY else ""}toplam dokunulan: {changed} dosya')

if __name__ == '__main__':
    main()
