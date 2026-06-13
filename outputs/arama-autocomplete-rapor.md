# Arama Autocomplete — Rapor (task #3, teammate: arama-autocomplete)

**Dosya (tek):** `mockups/arama-v1.html` · `git diff --numstat` = `300 1` (yalnız bu dosya).
**Önizleme:** http://localhost:8765/mockups/arama-v1.html · DEMO: `?demo=1` (dropdown açık), `?demo=1&q=me&ai=2` (yazılı + aktif öğe).
**COMMIT YOK.**

## Eklenenler

### 1. CSS (`.search-input` dilinden türetilmiş — `.srch-sum` altı + `.is-off` yanı)
- `.srch-box{position:relative}` → panel referansı.
- `.sr-ac` dropdown paneli: `var(--paper)` zemin, `1px var(--line)` çerçeve, `var(--radius-md)`,
  `var(--sh-lg)` gölge, input'un hemen altında (`top:calc(100% - 4px)`), `opacity/transform`
  geçişli aç-kapa. İnce scrollbar.
- `.ac-grp` grup başlığı (uppercase, `var(--muted)`, `var(--tomato)` ikon) + `.ac-clear` "Temizle".
- `.ac-opt` satır: ikon kutusu (`.ac-ico` 38px, görselli öğelerde `background-image` cover/center —
  **§3 div+bg-image kuralı**, img tag yok) + `.ac-ttl` başlık (`<mark>` ile **tomato** eşleşme vurgusu)
  + `.ac-sub` alt metin + `.ac-badge` tür rozeti (`--radius-pill`).
- Tür-spesifik renk: `[data-type="tarif"]` → tomato-tint rozet; diğerleri `--slate-2`.
- **Tek görsel state:** `:hover` ve `.is-active` (klavye) AYNI → `var(--tomato-tint)` + tomato başlık.
- `.ac-none` boş eşleşme, `.sr-vh` ekran-okuyucu live status.
- Mobil ≤640: panel max-height kısaltıldı, rozet gizlendi, ikon 34px (390'da taşma yok — SS#3).
- Token disiplini: tüm renk/radius/gölge `var(--*)`; 2x retina çarpma yok; FontAwesome 6.5.2 ikon.

### 2. Markup
- `#srchInput` → **ARIA combobox**: `role="combobox" aria-expanded aria-autocomplete="list"
  aria-controls="srAcList" aria-haspopup="listbox" aria-activedescendant`.
- Panel: `.sr-ac#srAc` > `#srAcList role="listbox"` (JS doldurur) + `#srAcStatus role="status" aria-live`.
- Öğeler JS'te `role="option"` + benzersiz `id` (`ac-opt-N`) + `aria-selected`.

### 3. JS (mevcut IIFE içinde, submit handler'ından önce)
- **Temsili öneri havuzu** `POOL` (23 öğe): gerçekçi TR tarif/video/şef/ürün/yazı isimleri,
  her birinde `type` + alt metin + bazılarında Unsplash thumbnail.
- **Veri kaynağı tutarlılığı:** "Son aramalar" `#srPop .sr-recent[data-q]`'dan, "Popüler öneriler"
  `#srPop .chips .chip[data-q]`'dan okunur → sayfadaki mevcut veriyle birebir aynı.
- **Debounce ~150ms** (`onInput` → setTimeout 150). ≥1 karakter → `buildQuery` (filtrele + en üstte
  "… için ara" satırı); boş/odak → `buildDefault` (son aramalar + popüler).
- **TR-duyarlı normalize** (`norm`: ı/İ/ş/ğ/ü/ö/ç katlama) → aksanlı arama eşleşir; başlangıç-eşleşmesi
  önce sıralanır; eşleşen parça `<mark>` ile vurgulanır.

### 4. Klavye navigasyon (input keydown)
- **↓ ArrowDown:** kapalıysa açar; açıkken `active=(active+1)%n` (sona gelince başa döner).
- **↑ ArrowUp:** `active` bir yukarı (başta tersine sona sarar).
- **Enter:** aktif öğe varsa `preventDefault()`+`choose(active)` (öğeyi ara); aktif yoksa form
  submit'i devralır (mevcut handler q ile yönlendirir).
- **Esc:** açıksa `preventDefault()`+`close()`. **Home/End:** ilk/son öğe.
- `setActive(i)`: önceki/yeni `.is-active`+`aria-selected` toggle, `aria-activedescendant`=option id,
  `scrollIntoView({block:'nearest'})`. Fare `mousemove`/`mousedown` aynı `active` mantığına bağlı.
- Dışarı tıkla → `close()`. "Temizle" → son arama satırlarını kaldırır, default'u yeniden kurar.

### Kanıt (headless Chrome, Playwright DEĞİL — lead-only kuralına uyuldu)
- `outputs/arama-autocomplete-ss/01-default-focus.png` — odak hâli: Son aramalar + Popüler öneriler
  (#srPop verisiyle tutarlı, clock/fire ikon, Temizle).
- `outputs/arama-autocomplete-ss/02-typed-query-active.png` — `q=me`: "me için ara" + filtreli
  öneriler (tomato `<mark>` vurgu, Tarif/Video rozet, thumbnail), index 2 aktif (tomato-tint).
- `outputs/arama-autocomplete-ss/03-mobile-390-query.png` — 390px `q=tav`: rozet gizli, ikon 34px,
  yatay taşma yok.

## Kapsam / dokunulmayanlar
- SADECE arama kutusu/autocomplete bölgesi. Header "Sağlık" mega-menüye DOKUNULMADI.
- `#srPop` blokları + sonuç rayları yalnız **okundu** (veri kaynağı), bozulmadı.
- `?demo=1` salt SS kanıtı için; normal akış (odak/yazma) demo'suz da çalışır.
