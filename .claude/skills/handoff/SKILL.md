---
name: handoff
description: "Oturum kapanışı: seçici commit + push + handoff güncelle"
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Oturum Kapanışı (handoff)

Beyar bu skill'i çağırdığında commit + push izni VERİLMİŞ sayılır — ayrıca sorma.
Akış dört adımdır; sırayla uygula, adım atlama.

## ADIM 1 — DURUM DOĞRULAMA

1. `git status --short` ve `git diff --stat` çıkar.
2. Bu oturumda çalışılan dosyaları belirle; stage'e **SADECE onları** al.
   **ASLA `git add -A` / `git add .` kullanma** — dosyaları tek tek adıyla ekle.
3. Şunlar **asla commit'e girmez**:
   - QA scriptleri (`tasks/` altındaki `_qa-*.mjs` ve benzeri `_*.mjs` yardımcıları)
   - Screenshot/görsel çıktılar (`outputs/`, `docs/screenshots/`)
   - `.env` ve türevleri
   - Scratch/deneme dosyaları
   - Oturumda dokunulmayan local değişiklikler → **unstaged bırak** (örn. Beyar'ın kendi
     working-tree işi; dokunma, commit'e karıştırma)
4. Farklı concern'lere ait değişiklikler varsa **AYRI commit'lere böl**
   (gerekirse `git add -p` ile parça parça stage'le).

## ADIM 2 — COMMIT + PUSH

1. Push ÖNCESİ staged dosya listesini (`git diff --cached --stat`) çıktıya yaz — şeffaflık.
2. Commit mesajı: **İngilizce, açıklayıcı, kişisel isim yok** (ör. `feat(shopping-list): sponsor market block + dynamic aisle groups`).
3. Commit'le, `git push origin main`, commit hash'lerini not al.

## ADIM 3 — HANDOFF GÜNCELLE

`tasks/handoff.md` dosyasını güncelle (yoksa oluştur; gitignore'ludur, commit'lenmez):

- **En üste** yeni blok: tarih + oturum özeti (dosya bazında kısa) + commit hash'leri
- Öğrenilen kritik teknik detay / tuzak (varsa — sonraki oturum aynı çukura düşmesin)
- Bekleyen işler + sıradaki adım
- Local server / QA durumu (port, hangi sayfa test edildi)
- Güncel durum üste gelir; **tarihi geçmiş biten maddeleri temizle**, hâlâ geçerli
  kalıcı notları (kurallar, DOKUNMA listeleri, dersler) koru.

## ADIM 4 — KAPANIŞ RAPORU

Kısa rapor ver:
- Commit hash'leri + push durumu
- Handoff güncellendi onayı
- Bekleyen işler (tek satır özet)

Sonunda net yaz: **"Artık clear atabilirsin."** — ve HİÇBİR yeni işe başlama.
