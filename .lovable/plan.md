## Hedef

CourtZone prototipindeki tüm sayfa ve bileşenleri (player, organizer, admin, public, QR, live — toplam ~40 ekran) bu Lovable projesine, **TanStack Start + React 19 + Tailwind v4** mimarisine taşımak. Stiller `styles.css`'ten **oklch token'larına** port edilir, üç tema (heritage / vercel / dark) korunur. Mock data olduğu gibi kalır.

## 1. Tasarım sistemi (önce bu)

`src/styles.css` içinde 3 tema:
- **heritage** (varsayılan): kum/orman yeşili/clay turuncu
- **vercel**: temiz açık + lime accent
- **dark**: koyu mavi-yeşil

Her tema için `oklch` token'ları:
- `--background, --foreground, --card, --muted, --border` (shadcn ile uyumlu)
- Marka token'ları: `--primary` (forest), `--accent` (clay), `--surface-2`, `--ink-2/3`, `--line-2`, `--chip`
- Tipografi token'ları: `--font-sans` (Manrope), `--font-display` (Instrument Serif), `--font-mono` (JetBrains Mono) → `@theme inline` üzerinden Tailwind'e
- Gölgeler ve radius (`--radius-sm/md/lg/xl`) token olarak

Tema seçimi `<html data-theme="...">` ile, kalıcılık `localStorage`'da.

## 2. Klasör yapısı

```
src/
  routes/
    __root.tsx                 (Header + ThemeProvider + Outlet)
    index.tsx                  -> Landing (public)
    about.tsx, how.tsx
    signup.tsx, login.tsx, reset.tsx
    _authenticated.tsx         (rol-bazlı guard, mock auth)
    _authenticated/
      dashboard.tsx            (rol'e göre Player/Organizer/Admin)
      my-competitions.tsx
      leagues/index.tsx, leagues.$id.tsx
      tournaments/index.tsx, tournaments.$id.tsx, tournaments.$id.bracket.tsx
      matches/index.tsx, matches.entry.tsx
      organizer/create-league.tsx, create-tournament.tsx
      organizer/leagues.$id.tsx, tournaments.$id.tsx, matches.tsx
      profile.tsx, profile.$handle.tsx
      notifications.tsx, messages.tsx
      qr/index.tsx, qr.confirm.tsx, qr.success.tsx, qr.poster.tsx
      live/index.tsx, live.watch.$id.tsx, live.go.tsx, live.dashboard.tsx
      admin/users.tsx, orgs.tsx, reports.tsx
  components/
    ui/                        (mevcut shadcn — olduğu gibi kalır)
    courtzone/
      Avatar.tsx, Stat.tsx, Chip.tsx, Btn.tsx, Field.tsx, Card.tsx,
      PhotoBox.tsx, Tabs.tsx, PillGroup.tsx, QRGlyph.tsx, Phone.tsx,
      Sidebar.tsx, Topbar.tsx, TweaksPanel.tsx, Bracket.tsx
  lib/
    mock-data.ts               (data.js port — TS tipleriyle)
    icons.tsx                  (icons.jsx port)
    use-tweaks.ts              (theme/density/role state)
    use-role.ts                (mock auth — localStorage)
  assets/
    courtzone-logo.png, courtzone-mark.png, courtzone-horizontal.png
    court-bg.json (Lottie veya SVG'ye dönüştürülmüş)
```

## 3. Atom katmanı

components.jsx'teki tüm atomlar (Avatar, Stat, Chip, Btn, Card, Field, Tabs, PillGroup, PhotoBox, QRGlyph, Phone, Sidebar, Topbar, Bracket) ayrı .tsx dosyalarına taşınır. Stil sınıfları (`.btn`, `.card`, `.chip`, `.stat`...) styles.css'ten birebir korunur, böylece tema değiştirici kuralları çalışmaya devam eder. Renkler hep `var(--primary)` vs. üzerinden gider — hard-coded HEX kalmaz (mevcut Btn'deki inline `#85B201` kaldırılır).

## 4. Sayfa portu (sayfa başı ~30-80 satır)

- 7 public sayfa (Landing, About, How, SignUp, Login, Reset)
- 3 dashboard (Player, Organizer, Admin)
- 8 player sayfası
- 5 organizer sayfası
- 4 QR sayfası
- 4 hesap sayfası (profil, public profil, bildirimler, mesajlar)
- 4 live sayfası
- 3 admin sayfası

Her sayfa kendi `head()` ile başlık + meta tanımlar.

## 5. Rol & navigation (mock)

- `useRole()` hook'u localStorage'a "player | organizer | admin" yazar
- `_authenticated.tsx` → rol yoksa `/login`'e redirect (mock; gerçek auth yok)
- Sidebar mevcut rolün menüsünü gösterir (player/organizer/admin)
- TweaksPanel sağ-altta kalır: tema, yoğunluk, bracket yönü, rol değiştirici

## 6. Mock data

`window.TL_DATA` IIFE'si TS modülüne dönüştürülür: `export const PLAYERS, LEAGUES, TOURNAMENTS, MATCHES, ...`. Sayfalar bu modülden import eder.

## 7. Sıra (tek turda hepsi)

1. Token'lar + styles.css portu + 3 tema
2. Atom bileşenleri + Sidebar/Topbar shell
3. Public sayfalar + Landing
4. Auth route guard + dashboards
5. Player akışı + Bracket
6. Organizer akışı
7. QR + Live + Admin + hesap sayfaları
8. TweaksPanel + tema/rol switcher
9. Logo asset'leri ekle, placeholder index'i kaldır, head() metalarını yaz

## Teknik notlar

- TanStack Start file-based routing; `routeTree.gen.ts` otomatik üretilir
- Tüm renkler `oklch` semantik token; `text-white`, `bg-black` yok
- `Link` ve `useNavigate` `@tanstack/react-router`'dan
- styles.css `@import "tailwindcss"` ile birlikte kullanılır; özel sınıflar (`.btn`, `.card`...) korunur — Tailwind utility'leri ile karışık çalışır
- Backend yok; tüm form submit'ler mock toast gösterir
- SSR uyumluluğu için `localStorage` erişimleri `useEffect` içinde
