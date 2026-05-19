// @ts-nocheck
import { useState } from 'react';
import { useTweaks } from '@/lib/use-tweaks';

const PRESETS = [
  { v: 'neo', l: 'Koyu' },
  { v: 'editorial', l: 'Açık' },
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
          width: 220, padding: 14,
          borderRadius: 14,
          background: 'var(--surface)', color: 'var(--ink)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex', flexDirection: 'column', gap: 10,
          fontFamily: 'var(--font-sans)', fontSize: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: 13 }}>Theme</strong>
            <button onClick={() => setOpen(false)} style={{ width: 22, height: 22, borderRadius: 6, color: 'var(--ink-3)' }}>×</button>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: 2, background: 'var(--bg-2)', borderRadius: 8 }}>
            {PRESETS.map((o) => (
              <button key={o.v}
                onClick={() => setTweak('aesthetic', o.v)}
                style={{
                  flex: 1, padding: '8px 10px', fontSize: 12,
                  borderRadius: 6,
                  background: t.aesthetic === o.v ? 'var(--surface)' : 'transparent',
                  color: 'var(--ink)',
                  boxShadow: t.aesthetic === o.v ? 'var(--shadow-sm)' : 'none',
                  fontWeight: t.aesthetic === o.v ? 600 : 400,
                }}>{o.l}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
