// @ts-nocheck
// Tweaks (theme/density/bracket/role) state with localStorage persistence.
import { useEffect, useState } from 'react';

export type Tweaks = {
  theme: string;
  aesthetic: string;
  density: string;
  bracket: string;
  role: 'player' | 'admin';
  organizing: 'none' | 'active'; // does the player currently run any competitions?
};

const DEFAULTS: Tweaks = {
  theme: 'vercel',
  aesthetic: '',
  density: 'comfortable',
  bracket: 'horizontal',
  role: 'player',
  organizing: 'active',
};

const KEY = 'cz_tweaks_v1';

export function useTweaks() {
  const [t, setT] = useState<Tweaks>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Migrate legacy 'organizer' role → 'player' (organizer role removed).
        if (parsed.role === 'organizer') parsed.role = 'player';
        setT({ ...DEFAULTS, ...parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const b = document.body;
    if (t.theme) b.setAttribute('data-theme', t.theme); else b.removeAttribute('data-theme');
    if (t.aesthetic) b.setAttribute('data-aesthetic', t.aesthetic); else b.removeAttribute('data-aesthetic');
    b.setAttribute('data-density', t.density);
    b.setAttribute('data-bracket', t.bracket);
    b.setAttribute('data-role', t.role);
    try { localStorage.setItem(KEY, JSON.stringify(t)); } catch {}
  }, [t]);

  const setTweak = (k: keyof Tweaks, v: string) => setT((p) => ({ ...p, [k]: v }));
  return [t, setTweak] as const;
}
