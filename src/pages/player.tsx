// @ts-nocheck
import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Icon } from '@/lib/icons';
import {
  Avatar, Stat, Chip, Btn, Field, Card, PhotoBox, Tabs, PillGroup,
  QRGlyph, ScoreInput, MatchRow, EntityCard, Bracket, Phone, PhoneTabBar,
  Sparkline, Bars, PageHeader,
} from '@/components/courtzone/atoms';
import { TL_DATA } from '@/lib/mock-data';
import { LiveBadge, ViewerBadge, FeaturedLive } from './live';


// Player pages 20-26: My competitions, League player view, Tournament player view,
// Match result entry, Match history, My profile, Public profile

const MyCompetitions = ({ navigate }) => {
  const D = TL_DATA;
  const [tab, setTab] = useState('overview');
  const me = D.PLAYERS[0];

  // Mock data for the hub experience
  const myComps = [
    ...D.LEAGUES.filter(l => l.status === 'active').slice(0, 2).map(l => ({ ...l, kind: 'league' })),
    ...D.TOURNAMENTS.filter(t => t.status === 'active').slice(0, 1).map(t => ({ ...t, kind: 'tournament' })),
    ...D.LEAGUES.filter(l => l.status === 'upcoming').slice(0, 1).map(l => ({ ...l, kind: 'league' })),
  ];

  // Matches awaiting scheduling — opponent offered time slots
  const schedulingMatches = [
    { id: 'sm1', league: 'Warszawa Open Spring', round: 'R4', opponent: D.PLAYERS[2], proposedBy: 'opponent',
      slots: [
        { id: 's1', date: 'Tue · May 12', time: '18:00', court: 'Polna · Court 2' },
        { id: 's2', date: 'Wed · May 13', time: '19:30', court: 'Polna · Court 1' },
        { id: 's3', date: 'Sat · May 16', time: '10:00', court: 'Polna · Court 3' },
      ]},
    { id: 'sm2', league: 'Trójmiasto Premier', round: 'R2', opponent: D.PLAYERS[5], proposedBy: 'me',
      slots: [
        { id: 's1', date: 'Sat · May 18', time: '14:00', court: 'Sopot Centre · Court 1' },
        { id: 's2', date: 'Sun · May 19', time: '11:00', court: 'Sopot Centre · Court 2' },
      ]},
  ];

  // Confirmed upcoming matches
  const upcomingMatches = D.MATCHES.filter(m => m.status === 'scheduled' && m.mine);

  // Results that need YOUR confirmation (opponent submitted)
  const resultsToConfirm = [
    { id: 'rc1', league: 'Warszawa Open Spring', round: 'R3', opponent: D.PLAYERS[3],
      score: '6-4, 6-3', submittedBy: D.PLAYERS[3].name, hoursLeft: 18, iWon: false },
  ];

  // Results I submitted, awaiting opponent (auto-confirm in 24h)
  const awaitingOpponent = [
    { id: 'ao1', league: 'Warszawa Open Spring', round: 'R2', opponent: D.PLAYERS[6],
      score: '6-2, 6-1', hoursLeft: 9, iWon: true },
  ];

  const enterResult = (m) => { window.TL_SELECTED_MATCH = m; navigate('p_match_entry'); };

  return (
    <div className="page page--wide">
      <PageHeader
        eyebrow="My play"
        title="My leagues & cups."
        sub={`${myComps.length} competitions · ${upcomingMatches.length} upcoming · ${resultsToConfirm.length} awaiting your confirmation.`}
        action={<Btn variant="primary" icon="qr" onClick={()=>navigate('u_qr')}>Scan to join</Btn>}
      />

      <Tabs active={tab} onChange={setTab} tabs={[
        { id:'overview', label:'Overview' },
        { id:'comps', label:'My competitions', count: myComps.length },
        { id:'matches', label:'Matches', count: upcomingMatches.length + schedulingMatches.length },
        { id:'results', label:'Results', count: resultsToConfirm.length + awaitingOpponent.length },
      ]}/>

      {tab === 'overview' && (
        <div style={{ display:'grid', gap: 20 }}>
          {/* Top: stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12 }}>
            <Stat label="Active competitions" value={myComps.length}/>
            <Stat label="To schedule" value={schedulingMatches.length}/>
            <Stat label="Upcoming matches" value={upcomingMatches.length}/>
            <Stat label="Pending confirmations" value={resultsToConfirm.length + awaitingOpponent.length}/>
          </div>

          {/* Scheduling requests */}
          {schedulingMatches.length > 0 && (
            <Card title="Confirm match date & time" action={<Chip tone="warn" dot>{schedulingMatches.length} pending</Chip>}>
              <div style={{ display:'grid', gap: 14 }}>
                {schedulingMatches.map(sm => <ScheduleMatchCard key={sm.id} m={sm}/>)}
              </div>
            </Card>
          )}

          {/* Results to confirm */}
          {resultsToConfirm.length > 0 && (
            <Card title="Results awaiting your confirmation" action={<Chip tone="bad" dot>Action needed</Chip>}>
              <div style={{ display:'grid', gap: 10 }}>
                {resultsToConfirm.map(r => <ConfirmResultRow key={r.id} r={r}/>)}
              </div>
            </Card>
          )}

          {/* Upcoming + enter result */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16 }}>
            <Card title="Upcoming matches">
              {upcomingMatches.length === 0
                ? <div className="muted" style={{ fontSize: 13 }}>Nothing scheduled yet.</div>
                : upcomingMatches.map(m => <MatchRow key={m.id} m={m} onClick={()=>enterResult(m)}/>)}
            </Card>
            <Card title="Awaiting opponent confirmation" action={<Chip>Auto-confirm 24h</Chip>}>
              {awaitingOpponent.length === 0
                ? <div className="muted" style={{ fontSize: 13 }}>No pending results.</div>
                : awaitingOpponent.map(r => <AwaitingOpponentRow key={r.id} r={r}/>)}
            </Card>
          </div>

          {/* My competitions */}
          <Card title="My competitions" action={<Btn variant="ghost" size="sm" onClick={()=>setTab('comps')}>View all</Btn>}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
              {myComps.slice(0, 3).map(e => (
                <EntityCard key={e.id} e={e} kind={e.kind}
                  onClick={()=>navigate(e.kind==='tournament'?'p_tournament_detail':'p_league_detail', { id: e.id })}/>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'comps' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
          {myComps.map(e => (
            <EntityCard key={e.id} e={e} kind={e.kind}
              onClick={()=>navigate(e.kind==='tournament'?'p_tournament_detail':'p_league_detail', { id: e.id })}/>
          ))}
        </div>
      )}

      {tab === 'matches' && (
        <div style={{ display:'grid', gap: 20 }}>
          {schedulingMatches.length > 0 && (
            <Card title="To schedule">
              <div style={{ display:'grid', gap: 14 }}>
                {schedulingMatches.map(sm => <ScheduleMatchCard key={sm.id} m={sm}/>)}
              </div>
            </Card>
          )}
          <Card title="Upcoming (confirmed)">
            {upcomingMatches.length === 0
              ? <div className="muted" style={{ fontSize: 13 }}>No upcoming matches.</div>
              : <div style={{ display:'grid', gap: 8 }}>
                  {upcomingMatches.map(m => (
                    <div key={m.id} className="row" style={{ gap: 10, padding: 12, borderTop:'1px solid var(--line)', alignItems:'center' }}>
                      <div className="grow">
                        <MatchRow m={m}/>
                      </div>
                      <Btn variant="primary" size="sm" icon="plus" onClick={()=>enterResult(m)}>Enter result</Btn>
                    </div>
                  ))}
                </div>
            }
          </Card>
        </div>
      )}

      {tab === 'results' && (
        <div style={{ display:'grid', gap: 20 }}>
          {resultsToConfirm.length > 0 && (
            <Card title="Awaiting your confirmation">
              <div style={{ display:'grid', gap: 10 }}>
                {resultsToConfirm.map(r => <ConfirmResultRow key={r.id} r={r}/>)}
              </div>
            </Card>
          )}
          {awaitingOpponent.length > 0 && (
            <Card title="Awaiting opponent" action={<Chip>Auto-confirm at 24h</Chip>}>
              <div style={{ display:'grid', gap: 10 }}>
                {awaitingOpponent.map(r => <AwaitingOpponentRow key={r.id} r={r}/>)}
              </div>
            </Card>
          )}
          <Card title="Recent completed">
            {D.MATCHES.filter(m => m.status==='completed' && m.mine).map(m => <MatchRow key={m.id} m={m}/>)}
          </Card>
        </div>
      )}
    </div>
  );
};

// Sub-component: opponent (or you) proposed 2-3 time slots, pick one
const ScheduleMatchCard = ({ m }: any) => {
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  if (done) {
    const slot = m.slots.find(s => s.id === selected);
    return (
      <div className="row" style={{ gap: 12, padding: 12, borderRadius: 10, background:'color-mix(in srgb, var(--good) 8%, transparent)', alignItems:'center' }}>
        <Icon name="check" size={18}/>
        <div className="grow">
          <div style={{ fontWeight: 700, fontSize: 13 }}>{m.league} · {m.round} vs {m.opponent.name}</div>
          <div className="muted" style={{ fontSize: 12 }}>Locked: {slot?.date} at {slot?.time} · {slot?.court}</div>
        </div>
        <Chip tone="good" dot>Confirmed</Chip>
      </div>
    );
  }
  return (
    <div style={{ padding: 14, border:'1px solid var(--line)', borderRadius: 12 }}>
      <div className="row" style={{ gap: 10, marginBottom: 10, alignItems:'center' }}>
        <Avatar src={m.opponent.avatar} name={m.opponent.name} size={36}/>
        <div className="grow">
          <div style={{ fontWeight: 700, fontSize: 14 }}>{m.opponent.name}</div>
          <div className="muted" style={{ fontSize: 12 }}>{m.league} · {m.round}</div>
        </div>
        <Chip tone={m.proposedBy === 'opponent' ? 'warn' : 'primary'}>
          {m.proposedBy === 'opponent' ? 'Opponent proposed' : 'You proposed'}
        </Chip>
      </div>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Pick one option</div>
      <div style={{ display:'grid', gap: 8 }}>
        {m.slots.map(s => (
          <label key={s.id} className="row" style={{ gap: 10, padding: 10, borderRadius: 8,
            border: selected === s.id ? '2px solid var(--primary)' : '1px solid var(--line)',
            cursor:'pointer', alignItems:'center' }}>
            <input type="radio" name={`slot-${m.id}`} checked={selected === s.id} onChange={()=>setSelected(s.id)}/>
            <Icon name="calendar" size={14}/>
            <div className="grow">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{s.date} · {s.time}</div>
              <div className="muted" style={{ fontSize: 11 }}>{s.court}</div>
            </div>
          </label>
        ))}
      </div>
      <div className="row" style={{ gap: 8, marginTop: 12, justifyContent:'flex-end' }}>
        <Btn variant="ghost" size="sm">Suggest other times</Btn>
        <Btn variant="primary" size="sm" disabled={!selected} iconRight="check" onClick={()=>setDone(true)}>Confirm slot</Btn>
      </div>
    </div>
  );
};

const ConfirmResultRow = ({ r }: any) => {
  const [done, setDone] = useState(null); // 'confirmed' | 'disputed' | null
  if (done === 'confirmed') {
    return <div className="row" style={{ gap: 10, padding: 12, borderRadius: 10, background:'color-mix(in srgb, var(--good) 8%, transparent)', alignItems:'center' }}>
      <Icon name="check" size={16}/><div className="grow" style={{ fontSize: 13 }}>Result confirmed · standings updated.</div>
    </div>;
  }
  if (done === 'disputed') {
    return <div className="row" style={{ gap: 10, padding: 12, borderRadius: 10, background:'color-mix(in srgb, var(--bad) 8%, transparent)', alignItems:'center' }}>
      <Icon name="flash" size={16}/><div className="grow" style={{ fontSize: 13 }}>Marked as disputed · captain notified.</div>
    </div>;
  }
  return (
    <div className="row" style={{ gap: 12, padding: 12, borderRadius: 10, border:'1px solid var(--line)', alignItems:'center' }}>
      <Avatar src={r.opponent.avatar} name={r.opponent.name} size={36}/>
      <div className="grow" style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{r.opponent.name} reported <span className="mono">{r.score}</span></div>
        <div className="muted" style={{ fontSize: 12 }}>{r.league} · {r.round} · Auto-confirms in {r.hoursLeft}h</div>
      </div>
      <Btn variant="ghost" size="sm" onClick={()=>setDone('disputed')}>Dispute</Btn>
      <Btn variant="primary" size="sm" icon="check" onClick={()=>setDone('confirmed')}>Confirm</Btn>
    </div>
  );
};

const AwaitingOpponentRow = ({ r }: any) => (
  <div className="row" style={{ gap: 12, padding: 12, borderRadius: 10, border:'1px solid var(--line)', alignItems:'center' }}>
    <Avatar src={r.opponent.avatar} name={r.opponent.name} size={36}/>
    <div className="grow" style={{ minWidth: 0 }}>
      <div style={{ fontWeight: 700, fontSize: 13 }}>vs {r.opponent.name} · <span className="mono">{r.score}</span></div>
      <div className="muted" style={{ fontSize: 12 }}>{r.league} · {r.round} · Auto-confirms in {r.hoursLeft}h if no response</div>
    </div>
    <Chip tone={r.iWon ? 'good' : 'bad'} dot>{r.iWon ? 'You won' : 'You lost'}</Chip>
    <Btn variant="ghost" size="sm" icon="bell">Nudge</Btn>
  </div>
);

// Stable per-league reordering so each joined league shows its own table
const orderForLeague = (id: string, n: number) => {
  let h = 0; for (const c of String(id || '')) h = (h * 31 + c.charCodeAt(0)) % 9973;
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = (h * 9301 + 49297) % 233280;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
};

const EmptyState = ({ title, hint, onRetry }: any) => (
  <div style={{ padding: '40px 20px', textAlign: 'center', display:'grid', gap: 10, placeItems:'center' }}>
    <div style={{ width: 48, height: 48, borderRadius: '50%', background:'var(--bg-2)', display:'grid', placeItems:'center' }}>
      <Icon name="flash" size={20}/>
    </div>
    <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
    {hint && <div className="muted" style={{ fontSize: 12, maxWidth: 360 }}>{hint}</div>}
    <Btn variant="soft" size="sm" icon="refresh" onClick={onRetry}>Try again</Btn>
  </div>
);

const LeagueStandings = ({ league }: any) => {
  const D = TL_DATA;
  const [nonce, setNonce] = useState(0);
  const hasData = !!league?.id && Array.isArray(D.STANDINGS) && D.STANDINGS.length > 0;
  const order = useMemo(
    () => (hasData ? orderForLeague(league.id, D.STANDINGS.length) : []),
    [league?.id, hasData, nonce]
  );
  const rows = order.map((i, rank) => ({ ...D.STANDINGS[i], rank }));
  const [sort, setSort] = useState('pts');
  return (
    <Card title={`Standings · ${league?.name || ''}`} pad={false} action={<>
      <Btn variant="soft" size="sm" icon="filter">Filter</Btn>
      <Btn variant="soft" size="sm" icon="download">Export</Btn>
    </>}>
      {!hasData ? (
        <EmptyState
          title="No standings yet"
          hint="This league hasn't generated a standings table yet. Once matches are played, results will appear here."
          onRetry={() => setNonce(n => n + 1)}
        />
      ) : (
        <div style={{ overflow:'auto' }}>
          <table className="tbl">
            <thead><tr>
              <th>#</th><th>Player</th><th>City</th>
              {[['played','MP'],['wins','W'],['losses','L'],['sets_w','SW'],['sets_l','SL'],['pts','PTS']].map(([k,l]) => (
                <th key={k} style={{ cursor:'pointer' }} onClick={()=>setSort(k)}>{l} {sort===k && '↓'}</th>
              ))}
              <th>Form</th>
            </tr></thead>
            <tbody>
              {rows.map((p, i) => {
                const me = i === 3;
                return (
                  <tr key={p.id} style={me ? { background:'color-mix(in srgb, var(--primary) 8%, transparent)' } : {}}>
                    <td><span className="rank">{i+1}</span></td>
                    <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><div><div style={{ fontWeight: 600 }}>{p.name}{me && <span className="muted" style={{ fontSize:11, marginLeft:6 }}>(you)</span>}</div><div className="muted mono" style={{ fontSize: 10 }}>#{p.rating}</div></div></div></td>
                    <td className="muted">{p.city}</td>
                    <td className="num">{p.played}</td>
                    <td className="num">{p.wins}</td>
                    <td className="num">{p.losses}</td>
                    <td className="num">{p.sets_w}</td>
                    <td className="num">{p.sets_l}</td>
                    <td className="num"><b style={{ fontSize: 14 }}>{p.pts}</b></td>
                    <td><div className="row" style={{ gap: 2 }}>{['W','W','L','W','W'].map((r, j) => <span key={j} className="mono" style={{ width: 14, height: 14, fontSize: 9, display:'grid', placeItems:'center', borderRadius: 3, background: r==='W'?'var(--good)':'var(--bad)', color:'white', fontWeight: 700 }}>{r}</span>)}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

const Ladder = ({ league }: any) => {
  const D = TL_DATA;
  const [nonce, setNonce] = useState(0);
  const hasData = !!league?.id && Array.isArray(D.STANDINGS) && D.STANDINGS.length > 0;
  const order = useMemo(
    () => (hasData ? orderForLeague(league.id, D.STANDINGS.length) : []),
    [league?.id, hasData, nonce]
  );
  const rows = order.map(i => D.STANDINGS[i]);
  return (
    <Card title={`Ladder · ${league?.name || ''}`} pad={false} action={<Btn variant="soft" size="sm" icon="flash">Challenge a player</Btn>}>
      {!hasData ? (
        <EmptyState
          title="Ladder not ready"
          hint="No ranked players found for this ladder yet. Check back after the first challenges are played."
          onRetry={() => setNonce(n => n + 1)}
        />
      ) : (
        <table className="tbl">
          <thead><tr><th>Rank</th><th>Player</th><th>City</th><th className="num">Rating</th><th className="num">W–L</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((p, i) => {
              const me = i === 3;
              const challengeable = Math.abs(i - 3) <= 4 && !me;
              return (
                <tr key={p.id} style={me ? { background:'color-mix(in srgb, var(--primary) 8%, transparent)' } : {}}>
                  <td><span className="rank">{i+1}</span></td>
                  <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><div><div style={{ fontWeight: 600 }}>{p.name}{me && <span className="muted" style={{ fontSize:11, marginLeft:6 }}>(you)</span>}</div></div></div></td>
                  <td className="muted">{p.city}</td>
                  <td className="num mono">{p.rating}</td>
                  <td className="num">{p.wins}–{p.losses}</td>
                  <td>{me ? <Chip tone="primary" dot>You</Chip> : challengeable ? <Chip tone="good">Challengeable</Chip> : <Chip>—</Chip>}</td>
                  <td>{challengeable && <Btn variant="ghost" size="sm" icon="flash">Challenge</Btn>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Card>
  );
};

const RecentResults = ({ leagueId }: any) => {
  const D = TL_DATA;
  const [range, setRange] = useState('week');
  const all = D.MATCHES.filter(m => m.status === 'completed' && (!leagueId || m.league === leagueId));
  return (
    <Card title="Recent results" action={
      <PillGroup value={range} onChange={setRange} options={[
        {value:'week', label:'This week'},
        {value:'weekend', label:'Weekend'},
        {value:'month', label:'Month'},
      ]}/>
    }>
      {all.length === 0
        ? <div className="muted" style={{ fontSize: 13 }}>No completed matches in this range.</div>
        : <div style={{ display:'grid', gap: 8 }}>
            {all.map(m => <MatchRow key={m.id} m={m} mineHighlight/>)}
          </div>}
    </Card>
  );
};

const LeagueDetailPlayer = ({ navigate, id }: any) => {
  const D = TL_DATA;
  const l = D.LEAGUES.find(x => x.id === id) || D.LEAGUES[0];
  const [tab, setTab] = useState('standings');
  const isLadder = (l.format || '').toLowerCase().includes('ladder');
  const myMatches = D.MATCHES.filter(m => m.mine && m.league === l.id);
  const allMatches = D.MATCHES.filter(m => m.league === l.id);

  const tabs = [
    isLadder ? { id:'ladder', label:'Ladder' } : { id:'standings', label:'Standings' },
    { id:'recent', label:'Recent results', count: allMatches.filter(m => m.status==='completed').length },
    { id:'mymatches', label:'My matches', count: myMatches.length },
    { id:'allmatches', label:'All matches', count: allMatches.length },
    { id:'rules', label:'Rules' },
  ];
  // ensure initial tab matches first tab id
  useEffect(() => { setTab(tabs[0].id); /* eslint-disable-next-line */ }, [l.id]);

  return (
    <div className="page page--wide">
      <div className="card" style={{ overflow:'hidden', marginBottom: 24 }}>
        <PhotoBox src={l.cover} ratio="auto" style={{ height: 200, borderRadius: 0 }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }}/>
          <div style={{ position:'absolute', inset: 0, padding: 28, display:'flex', flexDirection:'column', justifyContent:'space-between', color:'white' }}>
            <div className="row" style={{ gap: 8 }}>
              <Chip tone="good" dot>You're #4 · 22 pts</Chip>
              <Chip tone="primary">{l.format}</Chip>
              <Chip>{l.surface}</Chip>
            </div>
            <div>
              <div className="display" style={{ fontSize: 40 }}>{l.name}</div>
              <div className="row" style={{ gap: 18, marginTop: 6, fontSize: 13, opacity: 0.9 }}>
                <span>{l.org}</span><span>{l.players} players</span><span>{l.start} – {l.end}</span>
              </div>
            </div>
          </div>
        </PhotoBox>
        <div className="row between" style={{ padding: 16, flexWrap:'wrap', gap: 12 }}>
          <Tabs active={tab} onChange={setTab} tabs={tabs}/>
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="ghost" size="sm" icon="bell">Subscribe</Btn>
            <Btn variant="primary" size="sm" icon="plus" onClick={()=>navigate('p_match_entry')}>Enter result</Btn>
          </div>
        </div>
      </div>

      {tab === 'standings' && <LeagueStandings league={l}/>}
      {tab === 'ladder' && <Ladder league={l}/>}
      {tab === 'recent' && <RecentResults leagueId={l.id}/>}

      {tab === 'mymatches' && <Card title="My matches in this league">
        {myMatches.length === 0
          ? <div className="muted" style={{ fontSize: 13 }}>No matches yet.</div>
          : <div style={{ display:'grid', gap: 8 }}>
              {myMatches.map(m => <MatchRow key={m.id} m={m} onClick={()=>navigate('p_match_entry')}/>)}
            </div>}
      </Card>}

      {tab === 'allmatches' && <Card title="All league matches" action={<Chip>{allMatches.length} total</Chip>}>
        <div style={{ display:'grid', gap: 8 }}>
          {allMatches.map(m => <MatchRow key={m.id} m={m} mineHighlight={false}/>)}
        </div>
      </Card>}

      {tab === 'rules' && <Card title="League rules">
        <div style={{ fontSize: 14, lineHeight: 1.7, color:'var(--ink-2)' }}>
          <p><b>Format.</b> Round-robin across 12 weeks. Top 4 advance to single-elimination playoff Jun 7–14.</p>
          <p><b>Scoring.</b> Win = 3 pts. Loss in 3 sets = 1 pt. Walkover = 0 pts.</p>
          <p><b>Match format.</b> Best of 3 sets. Tie-break at 6-6 in regular sets, super tie-break to 10 if split 1-1.</p>
          <p><b>Walkovers.</b> Must be requested 24h in advance. Late requests = 0 pts.</p>
          <p><b>Disputes.</b> Resolved by referee on duty. If absent, captain decides — final.</p>
        </div>
      </Card>}
    </div>
  );
};

const TournamentDetailPlayer = ({ navigate, id }: any) => {
  const D = TL_DATA;
  const t = D.TOURNAMENTS.find(x => x.id === id) || D.TOURNAMENTS[0];
  const [tab, setTab] = useState('bracket');
  const myMatches = D.MATCHES.filter(m => m.mine).slice(0, 4);
  const allMatches = D.MATCHES;

  return (
    <div className="page page--wide">
      <div className="card" style={{ overflow:'hidden', marginBottom: 24 }}>
        <PhotoBox src={t.cover} ratio="auto" style={{ height: 200, borderRadius: 0 }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }}/>
          <div style={{ position:'absolute', padding: 28, inset: 0, color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <Chip tone="accent" dot>Your next match: SF · Sat 14:00 vs winner of QF3</Chip>
            <div>
              <div className="display" style={{ fontSize: 40 }}>{t.name}</div>
              <div className="row" style={{ gap: 18, marginTop: 6, fontSize: 13, opacity: 0.9 }}>
                <span>{t.city} · {t.surface}</span><span>{t.date}</span><span>Seed #1</span>
              </div>
            </div>
          </div>
        </PhotoBox>
        <div className="row between" style={{ padding: 16, flexWrap:'wrap', gap: 12 }}>
          <Tabs active={tab} onChange={setTab} tabs={[
            { id:'bracket', label:'Bracket' },
            { id:'mymatches', label:'My matches', count: myMatches.length },
            { id:'allmatches', label:'All matches', count: allMatches.length },
            { id:'recent', label:'Recent results' },
            { id:'info', label:'Info' },
          ]}/>
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="ghost" size="sm" iconRight="bracket" onClick={()=>navigate('p_tournament_bracket', { id: t.id })}>Open full bracket</Btn>
            <Btn variant="primary" size="sm" icon="plus" onClick={()=>navigate('p_match_entry')}>Enter result</Btn>
          </div>
        </div>
      </div>

      {tab === 'bracket' && (
        <Card title={`Bracket · ${t.name} — your path highlighted`}>
          <Bracket data={D.BRACKET_8}/>
        </Card>
      )}

      {tab === 'mymatches' && (
        <Card title="Your matches">
          <div style={{ display:'grid', gap: 8 }}>
            {myMatches.map(m => <MatchRow key={m.id} m={m} onClick={()=>navigate('p_match_entry')}/>)}
          </div>
        </Card>
      )}

      {tab === 'allmatches' && (
        <Card title="All tournament matches" action={<Chip>{allMatches.length} total</Chip>}>
          <div style={{ display:'grid', gap: 8 }}>
            {allMatches.map(m => <MatchRow key={m.id} m={m} mineHighlight/>)}
          </div>
        </Card>
      )}

      {tab === 'recent' && <RecentResults/>}

      {tab === 'info' && (
        <Card title="Tournament info">
          <div style={{ display:'grid', gap: 10, fontSize: 13 }}>
            <div className="row between"><span className="muted">Format</span><b>{t.format}</b></div>
            <div className="row between"><span className="muted">Surface</span><b>{t.surface}</b></div>
            <div className="row between"><span className="muted">Match format</span><b>Best of 3, super TB at 1-1</b></div>
            <div className="row between"><span className="muted">Prize pool</span><b>2,500 zł</b></div>
            <div className="row between"><span className="muted">Referee</span><b>Mr. Marek Jankowski</b></div>
            <div className="row between"><span className="muted">Court assignment</span><b>Court 1 (Centre)</b></div>
          </div>
        </Card>
      )}
    </div>
  );
};

const MatchResultEntry = ({ navigate }) => {
  const D = TL_DATA;
  const sel = typeof window !== 'undefined' ? window.TL_SELECTED_MATCH : null;
  const m = sel || { ...D.MATCHES[2], surface: 'Clay', court: 'Court 2' };
  const isFemale = /a$/i.test((m.p1.name || '').split(' ')[0]);
  const defaultSets = isFemale ? 2 : 3;
  const maxSets = defaultSets + 1;
  const [scores, setScores] = useState(
    Array.from({ length: defaultSets }, () => [0, 0])
  );
  const updateScore = (idx, side, v) =>
    setScores(scores.map((s, i) => (i === idx ? (side === 0 ? [v, s[1]] : [s[0], v]) : s)));
  const removeSet = (idx) => setScores(scores.filter((_, i) => i !== idx));
  const addSet = () => scores.length < maxSets && setScores([...scores, [0, 0]]);
  const surfaceKey = (m.surface || 'Clay').toLowerCase();
  const courtLabel = `${m.surface || 'Clay'} · ${m.court || 'Court 2'}`;
  return (
    <div className="page page--narrow">
      <PageHeader eyebrow={`${m.leagueName} · ${m.round} · ${m.surface || 'Clay'}`} title="Enter match result." sub="Your opponent will get a notification to confirm. Both must agree before standings update."/>
      <Card>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap: 24, alignItems:'center', marginBottom: 24 }}>
          <div style={{ textAlign:'center' }}>
            <Avatar src={m.p1.avatar} name={m.p1.name} size={80}/>
            <div style={{ fontWeight: 700, marginTop: 10 }}>{m.p1.name}</div>
            <div className="muted mono" style={{ fontSize: 11 }}>#{m.p1.rating}</div>
            <Chip tone="primary" style={{ marginTop: 6 }}>You</Chip>
          </div>
          <div className="display" style={{ fontSize: 32, color:'var(--ink-3)' }}>vs</div>
          <div style={{ textAlign:'center' }}>
            <Avatar src={m.p2.avatar} name={m.p2.name} size={80}/>
            <div style={{ fontWeight: 700, marginTop: 10 }}>{m.p2.name}</div>
            <div className="muted mono" style={{ fontSize: 11 }}>#{m.p2.rating}</div>
            <Chip style={{ marginTop: 6 }}>Opponent</Chip>
          </div>
        </div>

        <div className="set-scores-court" data-surface={surfaceKey}>
          <div className="surface-tag">{courtLabel}</div>
          <div className="eyebrow">Set scores</div>
          <div style={{ display:'grid', gap: 10, marginTop: 12 }}>
            {scores.map((pair, idx) => {
              const isLast = idx === maxSets - 1;
              return (
                <div key={idx} style={{ display:'grid', gridTemplateColumns:'60px 1fr 96px', gap: 16, alignItems:'center' }}>
                  <div className="mono muted" style={{ fontSize: 11, textAlign:'right' }}>SET {idx + 1}</div>
                  <div className="row" style={{ gap: 12, alignItems:'center', justifyContent:'center' }}>
                    <ScoreInput value={pair[0]} onChange={v => updateScore(idx, 0, v)}/>
                    <span className="muted">—</span>
                    <ScoreInput value={pair[1]} onChange={v => updateScore(idx, 1, v)}/>
                  </div>
                  <div className="row" style={{ justifyContent:'flex-end', alignItems:'center', gap: 6 }}>
                    {isLast
                      ? <Chip tone="warn">Super TB</Chip>
                      : <button className="icon-btn" style={{ width: 28, height: 28 }} onClick={() => removeSet(idx)}><Icon name="trash" size={12}/></button>}
                  </div>
                </div>
              );
            })}
          </div>
          {scores.length < maxSets && (
            <div className="row" style={{ justifyContent:'center', marginTop: 14 }}>
              <Btn variant="ghost" size="sm" icon="plus" onClick={addSet}>Add set</Btn>
            </div>
          )}
        </div>

        <div style={{ marginTop: 18, display:'grid', gap: 14 }}>
          <Field label="Match duration">
            <div className="row" style={{ gap: 8 }}>
              <select className="select" defaultValue="1" style={{ flex: 1 }}>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={i}>{i} h</option>
                ))}
              </select>
              <select className="select" defaultValue="47" style={{ flex: 1 }}>
                {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                  <option key={m} value={m}>{m.toString().padStart(2,'0')} min</option>
                ))}
              </select>
            </div>
          </Field>

          <div style={{ background:'color-mix(in srgb, var(--good) 10%, transparent)', borderRadius: 12, padding: '16px 20px', fontSize: 16, fontWeight: 600, color: 'var(--good)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 22 }}>🎾</span>
            <span>Nice match! <b>6-4, 3-6, 7-5</b> — 🏆 <b>Iga Górski</b> takes it! 🔥</span>
          </div>
        </div>

        <div className="row" style={{ marginTop: 22, gap: 8, justifyContent:'flex-end' }}>
          <Btn variant="ghost" onClick={()=>navigate('p_dashboard')}>Cancel</Btn>
          <Btn variant="soft">Save draft</Btn>
          <Btn variant="primary" iconRight="send" onClick={()=>navigate('p_dashboard')}>Submit & notify Hanna</Btn>
        </div>
      </Card>
    </div>
  );
};

const MatchHistory = ({ navigate }) => {
  const D = TL_DATA;
  const all = [...D.MATCHES.filter(m => m.status==='completed'), ...D.MATCHES.filter(m => m.status==='completed')].slice(0,12);
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Personal record" title="Match history." sub="Every match you've played, ever. Filter by league, opponent, or surface."
        action={<Btn variant="ghost" icon="download">Export CSV</Btn>}/>
      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap:'wrap' }}>
        <PillGroup value="all" onChange={()=>{}} options={[{value:'all',label:'All'},{value:'wins',label:'Wins'},{value:'losses',label:'Losses'}]}/>
        <Btn variant="soft" size="sm" icon="filter">League</Btn>
        <Btn variant="soft" size="sm" icon="filter">Surface</Btn>
        <Btn variant="soft" size="sm" icon="calendar">Date range</Btn>
        <div className="grow"/>
        <PillGroup value="list" onChange={()=>{}} options={[{value:'list',label:'List'},{value:'tl',label:'Timeline'}]}/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <Stat label="Career win rate" value="74%"/>
        <Stat label="Career matches" value="248"/>
        <Stat label="Best surface" value="Clay · 81%"/>
        <Stat label="Longest streak" value="11 wins"/>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>Date</th><th>Competition</th><th>Round</th><th>Opponent</th><th>Score</th><th>Surface</th><th>Result</th></tr></thead>
          <tbody>
            {all.map((m, i) => {
              const surface = i%3===0?'Clay':i%2?'Hard':'Indoor';
              const court = i%3===0?'Court 2':i%2?'Court 5':'Court 1 (Indoor)';
              const open = () => { window.TL_SELECTED_MATCH = { ...m, surface, court }; navigate('p_match_entry'); };
              return (
                <tr key={i} onClick={open} style={{ cursor:'pointer' }}>
                  <td className="muted mono" style={{ fontSize: 11 }}>{m.date}</td>
                  <td><b>{m.leagueName}</b></td>
                  <td>{m.round}</td>
                  <td><div className="row" style={{ gap: 8 }}><Avatar src={m.p2.avatar} name={m.p2.name} size={24}/>{m.p2.name}</div></td>
                  <td className="num" style={{ fontWeight: 700 }}>{m.score}</td>
                  <td>{surface}</td>
                  <td><Chip tone={m.score.startsWith('6')?'good':'bad'} dot>{m.score.startsWith('6')?'Won':'Lost'}</Chip></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MyProfile = ({ navigate }) => {
  const me = TL_DATA.PLAYERS[0];
  // Partner state — null | { stage: 'invited'|'incoming'|'confirmed', player }
  const [partner, setPartner] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('cz_partner') || 'null'); } catch { return null; }
  });
  React.useEffect(() => { localStorage.setItem('cz_partner', JSON.stringify(partner)); }, [partner]);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [partnerQuery, setPartnerQuery] = React.useState('');
  const candidates = TL_DATA.PLAYERS.slice(1, 8);
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Account" title="My profile." sub="Visible to other players. Edit any field — changes save automatically."/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap: 16 }}>
        <div style={{ display:'grid', gap: 16 }}>
          <Card>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap: 12 }}>
              <div style={{ position:'relative' }}>
                <Avatar src={me.avatar} name={me.name} size={120}/>
                <button className="icon-btn" style={{ position:'absolute', bottom: 0, right: 0, background:'var(--primary)', color:'var(--primary-ink)', borderColor:'var(--primary)' }}><Icon name="camera" size={14}/></button>
              </div>
              <div>
                <div className="h2">{me.name}</div>
                <div className="muted">{me.city}</div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Chip tone="primary">Player</Chip>
                <Chip tone="accent">Organizer · WTC</Chip>
              </div>
            </div>
          </Card>
          <Card title="Career stats">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
              <Stat label="Rating" value={me.rating}/>
              <Stat label="W / L" value={`${me.w}/${me.l}`}/>
              <Stat label="Win rate" value="74%"/>
              <Stat label="Streak" value="W3"/>
            </div>
          </Card>
        </div>
        <div style={{ display:'grid', gap: 16 }}>
          <Card title="Personal info">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              <Field label="Display name"><input className="input" defaultValue={me.name}/></Field>
              <Field label="Email / username"><input className="input" type="email" defaultValue={`${me.handle}@example.com`}/></Field>
              <Field label="Phone"><input className="input" type="tel" defaultValue="+48 600 000 000"/></Field>
              <Field label="City"><input className="input" defaultValue={me.city}/></Field>
              <Field label="Gender">
                <select className="select" defaultValue="female">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  
                </select>
              </Field>
              <Field label="Date of birth"><input className="input" type="date" defaultValue="1995-04-22"/></Field>
              <Field label="Years playing tennis"><input className="input" type="number" min="0" defaultValue="8"/></Field>
              <Field label="Skill level">
                <select className="select" defaultValue="Intermediate">
                  <option>Beginner</option>
                  <option>Improver</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Competitive</option>
                  <option>Pro</option>
                </select>
              </Field>
              <Field label="NTRP / UTR (optional)"><input className="input" placeholder="e.g. NTRP 4.0 / UTR 7"/></Field>
              <Field label="Racket hand"><select className="select"><option>Right</option><option>Left</option></select></Field>
              <Field label="Backhand"><select className="select"><option>One-handed</option><option>Two-handed</option></select></Field>
              <Field span={2} label="Bio"><textarea className="textarea" rows="3" defaultValue="Tournament regular at WTC. Prefer clay; my serve gets nasty after a third coffee."/></Field>
            </div>
          </Card>

          <Card title="Doubles partner" action={partner?.stage === 'confirmed' ? <Chip tone="good" dot>Active</Chip> : partner?.stage === 'invited' ? <Chip tone="warn" dot>Invite sent</Chip> : partner?.stage === 'incoming' ? <Chip tone="primary" dot>Invite received</Chip> : <Chip>None</Chip>}>
            {!partner && !pickerOpen && (
              <div className="row between" style={{ gap: 12 }}>
                <div className="muted" style={{ fontSize: 13 }}>Choose a partner to register together for doubles & mixed competitions. Both sides must accept.</div>
                <Btn variant="primary" icon="plus" onClick={()=>setPickerOpen(true)}>Invite partner</Btn>
              </div>
            )}
            {!partner && pickerOpen && (() => {
              const q = (partnerQuery || '').trim().toLowerCase();
              const filtered = q ? candidates.filter((p:any) => p.name.toLowerCase().includes(q) || (p.city||'').toLowerCase().includes(q)) : [];
              return (
              <div style={{ display:'grid', gap: 10 }}>
                <input className="input" placeholder="Search players by name, email or phone…" value={partnerQuery} onChange={(e)=>setPartnerQuery(e.target.value)} autoFocus/>
                {q ? (
                  <div style={{ display:'grid', gap: 6, maxHeight: 260, overflow:'auto' }}>
                    {filtered.length === 0 && <div className="muted" style={{ fontSize: 12, padding: 10 }}>No players match "{partnerQuery}".</div>}
                    {filtered.map((p:any) => (
                      <div key={p.id} className="row between" style={{ padding: 10, borderRadius: 10, border:'1px solid var(--line)' }}>
                        <div className="row" style={{ gap: 10 }}>
                          <Avatar src={p.avatar} name={p.name} size={32}/>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                            <div className="muted" style={{ fontSize: 11 }}>{p.city} · Rating {p.rating}</div>
                          </div>
                        </div>
                        <Btn size="sm" variant="primary" iconRight="send" onClick={()=>{ setPartner({ stage:'invited', player: p }); setPickerOpen(false); setPartnerQuery(''); }}>Send invite</Btn>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="muted" style={{ fontSize: 12, padding: '8px 2px' }}>Start typing a name to search players.</div>
                )}
                <div className="row" style={{ justifyContent:'flex-end' }}>
                  <Btn variant="ghost" onClick={()=>{ setPickerOpen(false); setPartnerQuery(''); }}>Cancel</Btn>
                </div>
              </div>
              );
            })()}
            {partner && (
              <div className="row between" style={{ gap: 12 }}>
                <div className="row" style={{ gap: 12 }}>
                  <Avatar src={partner.player.avatar} name={partner.player.name} size={44}/>
                  <div>
                    <div style={{ fontWeight: 700 }}>{partner.player.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {partner.stage === 'confirmed' && 'Partnership active — you can register together.'}
                      {partner.stage === 'invited' && 'Waiting for them to accept your invite.'}
                      {partner.stage === 'incoming' && `${partner.player.name.split(' ')[0]} invited you to be their partner.`}
                    </div>
                  </div>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {partner.stage === 'incoming' && <Btn variant="primary" size="sm" icon="check" onClick={()=>setPartner({ ...partner, stage:'confirmed' })}>Accept</Btn>}
                  {partner.stage === 'invited' && <Btn variant="soft" size="sm" onClick={()=>setPartner({ ...partner, stage:'confirmed' })}>Simulate accept</Btn>}
                  <Btn variant="ghost" size="sm" icon="x" onClick={()=>setPartner(null)}>{partner.stage === 'confirmed' ? 'Leave partnership' : 'Cancel'}</Btn>
                </div>
              </div>
            )}
          </Card>

          <Card title="Preferences">
            <div style={{ display:'grid', gap: 10 }}>
              <label className="checkbox"><input type="checkbox" defaultChecked/> Email me when a match is scheduled</label>
              <label className="checkbox"><input type="checkbox" defaultChecked/> Email me when an opponent submits a result</label>
              <label className="checkbox"><input type="checkbox" defaultChecked/> Push notifications for upcoming matches</label>
              <label className="checkbox"><input type="checkbox"/> Receive newsletter from CourtZone</label>
              <label className="checkbox"><input type="checkbox" defaultChecked/> Show my profile to non-club-members</label>
            </div>
          </Card>
          <Card title="Danger zone">
            <div className="row between">
              <div><div style={{ fontWeight: 600 }}>Delete account</div><div className="muted" style={{ fontSize: 12 }}>Permanent — match history will be anonymized.</div></div>
              <Btn variant="ghost">Delete</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PublicProfile = ({ navigate }) => {
  const p = TL_DATA.PLAYERS[2];
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <div className="card" style={{ overflow:'hidden', marginBottom: 24 }}>
        <PhotoBox src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1400&h=300&fit=crop" ratio="auto" style={{ height: 180, borderRadius: 0 }}/>
        <div style={{ padding: '0 28px 24px', display:'flex', gap: 24, alignItems:'flex-end', marginTop: -50 }}>
          <Avatar src={p.avatar} name={p.name} size={120} className="" />
          <div className="grow" style={{ paddingBottom: 6 }}>
            <div className="display" style={{ fontSize: 36 }}>{p.name}</div>
            <div className="muted">@{p.handle} · {p.city} · joined Apr 2024</div>
          </div>
          <Btn variant="ghost" icon="message">Message</Btn>
          <Btn variant="primary" icon="plus">Challenge</Btn>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap: 16 }}>
        <div style={{ display:'grid', gap: 16 }}>
          <Card title="Career">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
              <Stat label="Rating" value={p.rating}/>
              <Stat label="W / L" value={`${p.w}/${p.l}`}/>
              <Stat label="Win rate" value="65%"/>
              <Stat label="Best surface" value="Clay"/>
            </div>
          </Card>
          <Card title="Style">
            <div style={{ display:'grid', gap: 8, fontSize: 13 }}>
              <div className="row between"><span className="muted">Hand</span><b>Right</b></div>
              <div className="row between"><span className="muted">Backhand</span><b>One-handed</b></div>
              <div className="row between"><span className="muted">Plays</span><b>Aggressive baseline</b></div>
            </div>
          </Card>
        </div>
        <div style={{ display:'grid', gap: 16 }}>
          <Card title="Active competitions">
            <div style={{ display:'grid', gap: 10 }}>
              {D.LEAGUES.slice(0,3).map(l => (
                <div key={l.id} className="row" style={{ gap: 12 }}>
                  <div className="photo" style={{ width: 36, height: 36, backgroundImage:`url(${l.cover})`, backgroundSize:'cover', borderRadius: 8 }}/>
                  <div className="grow"><div style={{ fontWeight:600 }}>{l.name}</div><div className="muted" style={{ fontSize: 11 }}>Currently #{Math.floor(Math.random()*5)+2}</div></div>
                  <Chip tone="good" dot>Active</Chip>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Head-to-head with you">
            <div className="row" style={{ gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, padding: 14, background:'color-mix(in srgb, var(--good) 8%, transparent)', borderRadius: 10, textAlign:'center' }}>
                <div className="display" style={{ fontSize: 36, color:'var(--good)' }}>4</div>
                <div className="muted" style={{ fontSize: 11 }}>YOUR WINS</div>
              </div>
              <div style={{ flex: 1, padding: 14, background:'color-mix(in srgb, var(--bad) 8%, transparent)', borderRadius: 10, textAlign:'center' }}>
                <div className="display" style={{ fontSize: 36, color:'var(--bad)' }}>2</div>
                <div className="muted" style={{ fontSize: 11 }}>OPPONENT WINS</div>
              </div>
            </div>
            {D.MATCHES.slice(0,3).map(m => <MatchRow key={m.id} m={m} mineHighlight={false}/>)}
          </Card>
          <Card title="Recent matches">
            {D.MATCHES.filter(m=>m.status==='completed').slice(0,4).map(m => <MatchRow key={m.id} m={m} mineHighlight={false}/>)}
          </Card>
        </div>
      </div>
    </div>
  );
};

export { MyCompetitions, LeagueDetailPlayer, TournamentDetailPlayer, MatchResultEntry, MatchHistory, MyProfile, PublicProfile };