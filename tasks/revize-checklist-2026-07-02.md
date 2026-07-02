# DadaMutfak v7 — Revize Checklist
Tarih: 2 Temmuz 2026 · Kalıcı yol haritası

Bu dosya kalıcı yol haritasıdır. Oturum durumu handoff.md'de; buraya sadece iş kalemleri + biten/kalan durumu yazılır. Sıralama Beyar'ın onayına tabidir — CC bu listeden kendi kafasına göre iş kapmaz, her işi Beyar tek tek brief'ler.

## KOVA 1 — CC view işleri (bu repo)
- [x] A2 — Gourmet nav + footer tutarlılığı (header 3-item parite + footer "Gurme Lezzetler" temizliği) — CANLI
- [x] A3a — Ölü CSS: saglik-hub .rd-crumb (6 satır) — CANLI (df6974d)
- [x] A3b — Fit df-* klon-artığı dead-CSS süpürmesi (enerji-defteri: df-bridge-card/df-bc-*/df-chal/df-tdee/df-cta/df-cta-acts ölü ailesi) — CERRAHİ: df-ledger CANLI koru, çok-selektörlü @media'da sadece ölü token'ları çıkar. NOT: enerji-defteri dosyasına A1 (hero) de dokunuyor — çakışmayı önlemek için A1 ile ardışık/tek gate düşünülmeli. — CANLI (d485379)
- [x] A1 — Enerji Defteri hero kıs + Fit iç sayfa hero tutarlılık taraması (hareket-rehberi kanonik) — CANLI (9cf32b1), enerji-defteri hero content-height'a indi
- [ ] A1b — program-detay + egzersiz-detay aynı full-viewport hero tutarsızlığı (keşifte çıktı, enerji-defteri ile aynı .df-top pattern) — gelecek tur. NOT: dadafit-hub ters durum (hub olduğu halde full-viewport DEĞİL) ayrı inceleme.
- [ ] A4 — DadaDiet güven katmanı UI: disclaimer şeridi + uzman profil alanları (diploma/uzmanlık/kayıt/doğrulama tarihi) + sağlık içerik meta (kaynak/uzman onayı/son güncelleme) — "örnek" çerçeveli iskelet, gerçek data Yasin'den
- [ ] A5 — Gourmet kesfet → landing restructure: modül önizlemeleri + tab'leri header nav'a ayrı modül + konsept içerik görselli slider (tarif-liste tarzı) + alta mekan-bul widget — BÜYÜK, önce keşif
- [ ] A6 — DadaDiet Diyetisyen Ara → sihirbaz/wizard (mekan-bul pattern'ı)
- [ ] A7 — Etkinlikler gerçek festival datasıyla doldur — data Beyar'dan gelir (doğrulanmış sheet), görsel bizim
- [ ] A8 — Mobil ana sayfa: kısa karşılama + 5 modül kartı (Gastro/Diet/Fit/Gourmet/Campus) + kişiselleştirilmiş hızlı aksiyonlar + DadaMentor alanı — BÜYÜK

## KOVA 2 — İçerik girişi (Yasin brief gerekli)
- [ ] Diet + Fit içerik girişi
- [ ] Campus içeriği — brief ŞART (sahte eğitim içeriği yasak)
- [ ] Gourmet gerçek mekan datası (Seçki/Etkinlik'e adres/tarih)

## KOVA 3 — Sonra konuşulacak / test
- [ ] Ortak utility sayfaları bağlam-duyarlı
- [ ] Marka araması
- [ ] DadaMutfak public içerik + revizeleri
- [ ] Public site ölü nav testi
- [ ] Mobil responsive testi
- [ ] kesfet tab scroll (parked — UX tercih meselesi)

## KOVA 4 — CC DEĞİL (Yasin + hukuk/DPO, ileride backend)
Bu kalemler CC'ye yazdırılmaz — hukuki/politika kararı gerektirir. Mockup tarafı sadece footer link'leri (mevcut) + opsiyonel rıza-checkbox UI'ı.
- KVKK/GDPR uyum matrisi · açık rıza akışları · sağlık verisi saklama · uzman-kullanıcı gizlilik protokolü · veri silme/hesap kapatma · çocuk/ergen politikası · diyetisyen-antrenör mesaj kayıt politikası

## KOVA 5 — Asset-bloklu
- [ ] Gourmet video hero — telifsiz loop (mekan + yol güzergahı çağrışımı), asset yok + gitignore, ayrı iş

---
Durum: A2 canlı. Sıradaki quick-win: A3.
