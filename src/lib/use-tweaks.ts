// @ts-nocheck
// Tweaks: only 2 presets — Koyu (neo) and Açık (editorial).
// Theme = Court (default), Density = Compact, both constant.
// role/organizing kept as internal app state (not user-facing in tweaks).
import { useEffect, useSyncExternalStore } from 'react';

export type Tweaks = {
  aesthetic: 'neo' | 'editorial';
  // Internal app state — not exposed in TweaksPanel UI.
  role: 'player' | 'admin';
  organizing: 'none' | 'active';
};

const DEFAULTS: Tweaks = {
  aesthetic: 'neo',
  role: 'player',
  organizing: 'active',
};

const KEY = 'cz_tweaks_v4';

function load(): Tweaks {
  if (typeof localStorage === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    if (parsed.aesthetic !== 'neo' && parsed.aesthetic !== 'editorial') parsed.aesthetic = 'neo';
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
  b.removeAttribute('data-theme');
  b.setAttribute('data-aesthetic', t.aesthetic);
  b.setAttribute('data-density', 'compact');
  b.setAttribute('data-role', t.role);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() { return state; }
function getServerSnapshot() { return DEFAULTS; }

function setTweak(k: keyof Tweaks, v: any) {
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
