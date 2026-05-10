// @ts-nocheck
// Tweaks (theme/density/bracket/role) state with localStorage persistence.
// Shared store so all components stay in sync.
import { useEffect, useSyncExternalStore } from 'react';

export type Tweaks = {
  theme: string;
  aesthetic: string;
  density: string;
  bracket: string;
  role: 'player' | 'admin';
  organizing: 'none' | 'active';
};

const DEFAULTS: Tweaks = {
  theme: '',
  aesthetic: 'neo',
  density: 'compact',
  bracket: 'horizontal',
  role: 'player',
  organizing: 'active',
};

const KEY = 'cz_tweaks_v3';

function load(): Tweaks {
  if (typeof localStorage === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    if (parsed.role === 'organizer') parsed.role = 'player';
    return { ...DEFAULTS, ...parsed };
  } catch { return DEFAULTS; }
}

let state: Tweaks = DEFAULTS;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() { listeners.forEach((l) => l()); }

function applyDom(t: Tweaks) {
  if (typeof document === 'undefined') return;
  const b = document.body;
  if (t.theme) b.setAttribute('data-theme', t.theme); else b.removeAttribute('data-theme');
  if (t.aesthetic) b.setAttribute('data-aesthetic', t.aesthetic); else b.removeAttribute('data-aesthetic');
  b.setAttribute('data-density', t.density);
  b.setAttribute('data-bracket', t.bracket);
  b.setAttribute('data-role', t.role);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() { return state; }
function getServerSnapshot() { return DEFAULTS; }

function setTweak(k: keyof Tweaks, v: string) {
  state = { ...state, [k]: v };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  applyDom(state);
  emit();
}

export function useTweaks() {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!hydrated) {
      hydrated = true;
      state = load();
      applyDom(state);
      emit();
    }
  }, []);
  return [t, setTweak] as const;
}
