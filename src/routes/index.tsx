// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import logo from '@/assets/courtzone-main.png';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'CourtZone — Yakında açılıyoruz' },
      { name: 'description', content: 'CourtZone yakında sizlerle. Amatör tenis için ligler, turnuvalar ve canlı maçlar tek platformda.' },
      { property: 'og:title', content: 'CourtZone — Yakında açılıyoruz' },
      { property: 'og:description', content: 'Amatör tenis için ligler, turnuvalar ve canlı maçlar tek platformda.' },
    ],
  }),
  component: ComingSoon,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function ComingSoon() {
  const launch = new Date(Date.now() + 30 * 86400000);
  const { d, h, m, s } = useCountdown(launch);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent), radial-gradient(900px 500px at -10% 110%, color-mix(in oklab, var(--accent) 18%, transparent), transparent), var(--background)',
        color: 'var(--foreground)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans, Manrope, system-ui)',
      }}
    >
      <img src={logo} alt="CourtZone" style={{ height: 180, marginBottom: 24 }} />

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 999,
          background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
          color: 'var(--primary)',
          border: '1px solid color-mix(in oklab, var(--primary) 25%, transparent)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--primary)' }} />
        Yakında
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-display, "Instrument Serif", serif)',
          fontSize: 'clamp(48px, 8vw, 96px)',
          lineHeight: 1.05,
          margin: '24px 0 16px',
          fontWeight: 500,
          letterSpacing: -1,
        }}
      >
        Yakında <em style={{ color: 'var(--primary)' }}>açılıyoruz</em>
      </h1>

      <p style={{ maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: 'var(--muted-foreground, #666)', margin: 0 }}>
        Amatör tenis için ligler, turnuvalar ve canlı maçları tek platformda topluyoruz.
        Lansmana kısa bir süre kaldı — haberdar olmak için e-postanı bırak.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Gün', value: d },
          { label: 'Saat', value: h },
          { label: 'Dakika', value: m },
          { label: 'Saniye', value: s },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              minWidth: 92,
              padding: '18px 16px',
              borderRadius: 16,
              background: 'color-mix(in oklab, var(--foreground) 4%, transparent)',
              border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 36, fontWeight: 700, lineHeight: 1 }}>
              {String(b.value).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 11, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7 }}>{b.label}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email) setSent(true);
        }}
        style={{ marginTop: 40, display: 'flex', gap: 8, width: '100%', maxWidth: 460, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <input
          type="email"
          required
          placeholder="ornek@eposta.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: '1 1 240px',
            padding: '14px 18px',
            borderRadius: 999,
            border: '1px solid color-mix(in oklab, var(--foreground) 15%, transparent)',
            background: 'color-mix(in oklab, var(--foreground) 3%, transparent)',
            color: 'var(--foreground)',
            fontSize: 15,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '14px 24px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--primary)',
            color: 'var(--primary-foreground, #fff)',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          {sent ? 'Teşekkürler!' : 'Beni haberdar et'}
        </button>
      </form>

      {sent && (
        <p style={{ marginTop: 14, fontSize: 13, color: 'var(--primary)' }}>
          Listeye eklendin. Lansman gününde haber vereceğiz.
        </p>
      )}

      <footer style={{ marginTop: 64, fontSize: 12, opacity: 0.6 }}>
        © {new Date().getFullYear()} CourtZone — Tüm hakları saklıdır.
      </footer>
    </main>
  );
}
