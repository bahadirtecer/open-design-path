// @ts-nocheck
import { useState } from 'react';
import { useTweaks } from '@/lib/use-tweaks';

const SECTIONS = [
  {
    key: 'theme',
    label: 'Theme',
    options: [
      { v: 'vercel', l: 'Vercel' },
      { v: '', l: 'Court' },
    ],
  },
  {
    key: 'aesthetic',
    label: 'Aesthetic',
    options: [
      { v: '', l: 'Default' },
      { v: 'editorial', l: 'Editorial' },
      { v: 'neo', l: 'Neo' },
    ],
  },
  {
    key: 'density',
    label: 'Density',
    options: [
      { v: 'comfortable', l: 'Comfy' },
      { v: 'compact', l: 'Compact' },
    ],
  },
  {
    key: 'bracket',
    label: 'Bracket',
    options: [
      { v: 'horizontal', l: 'Horizontal' },
      { v: 'vertical', l: 'Vertical' },
    ],
  },
  {
    key: 'role',
    label: 'Role',
    options: [
      { v: 'player', l: 'Player' },
      { v: 'organizer', l: 'Organizer' },
      { v: 'admin', l: 'Admin' },
    ],
  },
];

export function TweaksPanel() {
  const [t, setTweak] = useTweaks();
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open tweaks"
          style={{
            position: 'fixed', right: 16, bottom: 16, zIndex: 50,
            width: 44, height: 44, borderRadius: 999,
            background: 'var(--surface)', color: 'var(--ink)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid', placeItems: 'center',
            fontSize: 18,
          }}>⚙</button>
      )}
      {open && (
        <div style={{
          position: 'fixed', right: 16, bottom: 16, zIndex: 50,
          width: 260, padding: 14,
          borderRadius: 14,
          background: 'var(--surface)', color: 'var(--ink)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex', flexDirection: 'column', gap: 10,
          fontFamily: 'var(--font-sans)', fontSize: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: 13 }}>Tweaks</strong>
            <button onClick={() => setOpen(false)} style={{ width: 22, height: 22, borderRadius: 6, color: 'var(--ink-3)' }}>×</button>
          </div>
          {SECTIONS.map((s) => (
            <div key={s.key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ color: 'var(--ink-3)', fontSize: 11, letterSpacing: '0.04em' }}>{s.label}</span>
              <div style={{ display: 'flex', gap: 4, padding: 2, background: 'var(--bg-2)', borderRadius: 8 }}>
                {s.options.map((o) => (
                  <button key={o.v}
                    onClick={() => setTweak(s.key as any, o.v)}
                    style={{
                      flex: 1, padding: '6px 8px', fontSize: 11,
                      borderRadius: 6,
                      background: (t as any)[s.key] === o.v ? 'var(--surface)' : 'transparent',
                      color: 'var(--ink)',
                      boxShadow: (t as any)[s.key] === o.v ? 'var(--shadow-sm)' : 'none',
                      fontWeight: (t as any)[s.key] === o.v ? 600 : 400,
                    }}>{o.l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
