import glob, os, sys, re

shell = open('mockups/_shell.html', encoding='utf-8').read()

# CSS bloğunu _shell'den EXTRACT et (anchor satırı ile r-chip yorumu arası)
css_anchor = '.mega-cats .mega-cat-all:hover .mca-arrow{transform:translateX(3px)}\n'
css_end = '/* mega içindeki r-chip (mf-fig rozeti) için minimal taban */'
i0 = shell.index(css_anchor) + len(css_anchor)
i1 = shell.index(css_end)
CSS_INSERT = shell[i0:i1]                      # mega-find CSS bloğu (trailing newline dahil)
assert '.mega-find{' in CSS_INSERT and CSS_INSERT.count('{')>=8, 'CSS extract suspafe'

# Markup anchor + replace
M_ANCHOR = '''                    <h4>Mevsim Meyveli Cheesecake</h4>
                  </div>
                </div>'''
M_REPLACE = '''                    <h4>Mevsim Meyveli Cheesecake</h4>
                  </div>
                  <a class="mega-find" href="tarif-bulucu-v1.html">
                    <span class="mf-ico"><i class="fa-solid fa-basket-shopping"></i></span>
                    <span class="mf-body"><b>Tarif Bulucu</b><small>Dolabındakilerle ne pişersin?</small></span>
                    <i class="fa-solid fa-arrow-right mf-arr"></i>
                  </a>
                </div>'''

EXCLUDE = {'_shell.html','anasayfa-portal-v3a.html','tarif-detay-v1-headA.html'}  # ansiklopedi-v1 #21 sonrası dahil

targets = []
for f in sorted(glob.glob('mockups/*.html')):
    b = os.path.basename(f)
    if b in EXCLUDE: continue
    s = open(f, encoding='utf-8').read()
    if 'class="mega-feat"' not in s: continue   # shop/panel yok
    targets.append(f)

done=[]; skipped=[]; errors=[]
DRY = ('--apply' not in sys.argv)
for f in targets:
    s = open(f, encoding='utf-8').read()
    if 'mega-find' in s:
        skipped.append(os.path.basename(f)); continue
    # SPAN-GUARD: anchorlar TAM 1 kez
    if s.count(css_anchor.rstrip('\n')) != 1 or s.count(M_ANCHOR) != 1:
        errors.append(f'{os.path.basename(f)}: anchor sayisi css={s.count(css_anchor.rstrip(chr(10)))} markup={s.count(M_ANCHOR)}')
        continue
    s2 = s.replace(css_anchor, css_anchor + CSS_INSERT, 1)
    s2 = s2.replace(M_ANCHOR, M_REPLACE, 1)
    # guard: net buyume makul mi (CSS ~900 + markup ~360 kar)
    delta = len(s2)-len(s)
    if not (1100 < delta < 1500):
        errors.append(f'{os.path.basename(f)}: delta={delta} (beklenmedik)'); continue
    if not DRY:
        open(f,'w',encoding='utf-8').write(s2)
    done.append(os.path.basename(f))

print('MOD:', 'APPLY' if not DRY else 'DRY-RUN')
print('hedef:', len(targets), '| islenecek:', len(done), '| zaten-var(skip):', len(skipped), '| HATA:', len(errors))
if errors: print('ERRORS:'); [print('  ',e) for e in errors]
print('CSS_INSERT uzunluk:', len(CSS_INSERT), 'kar')
