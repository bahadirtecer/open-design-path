// @ts-nocheck
// Mock data for CourtZone prototype (ported from data.js)

export const PLAYERS = [
  { id: 1, name: 'Iga Górski', handle: 'iga.g', city: 'Warszawa', rating: 1842, w: 28, l: 9, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces' },
  { id: 2, name: 'Marek Lewandowski', handle: 'marekl', city: 'Kraków', rating: 1798, w: 24, l: 11, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces' },
  { id: 3, name: 'Hanna Kowalczyk', handle: 'hanna_k', city: 'Gdańsk', rating: 1755, w: 22, l: 12, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces' },
  { id: 4, name: 'Tomasz Nowak', handle: 'tnowak', city: 'Poznań', rating: 1721, w: 19, l: 13, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces' },
  { id: 5, name: 'Aleksandra Mazur', handle: 'olamazur', city: 'Warszawa', rating: 1689, w: 18, l: 14, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces' },
  { id: 6, name: 'Piotr Wiśniewski', handle: 'piotrw', city: 'Wrocław', rating: 1655, w: 17, l: 15, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces' },
  { id: 7, name: 'Karolina Dąbrowska', handle: 'karolinad', city: 'Łódź', rating: 1622, w: 16, l: 16, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces' },
  { id: 8, name: 'Jakub Wójcik', handle: 'kubaw', city: 'Katowice', rating: 1598, w: 14, l: 17, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&h=160&fit=crop&crop=faces' },
  { id: 9, name: 'Magdalena Kamińska', handle: 'magdak', city: 'Lublin', rating: 1572, w: 13, l: 18, avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=160&h=160&fit=crop&crop=faces' },
  { id: 10, name: 'Adam Krawczyk', handle: 'adamk', city: 'Szczecin', rating: 1544, w: 12, l: 19, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=160&h=160&fit=crop&crop=faces' },
  { id: 11, name: 'Natalia Zielińska', handle: 'natalka', city: 'Bydgoszcz', rating: 1521, w: 11, l: 19, avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=160&h=160&fit=crop&crop=faces' },
  { id: 12, name: 'Bartłomiej Szymański', handle: 'bartss', city: 'Białystok', rating: 1488, w: 10, l: 20, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&h=160&fit=crop&crop=faces' },
  { id: 13, name: 'Joanna Woźniak', handle: 'joannaw', city: 'Gdynia', rating: 1462, w: 9, l: 21, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=faces' },
  { id: 14, name: 'Michał Kozłowski', handle: 'mkoz', city: 'Częstochowa', rating: 1438, w: 8, l: 22, avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=160&h=160&fit=crop&crop=faces' },
  { id: 15, name: 'Anna Jankowska', handle: 'annaj', city: 'Radom', rating: 1411, w: 7, l: 23, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces' },
  { id: 16, name: 'Sebastian Pawlak', handle: 'sebap', city: 'Sosnowiec', rating: 1385, w: 6, l: 24, avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=160&h=160&fit=crop&crop=faces' },
];

export const LEAGUES = [
  { id: 'l1', name: 'Warszawa Open Spring 2026', city: 'Warszawa', surface: 'Hard', format: 'Round-robin', players: 24, status: 'active', start: 'Mar 2', end: 'Jun 14', cover: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=400&fit=crop', org: 'Warszawa Tennis Club' },
  { id: 'l2', name: 'Kraków Ladder Series', city: 'Kraków', surface: 'Clay', format: 'Ladder', players: 32, status: 'active', start: 'Apr 1', end: 'Aug 30', cover: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop', org: 'TKKF Kraków' },
  { id: 'l3', name: 'Trójmiasto Premier League', city: 'Gdańsk', surface: 'Hard', format: 'ATP-points', players: 48, status: 'active', start: 'Feb 18', end: 'Sep 12', cover: 'https://images.unsplash.com/photo-1527171647209-450b3f4ec0a4?w=800&h=400&fit=crop', org: 'Trójmiasto Tennis' },
  { id: 'l4', name: 'Poznań Junior League', city: 'Poznań', surface: 'Clay', format: 'Round-robin', players: 16, status: 'upcoming', start: 'May 12', end: 'Aug 10', cover: 'https://images.unsplash.com/photo-1551773161-9c439e1e0bb1?w=800&h=400&fit=crop', org: 'Poznań Tennis Academy' },
  { id: 'l5', name: 'Wrocław Senior+ Round-Robin', city: 'Wrocław', surface: 'Indoor', format: 'Round-robin', players: 12, status: 'past', start: 'Sep 4', end: 'Dec 15', cover: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=400&fit=crop', org: 'Wrocław Veterans' },
  { id: 'l6', name: 'Łódź Industrial Cup', city: 'Łódź', surface: 'Hard', format: 'Ladder', players: 20, status: 'active', start: 'Mar 22', end: 'Jul 30', cover: 'https://images.unsplash.com/photo-1551757055-b8d40f1c1fa9?w=800&h=400&fit=crop', org: 'Łódź Sport Center' },
];

export const TOURNAMENTS = [
  { id: 't1', name: 'Mazovia Spring Cup 2026', city: 'Warszawa', surface: 'Clay', format: 'Single elim', players: 32, status: 'active', date: 'May 22 – 24', fee: '120 zł', cover: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=400&fit=crop' },
  { id: 't2', name: 'Tatra Open Doubles', city: 'Zakopane', surface: 'Hard', format: 'Double elim', players: 16, status: 'upcoming', date: 'Jun 8 – 10', fee: '180 zł', cover: 'https://images.unsplash.com/photo-1551773161-9c439e1e0bb1?w=800&h=400&fit=crop' },
  { id: 't3', name: 'Bałtyk Coastal Championship', city: 'Sopot', surface: 'Clay', format: 'Group + KO', players: 24, status: 'active', date: 'Jun 14 – 16', fee: '150 zł', cover: 'https://images.unsplash.com/photo-1527171647209-450b3f4ec0a4?w=800&h=400&fit=crop' },
  { id: 't4', name: 'Silesian Indoor Masters', city: 'Katowice', surface: 'Indoor', format: 'Single elim', players: 16, status: 'past', date: 'Feb 20 – 22', fee: '95 zł', cover: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=400&fit=crop' },
  { id: 't5', name: 'Lublin Junior Trophy', city: 'Lublin', surface: 'Clay', format: 'Single elim', players: 8, status: 'upcoming', date: 'Jul 4 – 5', fee: '40 zł', cover: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop' },
  { id: 't6', name: 'Pomeranian Open', city: 'Gdynia', surface: 'Hard', format: 'Single elim', players: 32, status: 'active', date: 'May 30 – Jun 1', fee: '160 zł', cover: 'https://images.unsplash.com/photo-1551757055-b8d40f1c1fa9?w=800&h=400&fit=crop' },
];

export const STANDINGS = PLAYERS.slice(0, 12).map((p, i) => ({
  ...p,
  played: 8 + Math.floor(((i * 13) % 10) / 5),
  wins: Math.max(0, 9 - i),
  losses: Math.max(0, i - 1),
  sets_w: 18 - i,
  sets_l: 4 + i,
  pts: Math.max(0, 28 - i * 2),
})).sort((a, b) => b.pts - a.pts);

export const MATCHES = [
  { id: 'm1', league: 'l1', leagueName: 'Warszawa Open', round: 'R3', p1: PLAYERS[0], p2: PLAYERS[3], score: '6-4, 6-3', status: 'completed', date: 'May 4', court: 'Court 3', mine: true },
  { id: 'm2', league: 'l1', leagueName: 'Warszawa Open', round: 'R3', p1: PLAYERS[1], p2: PLAYERS[4], score: '7-5, 4-6, 6-2', status: 'completed', date: 'May 4', court: 'Court 1' },
  { id: 'm3', league: 'l1', leagueName: 'Warszawa Open', round: 'R4', p1: PLAYERS[0], p2: PLAYERS[2], score: '— vs —', status: 'scheduled', date: 'May 12, 18:00', court: 'Court 2', mine: true },
  { id: 'm4', league: 'l3', leagueName: 'Trójmiasto Premier', round: 'R2', p1: PLAYERS[0], p2: PLAYERS[5], score: '— vs —', status: 'scheduled', date: 'May 18, 19:30', court: 'Sopot Centre', mine: true },
  { id: 'm5', league: 'l1', leagueName: 'Warszawa Open', round: 'R2', p1: PLAYERS[0], p2: PLAYERS[6], score: '6-2, 6-1', status: 'completed', date: 'Apr 28', court: 'Court 3', mine: true },
  { id: 'm6', league: 'l1', leagueName: 'Warszawa Open', round: 'R2', p1: PLAYERS[2], p2: PLAYERS[5], score: '6-7, 6-3, 7-5', status: 'completed', date: 'Apr 28', court: 'Court 1' },
  { id: 'm7', league: 'l3', leagueName: 'Trójmiasto Premier', round: 'R1', p1: PLAYERS[0], p2: PLAYERS[8], score: '6-3, 6-4', status: 'completed', date: 'Apr 21', court: 'Sopot Centre', mine: true },
  { id: 'm8', league: 'l1', leagueName: 'Warszawa Open', round: 'R1', p1: PLAYERS[0], p2: PLAYERS[10], score: '6-1, 6-2', status: 'completed', date: 'Apr 14', court: 'Court 4', mine: true },
  { id: 'm9', league: 'l1', leagueName: 'Warszawa Open', round: 'R4', p1: PLAYERS[1], p2: PLAYERS[6], score: '— vs —', status: 'pending_confirm', date: 'May 5', court: 'Court 1' },
];

export const BRACKET_8 = {
  rounds: [
    { name: 'Quarterfinals', matches: [
      { id: 'qf1', p1: { ...PLAYERS[0], seed: 1 }, p2: { ...PLAYERS[7], seed: 8 }, scores: [6,6], oscores: [3,4], winner: 'p1', mine: true },
      { id: 'qf2', p1: { ...PLAYERS[3], seed: 4 }, p2: { ...PLAYERS[4], seed: 5 }, scores: [4,6,6], oscores: [6,3,4], winner: 'p1' },
      { id: 'qf3', p1: { ...PLAYERS[2], seed: 3 }, p2: { ...PLAYERS[5], seed: 6 }, scores: [7,6], oscores: [5,2], winner: 'p1' },
      { id: 'qf4', p1: { ...PLAYERS[1], seed: 2 }, p2: { ...PLAYERS[6], seed: 7 }, scores: [6,4,6], oscores: [3,6,4], winner: 'p1' },
    ]},
    { name: 'Semifinals', matches: [
      { id: 'sf1', p1: { ...PLAYERS[0], seed: 1 }, p2: { ...PLAYERS[3], seed: 4 }, scores: [6,4,6], oscores: [3,6,2], winner: 'p1', mine: true },
      { id: 'sf2', p1: { ...PLAYERS[2], seed: 3 }, p2: { ...PLAYERS[1], seed: 2 }, scores: [3,6], oscores: [6,4], pending: true },
    ]},
    { name: 'Final', matches: [
      { id: 'f1', p1: { ...PLAYERS[0], seed: 1 }, p2: { name: 'TBD', avatar: '', seed: '' }, scores: [], oscores: [], tbd: true, mine: true },
    ]},
  ],
};

export const NOTIFICATIONS = [
  { id: 'n1', type: 'match', title: 'Match scheduled', body: "You're playing Hanna Kowalczyk on Court 2, Tue May 12 at 18:00", time: '12 min ago', read: false },
  { id: 'n2', type: 'result', title: 'Result needs confirmation', body: 'Marek Lewandowski reported 7-5, 4-6, 6-2 vs Aleksandra. Please confirm.', time: '1 hr ago', read: false },
  { id: 'n3', type: 'standings', title: 'You moved up to #1', body: 'In Warszawa Open Spring 2026 — congrats!', time: '4 hr ago', read: false },
  { id: 'n4', type: 'invite', title: 'New tournament invite', body: 'Mazovia Spring Cup 2026 — entry open until May 18', time: 'Yesterday', read: true },
  { id: 'n5', type: 'message', title: 'Announcement from Trójmiasto Premier', body: 'Court change for next weekend — see details', time: '2 days ago', read: true },
  { id: 'n6', type: 'match', title: 'Match completed', body: 'You won 6-2, 6-1 vs Natalia Zielińska', time: '1 week ago', read: true },
];

export const ANNOUNCEMENTS = [
  { id: 'a1', from: 'Warszawa Tennis Club', subject: 'Court schedule update for May', preview: "Due to weather forecasts we've moved 6 matches indoor. Affected players will get individual notifications…", time: 'May 5', unread: true, color: '#1f5b3f' },
  { id: 'a2', from: 'Trójmiasto Premier League', subject: 'New sponsor: Yonex Polska', preview: "We're thrilled to announce our 2026 string sponsor. All league participants get 30% off restringing…", time: 'May 3', unread: true, color: '#c9542b' },
  { id: 'a3', from: 'Mazovia Cup organizer', subject: 'Welcome packet & schedule', preview: 'Your Mazovia Spring Cup welcome pack is ready. Pickup at Court 1 reception starting May 21 at 8 AM…', time: 'Apr 30', unread: false, color: '#3b4942' },
  { id: 'a4', from: 'CourtZone team', subject: 'New: bulk match scheduling', preview: 'Organizers can now schedule a full round in one go. Open any league and try the new "Schedule round" button…', time: 'Apr 28', unread: false, color: '#2e7a55' },
  { id: 'a5', from: 'Kraków Ladder Series', subject: 'Challenge window closes Friday', preview: 'Reminder — you have until Friday 23:59 to challenge anyone within 4 spots above you in the ladder…', time: 'Apr 24', unread: false, color: '#b8860b' },
];

export const ORGANIZATIONS = [
  { id: 'o1', name: 'Warszawa Tennis Club', leagues: 3, tournaments: 2, members: 248, color: '#1f5b3f' },
  { id: 'o2', name: 'Trójmiasto Tennis', leagues: 2, tournaments: 1, members: 184, color: '#c9542b' },
  { id: 'o3', name: 'Kraków TKKF', leagues: 1, tournaments: 3, members: 122, color: '#b8860b' },
  { id: 'o4', name: 'Poznań Tennis Academy', leagues: 1, tournaments: 1, members: 96, color: '#2e7a55' },
];

export const ACTIVITY = [
  { id: 'ac1', who: 'Marek Lewandowski', what: 'submitted match result', when: '2 min ago' },
  { id: 'ac2', who: 'Hanna Kowalczyk', what: 'joined Mazovia Spring Cup', when: '14 min ago' },
  { id: 'ac3', who: 'Trójmiasto Premier', what: 'created new round', when: '38 min ago' },
  { id: 'ac4', who: 'Tomasz Nowak', what: 'confirmed match result', when: '1 hr ago' },
  { id: 'ac5', who: 'Aleksandra Mazur', what: 'opted out of match', when: '2 hr ago' },
  { id: 'ac6', who: 'Bartłomiej Szymański', what: 'registered via QR', when: '3 hr ago' },
];

export const TL_DATA = {
  PLAYERS, LEAGUES, TOURNAMENTS, STANDINGS, MATCHES, BRACKET_8,
  NOTIFICATIONS, ANNOUNCEMENTS, ORGANIZATIONS, ACTIVITY,
};
