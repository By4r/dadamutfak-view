# Plan — Merkezi Taksonomi Ekranı (`sa-admin-taksonomi.html`)

> Karar (b) onaylandı (Beyar, 2026-06-23). Kaynak: `tasks/admin-tutarlilik-analiz.md`.
> Mockup düzeyi: backend YOK → ekran yönetim arayüzünü GÖRSEL gösterir, mock CRUD (persist etmez).
> Kanonik kabuk (sa-shell/sa-ui/sa-*.css) DOKUNULMAZ; tek izinli dokunuş: SECTIONS nav +1 satır + dizin +1 link.
> Referans iskelet: `sa-admin-kademeler.html` (kart-CRUD + saConfirm sil) + `sa-admin-sozluk.html` (kardeş dil).

## 1. Sayfa amacı
"Tüm taksonomi tek yerde" — sistemde dağınık/hardcoded olan kategori-tipi vocab'ların TEK merkezi yönetim yüzü.
Yönetilen gruplar (ilk sürüm):
1. **Tarif Kategorileri** (8: Ana Yemek/Çorba/Kahvaltı/Tatlı/Hamur İşi/Makarna/Pasta&Kek/İçecek) — `sa-admin-tarifler-form.html:298-307`
2. **Sözlük Kategorileri** (5: teknik/hamur/malzeme/arac/dunya) — `sa-admin-sozluk*` dup'ı
3. **İçerik Tipleri** (5: giris/puf/ansiklopedi/sofra/blog) — `sa-admin-icerik*`
4. **Ansiklopedi Kategorileri** (18 madde grubu) — `sa-admin-icerik-form.html:420-439`
5. **Kullanıcı Rolleri** (5: super/saglik/store/dadafit/isletme) — `sa-admin-kullanicilar*` dup'ı

> Not: gerçek sync mockup'ta sağlanmaz (vocab HTML'de kalır); ekran tek-kaynak KAVRAMINI ve yönetim
> akışını gösterir. Raporda/sayfa intro-band'inde bu açıkça belirtilir ("merkezi yönetim — bağlı modüller").

## 2. Layout (kanonik disiplin içinde)
- **pnl-page-head:** H1 "Taksonomi" + ph-sub "Kategori ve etiket sözlükleri · N grup" + ph-actions "Yeni Kategori" (btn-acc, aktif gruba ekler).
- **intro-band:** kavram açıklaması (fa-tags) + "bu kategoriler ilgili modüllerin filtre ve formlarında kullanılır" notu.
- **Grup seçici (sol) + içerik (sağ) iki-pane** VEYA grup-sekme bar:
  - Tercih: **sol grup-listesi kartları** (her grup: ikon + ad + "N kategori" sayacı, seçili=`--acc` tint) + sağ **seçili grubun kategori satırları**.
  - Her kategori satırı (`sa-admin-sozluk` satır ritmi): harf/ikon-chip + ad + slug (mono, soluk) + "N kullanım" sayacı + düzenle/sil (`.ia-btn` / `.ia-btn.danger`, kademeler'den).
- **Boş durum** + grup-içi arama (kanonik gereksinim).
- **Ekle/Düzenle = sayfa-içi modal** (kategori şeması küçük: Ad + Slug[auto-fill, TR-güvenli toLocaleLowerCase] + İkon seç + opsiyonel açıklama). AYRI `-form.html` GEREKMEZ (sozluk'tan farkı: zengin gövde yok).
- Sil → `saConfirm` (danger) + `saToast` (kademeler deseni birebir).

## 3. Token / renk disiplini
- Rozet/ikon: **TEK `--acc` token-tint + kategoriye özel ikon** (sözlük dersi — 5 ayrışık hue token yok, ham renk literali YASAK).
- Aksan `body[data-sec="admin"]` → domates `#E14827` otomatik. Renk literali yazma.

## 4. Kanonik kabuk dokunuşu (izinli, minimal)
- `assets/js/sa-shell.js` SECTIONS.admin.menu → +1 satır: `fa-tags` "Taksonomi" (Sözlük altına mantıklı yer).
- `dizin.html` ADMIN_GROUPS → +1 link (Gözetim-Admin grubu).
- Başka kabuk dokunuşu YOK.

## 5. JS (mock)
- Grup seçimi (sol kart tıkla → sağ liste swap; data-driven JS array, ekrana gömülü).
- Modal aç/kapa + slug auto-fill (TR `toLocaleLowerCase('tr')`) + override koru.
- Ekle → satır DOM'a ekle + saToast; Sil → saConfirm + remove + saToast. (Persist etmez, mockup.)

## 6. QA (CLAUDE.md görsel QA + bağlantı denetimi)
- 1440 + 390 full-sayfa render, KENDİ self-verify (crop yok).
- Nav is-active domates teyidi; dizin link 200 (404 yok).
- Grup swap / arama / boş-durum / modal / saConfirm sil / saToast.
- UTF-8 0 mojibake; console 0 hata.
- Yazılı kısa rapor.

## 7. Efor
Orta (~Sözlük modülü büyüklüğü): 1 yeni izole HTML (~liste+modal) + 2 satır kabuk wiring + mock JS + QA.
AYRI `-form.html` yok → Sözlük'ten biraz daha hafif.

## ✅ Kararlar (Beyar onayı, 2026-06-23)
- **Grup kapsamı:** 5 grup (tam) — Tarif Kat. + Sözlük Kat. + İçerik Tipi + Ansiklopedi Kat. + Kullanıcı Rolleri.
- **Layout:** sol grup-kartları + sağ seçili-grup listesi (iki-pane). İmplement onaylandı.
