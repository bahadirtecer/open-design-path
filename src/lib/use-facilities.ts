// @ts-nocheck
// Facility (Tesis) state with localStorage persistence.
// Rule: a facility belongs to its creator. Only admins can publish a facility
// as "shared" so other organizers can use it. Players see: their own + admin-shared.
import { useCallback, useEffect, useState } from 'react';

export type Facility = {
  id: string;
  name: string;
  location: string;     // human-readable address / Google place
  lat?: number;
  lng?: number;
  surface: string;      // Clay | Hard | Indoor | Grass
  hoursFrom?: string;   // e.g. "08:00" — optional but used for auto-fixturing
  hoursTo?: string;     // e.g. "22:00"
  sharedPublic: boolean;
  ownerRole: 'player' | 'admin';
  ownerLabel: string;
};

const KEY = 'cz_facilities_v1';

const SEED: Facility[] = [
  { id: 'fac_muni', name: 'Warsaw Municipal Tennis Center', location: 'ul. Łazienkowska 6a, Warszawa', lat: 52.21, lng: 21.03, surface: 'Hard', hoursFrom: '07:00', hoursTo: '22:00', sharedPublic: true, ownerRole: 'admin', ownerLabel: 'CourtZone HQ' },
  { id: 'fac_maz', name: 'Mazovia Sport Complex', location: 'Al. Niepodległości 162, Warszawa', lat: 52.20, lng: 21.00, surface: 'Clay', hoursFrom: '08:00', hoursTo: '21:00', sharedPublic: true, ownerRole: 'admin', ownerLabel: 'CourtZone HQ' },
  { id: 'fac_wtc', name: 'Warszawa Tennis Club', location: 'ul. Solec 18, Warszawa', lat: 52.23, lng: 21.04, surface: 'Indoor', hoursFrom: '17:00', hoursTo: '23:00', sharedPublic: false, ownerRole: 'player', ownerLabel: 'You' },
];

export function useFacilities(role: 'player' | 'admin') {
  const [list, setList] = useState<Facility[]>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setList(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Facility[]) => {
    setList(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const add = useCallback((f: Omit<Facility, 'id' | 'ownerRole' | 'ownerLabel'>) => {
    const id = 'fac_' + Math.random().toString(36).slice(2, 8);
    const item: Facility = {
      ...f,
      id,
      ownerRole: role,
      ownerLabel: role === 'admin' ? 'CourtZone HQ' : 'You',
      sharedPublic: role === 'admin' ? !!f.sharedPublic : false,
    };
    persist([item, ...list]);
    return item;
  }, [list, role]);

  // Visibility rule: own facilities + admin-shared facilities.
  // Admins only see their own (admin-owned) entries.
  const visible = role === 'admin'
    ? list.filter((f) => f.ownerRole === 'admin')
    : list.filter((f) => f.ownerRole === 'player' || f.sharedPublic);

  return { facilities: visible, all: list, add };
}
