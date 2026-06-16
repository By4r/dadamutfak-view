#!/usr/bin/env python3
"""DadaFit mobil 🟡 cila sweep (P1). Yalnız 10 DadaFit sayfasına dokunur.
Idempotent: her replace count'u doğrular, zaten uygulanmışsa atlar.
Fix: (1) touch target icon-btn/hamburger/bn-item 40→44 (10 sayfa);
     (2) egzersiz-detay set-takip check/del 34→44 hit-area;
     (3) challenge .chl-mini gün fontu 9.5→11; kopru .met/small <11→11;
     (4) bottom-nav cookie/promo coupling kaldır → mobilde nav coexist (10 sayfa).
360px clip = P1, DOKUNULMADI."""
import os, sys

MOCK = os.path.join(os.path.dirname(__file__), "..", "mockups")
ALL10 = ["dadafit-hub-v1","egzersiz-kutuphane-v1","egzersiz-detay-v1","program-detay-v1",
         "program-liste-v1","dadafit-kopru-v1","challenge-v1","antrenorler-v1",
         "antrenor-ol-v1","antrenor-detay-v1"]

# (old, new) literal replacements
GLOBAL = [
    # 1. icon-btn (kapsar: hamburger = icon-btn hamburger)
    (".icon-btn{width:40px;height:40px;font-size:15px}",
     ".icon-btn{width:44px;height:44px;font-size:15px}"),
    # 1. bn-item taban
    ("width:40px;height:40px;border-radius:var(--radius-lg)",
     "width:44px;height:44px;border-radius:var(--radius-lg)"),
    # 4. bottom-nav: cookie/promo strip artık nav'ı gizlemesin (mobilde coexist)
    ("(cookie&&cookie.classList.contains('show'))||stripShown()",
     "stripShown()"),
    # 4. nav 40→44 ile 64px'e büyüdü → cookie strip'i 80→92px'e kaldır (temiz boşluk, çakışma yok)
    ("bottom:calc(80px + env(safe-area-inset-bottom,0px))",
     "bottom:calc(92px + env(safe-area-inset-bottom,0px))"),
]

PERFILE = {
    "egzersiz-detay-v1": [
        # 2. del sütununu 44'e genişlet
        ("grid-template-columns:34px 1fr 1fr 44px 34px",
         "grid-template-columns:34px 1fr 1fr 44px 44px"),
        # 2. check & del butonları 34→44 (gerçek tap hedefi, gap:8px ile ayrık)
        (".ed-set-check{width:34px;height:34px;", ".ed-set-check{width:44px;height:44px;"),
        (".ed-set-del{width:34px;height:34px;", ".ed-set-del{width:44px;height:44px;"),
    ],
    "challenge-v1": [
        # 3. mini takvim gün rakamları 9.5→11
        (";display:grid;place-items:center;font-size:9.5px;font-weight:700;color:#857e74}",
         ";display:grid;place-items:center;font-size:11px;font-weight:700;color:#857e74}"),
    ],
    "dadafit-kopru-v1": [
        # 3. MET pill + birim suffix small'ları <11 → 11
        (".kp-type .met{font-size:10.5px;", ".kp-type .met{font-size:11px;"),
        (".kb b small{font-size:10px;", ".kb b small{font-size:11px;"),
        (".kp-logrow .lr-kcal small{font-size:10px;", ".kp-logrow .lr-kcal small{font-size:11px;"),
        (".kp-srow .sr-val small{font-size:10px;", ".kp-srow .sr-val small{font-size:11px;"),
        (".kp-band b small{font-size:9.5px;", ".kp-band b small{font-size:11px;"),
    ],
}

def apply(name, reps):
    path = os.path.join(MOCK, name + ".html")
    with open(path, encoding="utf-8") as f:
        src = f.read()
    out = src
    for old, new in reps:
        if new in out and old not in out:
            print(f"  [skip] {name}: zaten uygulanmış — {old[:40]!r}")
            continue
        c = out.count(old)
        if c == 0:
            print(f"  [WARN] {name}: bulunamadı — {old[:50]!r}")
            continue
        if c > 1:
            print(f"  [WARN] {name}: {c}× eşleşme (beklenen 1) — {old[:50]!r}")
        out = out.replace(old, new)
        print(f"  [ok]   {name}: {c}× — {old[:46]!r}")
    if out != src:
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)
        return True
    return False

def main():
    changed = 0
    for name in ALL10:
        reps = list(GLOBAL) + PERFILE.get(name, [])
        print(f"== {name} ==")
        if apply(name, reps):
            changed += 1
    print(f"\nDeğişen dosya: {changed}/{len(ALL10)}")

if __name__ == "__main__":
    main()
