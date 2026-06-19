# Dön Buton Kanonu (madde 22)

Kaynak: `v5/ansiklopedi-v1.html` → `.ans-back` ("Kategorilere dön").
Tüm "geri/dön" butonları bu stile uyacak (sayfa-özel sınıf adı korunabilir, ama
görsel/anatomi birebir).

## Markup
```html
<button class="ans-back" type="button" id="...">
  <i class="fa-solid fa-arrow-left"></i> <Bağlama uygun metin, ör. "Menülere dön">
</button>
```

## CSS (token bazlı — yeni renk icat etme)
```css
.ans-back{
  display:inline-flex;align-items:center;gap:9px;
  font-family:inherit;font-size:13.5px;font-weight:700;
  color:var(--slate);background:var(--paper);
  border:1px solid var(--line);border-radius:var(--radius-md);
  padding:10px 16px;cursor:pointer;margin-bottom:22px;
  transition:.18s var(--ease);
}
.ans-back:hover{border-color:var(--tomato);color:var(--tomato)}
.ans-back i{font-size:12px}
```

## Kanon kuralları
- Ghost pill: beyaz zemin (`--paper`), 1px `--line` border, `--radius-md` (12px).
- İkon **solda**, `fa-arrow-left`, 12px; metinden 9px gap.
- Metin 13.5px / 700, renk `--slate`; hover'da border + metin `--tomato`.
- Padding `10px 16px`. Alt boşluk `margin-bottom:22px` (bağlama göre ayarlanabilir).
- Yön ikonu hep sol-ok; "›" / "←" karakteri veya dolu turuncu buton KULLANMA.

## Uygulayacak teammate'ler
- **pisirsem** — madde 9 ("Menülere dön").
- Diğer dön/geri butonu olan sayfalar tespit edildikçe eklenir.
