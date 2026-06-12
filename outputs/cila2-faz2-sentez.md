# CİLA-2 FAZ 2 — ÜYELİK/PROFİL MODÜLÜ · SENTEZ RAPORU

> Takım: cila2-faz2 (lead + akis-mimar + profil + etkilesim) · 2026-06-12 akşam
> İA: `tasks/uyelik-ia.md` (KİLİTLİ, §8 lead kararları M1–M8 dahil)
> Teammate raporları: `outputs/cila2-faz2-profil-rapor.md` ·
> `outputs/cila2-faz2-etkilesim-rapor.md`
> **COMMIT ATILMADI — öneri en altta, Beyar onayı bekliyor.**

## 1 · NE YAPILDI (özet)

Faz 2 = yeni sayfa üretmek değil, mevcut üyelik ailesini **tek tutarlı akışa
bağlamak** (İA ana tezi). Eski sitenin 14-bölümlü dev `hesabim.html`'i 3 role
bölündü: **Defter** (kimlik+içerik) · **Hesabım** (ayar) · **Shop hesabı**
(ticaret, Faz 2 dışı).

- **İA** (akis-mimar): eski site envanteri (L1) + diff tablosu + akış kurgusu +
  dosya bölüşümü. 8 karar maddesi lead tarafından FULL AUTO kapatıldı (§8).
- **Login simülasyonu:** `?auth=1/0` + localStorage `dm_auth` + `body.is-auth`
  — tüm public sitede çalışır; Çıkış → `?auth=0` (M7).
- **Header login-state** (etkilesim): logged-out `[Ara][Giriş Yap][☰]` ↔
  logged-in `[Ara][➕Ekle▾][🔔][avatar▾]`; avatar dropdown'ı İA §2.2 sırasında
  (Mutfak Defterim · Tariflerim · Kaydedilenler · Menülerim · Bildirimler ·
  Ayarlar/Hesabım · Çıkış); drawer avatar satırı; bottom-nav "Hesap" hedefi
  logged-in'de deftere döner (M6). **55 sayfaya sweep'lendi.**
- **Profil ailesi** (profil): mutfak-defteri own↔public mod (`?view=public` →
  `pf-public`; public'te 3 sekme + Takip Et, private sekmeler gizli) · M3 durum
  chip filtresi (Yayında/Taslak/Onayda) · hesabim yalnız-ayar + "Hesabı Sil"
  38px borcu kapandı · giris `?tab=` + Google+FB + **demo pre-fill (Beyar
  isteği: tek tıkla login)** · onboarding atlanabilir (M8) → `?auth=1` ·
  bildirimler `?filter=`.
- **Katkı + kapılar** (etkilesim): 🆕 `puf-noktasi-ekle-v1.html` (tek gerçek
  yeni sayfa; tarif-ekle fk-*/sbanner/tips mirası, TEK adım, içerik blokları) ·
  tarif-ekle `?mode=edit` (eski tarif-duzenle) · BNP "Deftere Kaydet" → defter
  `?tab=menuler` köprüsü (İA §4) · puf-detay + tarif-detay yorum/kaydet
  login-gate'leri (İA §5) · `lg-gate` hafif popover (chrome).
- **Persona:** site geneli **Elif Şahin / @elifsahin** (defter+hesabim+
  onboarding hizalandı; bildirim aktörleri başka kullanıcılar).
- **Envanter: 68 → 69** üretim sayfası (+ puf-noktasi-ekle-v1).

## 2 · KANITLI KABUL DENETİMİ (lead)

- **Grep katmanı:** İA spesifikasyonlarına karşı dosya dosya; sweep sonrası
  bağımsız negatif grep (`btn-login` VAR + `acct-wrap` YOK → kalan 6 shop +
  1 headA, hepsi bilinçli) + shop sızıntı 0 + panel/hesaplayıcı muafları 0 iz.
- **Tıklama/DOM probe:** defter mod geçişi + Takip Et toggle + 38px ölçümü +
  giriş tek-tık akışı (pre-fill→`?auth=1` anasayfa) + BNP menü-kur→kaydet
  toast'ı + gate fallback yönlendirmesi gerçek tıklamayla doğrulandı.
- **Örneklem probe (sweep sonrası):** 9 sayfa × 2 auth × 2 genişlik = **36
  ölçüm** + anasayfa retest 4 (`.ss-scratch/faz2/probe.py`, sanity-check'li):
  390 taşma 0 · konsol hatası 0 · `is-auth` doğru · 1280'de header swap doğru.
  Örneklem: anasayfa, tarif-liste, tarif-detay, video-mutfagi, saglik-hub,
  mekan-liste, sozluk, ideal-kilo, alisveris-listesi.
- **SS katmanı:** kabul SS'leri sohbette + `.ss-scratch/faz2-kabul/` (7 adet).

### Denetimde yakalanan ve KAPANAN bulgular (4)

1. 🟡 bildirimler aktörü "Elif Şahin" (kendine bildirim) → Ayşe Demir (profil,
   tur 1).
2. 🟡 BNP `mdSave` guard'sız `working.title` TypeError (edge) → guard eklendi
   (etkilesim, tur 1).
3. 🟠 Sweep kaçağı: `alisveris-listesi-v1` adı yüzünden "shop" sanılıp
   atlanmış — ana site chrome'u taşıyor → sweep'lendi (sweep tur 1).
4. 🔴 **Sweep region-swap anasayfanın ~308 satır CSS'ini yuttu** (hero,
   searchcard, chips, stats stilsiz; Beyar canlı yakaladı + lead probe aynı
   anda). HEAD restore + v3a'nın kendi anchor'larıyla elle patch → 5/5 kriter
   kanıtla kapandı; kalan 54 dosyada gizli-yutma taraması 0 (sweep tur 2/2).

## 3 · BİLİNEN SINIRLAMALAR (peşinen — yeni zorunlu kural)

- **`?auth=` ŞURALARDA ÇALIŞMAZ (bilinçli):** 6 shop sayfası (kendi `lm-*`
  login modalı var; is-auth sızdırılmadı) · panel ailesi (panel-shell + 6
  dyt-*) + hesaplayici-v1 (public chrome taşımazlar) · ref-* klonlar · headA
  arşivi.
- **Mock sınırları (Laravel fazı):** gerçek oturum yok (localStorage simülasyonu)
  · form submit/upload/sosyal login dekoratif · `?return=` dekoratif · reCAPTCHA
  bilinçli yok (M5) · adres/kupon/fatura kapsam dışı (M4).
- **Davranış:** kaydet/yorum gate'leri çekirdek kapsamda yalnız puf-detay +
  tarif-detay + BNP (M1; diğer detay sayfaları Faz 3 adayı) · durum filtresi
  gösterimsel · defter public modu tek profil üzerinden simüle.
- **Kozmetik borç:** puf-ekle'de kullanılmayan stepper CSS'i (zararsız ölü kod;
  BNP ölü wizard CSS'iyle birlikte temizlenebilir — isteğe bağlı mini iş).

## 4 · BEYAR İNCELEME LİSTESİ (server: `python3 -m http.server 8765`)

Tam akış (önerilen sıra):
1. `giris-v1.html` → form ÖN DOLU, "Giriş Yap"a bas → anasayfa avatar'lı ✅
2. `anasayfa-portal-v3a.html?auth=1` → avatar▾ dropdown'ı gez (7 öğe)
3. `mutfak-defteri-v1.html` (own: Profili Düzenle + 6 sekme + durum çipleri) ↔
   `?view=public` (Takip Et + 3 sekme)
4. `hesabim-v1.html` (yalnız ayar; danger 38px) · `bildirimler-v1.html?filter=yorum`
5. `puf-noktasi-ekle-v1.html` (🆕; `?state=review` bandı) ·
   `tarif-ekle-v1.html?mode=edit`
6. `bugun-ne-pisirsem-v1.html?auth=1` → menü kur → "Deftere Kaydet" → toast
7. Gate testi: `puf-noktasi-detay-v1.html?auth=0` (yorum daveti) ↔ `?auth=1`
   (form açık); `tarif-detay-v1.html?auth=0` kaydet → giriş kapısı
8. Çıkış: avatar▾ → Çıkış → logged-out header
- ⚠️ Shop sayfalarında ve panelde `?auth=` ETKİSİZ — bilinçli (üstte §3).

## 5 · BEYAR/PATRON BEKLEYENLER

- **M2 — sosyal login seti:** ana site Google+FB ↔ shop modalı Google+Apple
  tutarsızlığı patron kararına bağlı (handoff "patron bekleyenler" md.9) —
  dokunulmadı.
- lg-gate'in diğer detay sayfalarına genişletilmesi (mutfaga-giris, kesfet,
  urun, diyetisyen) — Faz 3 adayı.
- Ölü CSS temizliği (puf-ekle stepper + BNP wizard) — isteğe bağlı mini iş.
- Sweep tooling'i (`mockups/_sweep-loginstate.js` + `_sweep-verify.js` +
  `_patch-anasayfa.js`) — audit izi olarak commit'e dahil önerisi.

## 6 · COMMIT ÖNERİSİ (ATILMADI — Beyar onayı bekliyor)

Tek commit, önerilen mesaj:

```
feat(mockup): cila-2 faz 2 — uyelik/profil modulu: IA + login-state sweep
55 sayfa + puf-noktasi-ekle (yeni) + defter own/public mod + BNP defter
koprusu + yorum/kaydet gate'leri + giris demo pre-fill (envanter 68→69)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

Kapsam: 56 M + 9 yeni (puf-noktasi-ekle-v1, uyelik-ia.md, 2 teammate raporu,
bu sentez, 3 sweep tooling). PUSH YOK — Beyar ayrıca karar verir.
