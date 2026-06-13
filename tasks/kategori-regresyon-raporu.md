# Kategori Entegrasyonu Regresyon Denetimi — Faz 4

> Beyar talebi (2026-06-13): Faz 4'te kategori işi yapılan TÜM sayfaları
> commit `a463329` (Faz 3 onaylı taban) ile diff'le; her sayfa için
> "sadece veri mi değişti, yoksa kurgu/layout da mı değişti?" raporla.
> Kök kural: **kategori entegrasyonu = SADECE mock veriyi gerçek veriyle
> değiştirmek. LAYOUT/KURGU/TASARIMA DOKUNULMAZ.**

## Yöntem

Her sayfa `git diff a463329 -- mockups/<sayfa>.html` ile incelendi. Değişen
satırlar üç sınıfa ayrıldı: **CSS-kural** (yeni/silinen stil kuralı = kurgu),
**yapısal** (yeni/silinen section/grid/layout container = kurgu), **veri/metin**
(li, href, data-slug, chip etiketi, başlık metni = veri). Çekirdek layout
sınıflarının a463329'da ve şimdi varlığı ayrıca karşılaştırıldı.

## Sayfa-bazlı Teşhis

| Sayfa | +/- | CSS-kural | Yapısal | Veri | Teşhis | Aksiyon |
|---|---|---|---|---|---|---|
| **tarif-liste-v1** | +72/-63 | 0 | 1 | 123 | ✅ SADECE VERİ | yok |
| **puf-noktalari-v1** | +85/-97 | 0 | 1 | 168 | ✅ SADECE VERİ | yok |
| **mekan-liste-v1** | +40/-40 | 0 | 0 | 68 | ✅ SADECE VERİ (Konsept facet grubu) | yok |
| **kategori-v1** | +48/-51 | 0 | 7 | 88 | ✅ VERİ (7 "yapısal" = facet etiket değişimi, yeni section YOK) | yok |
| **kesfet-v1** | +61/-40 | 15 | 1 | 75 | 🟢 YETKİLİ KURGU — `ke-subfilter/ke-subchip` alt-filtre rayı = Beyar'ın kendi Keşfet talebi (3'lü üst KORUNDU) | yok (yetkili) |
| **bugun-ne-pisirsem-v1** | +351/-68 | büyük | büyük | büyük | 🟢 YETKİLİ KURGU — 14-mod kaydırılabilir ray + tarif havuzu modalı = Beyar'ın kendi revize talebi | yok (yetkili) |
| **olcu-birimleri-v1** | +154/-151 | 52 | 0 | 130 | 🟠 TASARIM DİLİ DEĞİŞİMİ — iki-seviye veri MEŞRU (Beyar istedi, 10 üst→65 alt tek-seviye sığmaz) AMA 52 CSS kuralıyla tasarım dili de değişmiş; çekirdek layout sınıfları (`conv-grid`/`ob-tabs`/`tables-sec`) dursa da görsel dil sıfırdan-akordeon olmuş | **DÜZELTİLİYOR** — kategori-sirlar a463329 görsel dilini (kart stili/renk/tipografi/one-page tab) geri getirir; 2-seviyeli veriyi göstermek için yalnız MİNİMUM yapı ekler. "Onaylı tasarım dili + 2-seviye veri" |
| **mutfaga-giris-v1** | +137/-282 | 15 | 4 | 206 | 🔴 REGRESYON — onaylı yatay step-rail rota + gnav çapa + konu kütüphanesi kurgusu BOZULMUŞ (net -145 satır) | **GERİ ALINIYOR** — kategori-sirlar a463329 kabuğunu aynen geri getiriyor, sadece 7+36 veri dolduruluyor |

## Özet

- **Temiz (sadece veri):** tarif-liste, puf-noktalari, mekan-liste, kategori-v1 — 4 sayfa, dokunulmaz.
- **Yetkili kurgu (Beyar'ın kendi talepleri):** kesfet (alt-filtre), bugun-ne-pisirsem (havuz+ray), tarif-bulucu (yeniden tasarım — ayrıca ferah revize alıyor) — kural ihlali DEĞİL, açık talep.
- **Tasarım dili değişimi (düzeltiliyor):** olcu-birimleri — 2-seviye veri meşru ama görsel dil değişmiş; a463329 tasarım dili geri + minimum 2-seviye yapı.
- **Gerçek regresyon (düzeltiliyor):** mutfaga-giris → a463329 kabuk + gerçek veri.

## Düzeltme Turu Durumu (2026-06-13)

| Sayfa | Düzeltme | Sahip | Durum |
|---|---|---|---|
| mutfaga-giris-v1 | a463329 kabuk aynen + 7+36 veri | kategori-sirlar | 🔄 devam |
| olcu-birimleri-v1 | a463329 tasarım dili + minimum 2-seviye | kategori-sirlar | 🔄 devam |
| tarif-bulucu-v1 | dar panel → ferah geniş ızgara | ux-revize | 🔄 devam |
| sef-ol-v1 | pre-fill dolu + kurgu derinleştir (acelesiz) | ux-revize | ⏳ tarif-bulucu sonrası |

## Bilinen Sınırlamalar

- "Yapısal" sayacı kaba bir göstergedir; kcategory-v1'in 7 yapısal hit'i incelenince
  yeni section değil facet etiket satırı çıktı (yanlış-pozitif elendi).
- olcu-birimleri kararı Beyar'a bırakıldı: lead görüşü = kabuk korunduğu ve veri
  iki-seviyeli olduğu için kabul; ama "iki-seviye akordeon istemiyorum, tek-seviye
  liste olsun" denirse a463329 `conv-grid` tab kurgusu geri getirilir.
- login-state (`acct-*`) sınıfları Faz 2 auth sweep mirasıdır, kategori işi değil —
  diff'lerde görünür ama bu denetimin konusu dışı.
