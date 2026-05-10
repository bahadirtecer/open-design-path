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
import { FacilityPicker } from '@/components/courtzone/FacilityPicker';

// Organizer pages 12-19: Create league, League detail, Standings, Match mgmt,
// Create tournament, Tournament detail, Bracket, Tournament match mgmt

const CreateLeague = ({ navigate }) => {
  const [format, setFormat] = useState('round-robin');
  const [step, setStep] = useState(1);
  const [facility, setFacility] = useState('');
  return (
    <div className="page page--narrow">
      <PageHeader
        eyebrow="New competition"
        title="Create a league."
        sub="We'll prefill sensible defaults — override anything. You can come back and edit before publishing."
        action={<Btn variant="ghost" onClick={()=>navigate('o_dashboard')}>Save & exit</Btn>}
      />

      {/* Stepper */}
      <div className="row" style={{ gap: 8, marginBottom: 20 }}>
        {['Basics','Format & rules','Schedule','Branding'].map((s, i) => (
          <div key={i} className="row grow" style={{ gap: 8, padding: 10, borderRadius: 10, background: step===i+1?'var(--surface)':'transparent', border: '1px solid var(--line)', borderColor: step===i+1?'var(--primary)':'var(--line)', cursor:'pointer' }} onClick={()=>setStep(i+1)}>
            <div style={{ width: 22, height: 22, borderRadius: 50, background: step>=i+1?'var(--primary)':'var(--bg-2)', color: step>=i+1?'var(--primary-ink)':'var(--ink-3)', display:'grid', placeItems:'center', fontSize: 11, fontWeight: 700 }}>{i+1}</div>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{s}</span>
          </div>
        ))}
      </div>

      <Card>
        {step === 1 && <div style={{ display:'grid', gap: 16 }}>
          <Field label="League name" hint="Visible on the registration poster">
            <input className="input" defaultValue="Warszawa Open Spring 2026"/>
          </Field>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
            <Field label="Facility" hint="Where matches will be played">
              <FacilityPicker value={facility} onChange={setFacility}/>
            </Field>
            <Field label="City"><input className="input" defaultValue="Warszawa"/></Field>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12 }}>
            <Field label="Surface">
              <select className="select" defaultValue="Hard"><option>Clay</option><option>Hard</option><option>Indoor</option><option>Grass</option></select>
            </Field>
            <Field label="Skill level">
              <select className="select" defaultValue="open"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option value="open">Open</option></select>
            </Field>
            <Field label="Min/Max players">
              <div className="row" style={{ gap: 8 }}>
                <input className="input grow" type="number" defaultValue="8"/>
                <input className="input grow" type="number" defaultValue="40"/>
              </div>
            </Field>
          </div>
          <Field label="Description">
            <textarea className="textarea" rows="4" defaultValue="The WTC's flagship spring league. Round-robin format across 8 weeks, with the top four advancing to a single-elimination playoff in mid-June."/>
          </Field>
          <Field label="Cover image" hint="Used on browse pages and the registration poster">
            <div style={{ display:'flex', gap: 10, alignItems:'center' }}>
              <PhotoBox src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=240&fit=crop" ratio="5/3" style={{ width: 200 }}/>
              <Btn variant="soft" icon="upload">Replace</Btn>
            </div>
          </Field>
        </div>}

        {step === 2 && <div style={{ display:'grid', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color:'var(--ink-2)' }}>League format</label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
              {[
                { id: 'round-robin', t: 'Round-robin', s: 'Everyone plays everyone. Points per match.' },
                { id: 'ladder', t: 'Ladder', s: 'Challenge anyone within N spots above you.' },
                { id: 'atp', t: 'ATP-style ranking', s: 'Earn points per match, ranking decays over time.' },
              ].map(f => (
                <button key={f.id} onClick={()=>setFormat(f.id)}
                  style={{ padding: 14, borderRadius: 12, border: '1px solid', borderColor: format===f.id?'var(--primary)':'var(--line)',
                           background: format===f.id?'var(--surface)':'transparent', textAlign:'left',
                           boxShadow: format===f.id?'0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent)':'none' }}>
                  <Icon name="trophy" size={18} style={{ color: format===f.id?'var(--primary)':'var(--ink-3)' }}/>
                  <div style={{ fontWeight: 700, marginTop: 6, fontSize: 13 }}>{f.t}</div>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{f.s}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 16, background:'var(--surface-2)', borderStyle:'dashed' }}>
            <div className="eyebrow">Scoring rules</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12, marginTop: 8 }}>
              <Field label="Win"><input className="input" defaultValue="3 pts"/></Field>
              <Field label="Loss in 3 sets"><input className="input" defaultValue="1 pt"/></Field>
              <Field label="Walkover"><input className="input" defaultValue="0 pts"/></Field>
            </div>
          </div>
          <Field label="Match format">
            <select className="select" defaultValue="bo3"><option value="bo3">Best of 3 sets, super tie-break at 1-1</option><option>Best of 5 sets</option><option>Pro set to 8</option></select>
          </Field>
          <Field label="Entry fee" hint="Set to 0 for free leagues. Disabled in pilot — coming Q3.">
            <input className="input" defaultValue="0 zł" disabled/>
          </Field>
          <Field label="Custom rules (markdown supported)">
            <textarea className="textarea" rows="5" defaultValue="• Players must arrive 15 min before scheduled match
• Bring 3 unused balls per match (winner keeps one)
• Walkovers must be requested 24h in advance
• Disputed scores resolved by referee on duty"/>
          </Field>
        </div>}

        {step === 3 && <div style={{ display:'grid', gap: 16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
            <Field label="Registration opens"><input className="input" type="date" defaultValue="2026-02-01"/></Field>
            <Field label="Registration closes"><input className="input" type="date" defaultValue="2026-02-28"/></Field>
            <Field label="First match"><input className="input" type="date" defaultValue="2026-03-02"/></Field>
            <Field label="Final match"><input className="input" type="date" defaultValue="2026-06-14"/></Field>
          </div>
          <Field label="Available courts">
            <div className="row" style={{ gap: 8, flexWrap:'wrap' }}>
              {['Court 1','Court 2','Court 3','Court 4','Indoor A','Indoor B'].map((c,i) => (
                <Chip key={c} tone={i<4?'primary':''}>{c}</Chip>
              ))}
              <Btn variant="soft" size="sm" icon="plus">Add court</Btn>
            </div>
          </Field>
          <Field label="Default match window">
            <div className="row" style={{ gap: 8 }}>
              <select className="select grow" defaultValue="weekday"><option value="weekday">Weekdays after 17:00</option><option>Weekends only</option><option>Anytime</option></select>
              <Chip tone="warn" dot>3 conflicts detected</Chip>
            </div>
          </Field>
        </div>}

        {step === 4 && <div style={{ display:'grid', gap: 16 }}>
          <Field label="Accent color">
            <div className="row" style={{ gap: 6 }}>
              {['#1f5b3f','#c9542b','#2a6fdb','#7c3aed','#0e0e0c'].map((c,i) => (
                <button key={c} style={{ width: 36, height: 36, borderRadius: 10, background: c, border: i===0?'3px solid var(--ink)':'1px solid var(--line)' }}/>
              ))}
            </div>
          </Field>
          <Field label="Logo upload">
            <div className="row" style={{ gap: 10 }}>
              <div style={{ width: 80, height: 80, borderRadius: 12, background:'var(--primary)', color:'var(--primary-ink)', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 36 }}>W</div>
              <div>
                <Btn variant="soft" icon="upload">Upload logo</Btn>
                <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>PNG or SVG, square, 512×512+</div>
              </div>
            </div>
          </Field>
          <Field label="Public visibility">
            <label className="radio"><input type="radio" name="vis" defaultChecked/> Public — listed in browse</label>
            <label className="radio"><input type="radio" name="vis"/> Unlisted — joinable via QR/link only</label>
            <label className="radio"><input type="radio" name="vis"/> Private — manual invitations</label>
          </Field>
        </div>}

        <div className="row" style={{ marginTop: 28, gap: 8, justifyContent: 'space-between' }}>
          <Btn variant="ghost" onClick={()=>setStep(Math.max(1, step-1))} disabled={step===1}>← Back</Btn>
          {step === 4
            ? <Btn variant="primary" iconRight="check" onClick={()=>navigate('o_league')}>Publish league</Btn>
            : <Btn variant="primary" iconRight="arrow_right" onClick={()=>setStep(step+1)}>Next: {['','Format & rules','Schedule','Branding','Publish'][step+1]}</Btn>}
        </div>
      </Card>
    </div>
  );
};

const LeagueDetailOrganizer = ({ navigate }) => {
  const D = TL_DATA;
  const l = D.LEAGUES[0];
  const [tab, setTab] = useState('overview');
  return (
    <div className="page page--wide">
      {/* Hero */}
      <div className="card" style={{ overflow:'hidden', marginBottom: 24 }}>
        <PhotoBox src={l.cover} ratio="auto" style={{ height: 220, borderRadius: 0 }}>
          <div style={{ position:'absolute', inset: 0, background:'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }}/>
          <div style={{ position:'absolute', inset: 0, padding: 28, display:'flex', flexDirection:'column', justifyContent:'space-between', color:'white' }}>
            <div className="row" style={{ gap: 6 }}>
              <Chip tone="good" dot>Live · Round 4 of 12</Chip>
              <Chip>{l.format}</Chip>
              <Chip>{l.surface}</Chip>
            </div>
            <div>
              <div className="display" style={{ fontSize: 44 }}>{l.name}</div>
              <div className="row" style={{ gap: 18, marginTop: 8, fontSize: 13, opacity: 0.9 }}>
                <span><Icon name="pin" size={13}/> {l.city}</span>
                <span><Icon name="users" size={13}/> {l.players} players</span>
                <span><Icon name="calendar" size={13}/> {l.start} – {l.end}</span>
                <span><Icon name="trophy" size={13}/> Iga Górski leading</span>
              </div>
            </div>
          </div>
        </PhotoBox>
        <div className="row between" style={{ padding: 16, gap: 8 }}>
          <Tabs active={tab} onChange={setTab} tabs={[
            { id:'overview', label:'Overview' },
            { id:'standings', label:'Standings' },
            { id:'matches', label:'Matches', count: 84 },
            { id:'players', label:'Players', count: 24 },
            { id:'edit', label:'Settings' },
          ]}/>
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="ghost" size="sm" icon="qr" onClick={()=>navigate('o_qr_poster')}>QR poster</Btn>
            <Btn variant="ghost" size="sm" icon="download">Export CSV</Btn>
            <Btn variant="primary" size="sm" icon="plus">Schedule round</Btn>
          </div>
        </div>
      </div>

      {tab === 'overview' && <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 16 }}>
        <div style={{ display:'grid', gap: 16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12 }}>
            <Stat label="Matches played" value="56/132"/>
            <Stat label="Avg. duration" value="92 min"/>
            <Stat label="No-shows" value="3" delta="−2 vs last" deltaDir="down"/>
            <Stat label="Avg. rating" value="1612"/>
          </div>
          <Card title="Match scheduling" action={<Btn variant="soft" size="sm" icon="plus">Drag to court</Btn>}>
            <div className="row mono" style={{ gap: 0, fontSize: 11, color:'var(--ink-3)', marginBottom: 8, paddingLeft: 90 }}>
              {['09','11','13','15','17','19','21'].map(h => <div key={h} style={{ flex: 1 }}>{h}:00</div>)}
            </div>
            {['Court 1','Court 2','Court 3','Court 4'].map((court, ci) => (
              <div key={court} className="row" style={{ gap: 0, padding: '6px 0', borderTop: '1px solid var(--line)' }}>
                <div style={{ width: 90, fontSize: 12, fontWeight: 600 }}>{court}</div>
                <div className="grow" style={{ position:'relative', height: 36, background:'repeating-linear-gradient(90deg, var(--surface-2), var(--surface-2) 14.28%, transparent 14.28%, transparent 14.29%)' }}>
                  {[
                    { c:0, l:'M.L. vs O.M.', x: 5, w: 18, color:'var(--primary)' },
                    { c:0, l:'I.G. vs H.K.', x: 60, w: 18, color:'var(--accent)' },
                    { c:1, l:'P.W. vs T.N.', x: 28, w: 18, color:'var(--primary)' },
                    { c:1, l:'K.D. vs J.W.', x: 75, w: 14, color:'var(--primary)' },
                    { c:2, l:'B.S. vs A.K.', x: 18, w: 18, color:'var(--warn)' },
                    { c:2, l:'M.K. vs A.J.', x: 50, w: 18, color:'var(--primary)' },
                    { c:3, l:'S.P. vs N.Z.', x: 12, w: 18, color:'var(--primary)' },
                  ].filter(b => b.c === ci).map((b, i) => (
                    <div key={i} style={{ position:'absolute', left: b.x+'%', width: b.w+'%', top: 4, bottom: 4, background: b.color, color:'white', borderRadius: 6, padding: '4px 8px', fontSize: 11, fontWeight: 600, display:'flex', alignItems:'center', whiteSpace:'nowrap', overflow:'hidden', cursor:'grab' }}>
                      {b.l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
          <Card title="Recent results" action={<Btn variant="soft" size="sm" onClick={()=>navigate('o_match_l')}>Open match management</Btn>}>
            <div style={{ display:'grid', gap: 8 }}>
              {D.MATCHES.slice(0,5).map(m => <MatchRow key={m.id} m={m} onClick={()=>navigate('o_match_l')} mineHighlight={false}/>)}
            </div>
          </Card>
        </div>

        <div style={{ display:'grid', gap: 16 }}>
          <Card title="Quick actions">
            <div style={{ display:'grid', gap: 8 }}>
              <Btn variant="primary" block icon="qr" onClick={()=>navigate('o_qr_poster')}>Print QR poster</Btn>
              <Btn variant="soft" block icon="send">Notify all players</Btn>
              <Btn variant="soft" block icon="calendar">Schedule round</Btn>
              <Btn variant="soft" block icon="download">Export standings (PDF)</Btn>
              <Btn variant="soft" block icon="copy">Duplicate league</Btn>
            </div>
          </Card>
          <Card title="Recent registrations">
            <div style={{ display:'grid', gap: 10 }}>
              {D.PLAYERS.slice(0,5).map(p => (
                <div key={p.id} className="row" style={{ gap: 10 }}>
                  <Avatar src={p.avatar} name={p.name} size={28}/>
                  <div className="grow">
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{p.city} · #{p.rating}</div>
                  </div>
                  <span className="mono muted" style={{ fontSize: 10 }}>via QR</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Top players">
            <div style={{ display:'grid', gap: 8 }}>
              {D.STANDINGS.slice(0,5).map((p, i) => (
                <div key={p.id} className="row" style={{ gap: 10 }}>
                  <span className="rank">{i+1}</span>
                  <Avatar src={p.avatar} name={p.name} size={28}/>
                  <div className="grow" style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{p.pts}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>}

      {tab === 'standings' && <Standings/>}
      {tab === 'matches' && <MatchManagementInner/>}
      {tab === 'players' && <PlayersList/>}
      {tab === 'edit' && <Card title="League settings"><div className="muted">Edit form same as Create league — pre-filled from this league's data.</div></Card>}
    </div>
  );
};

const Standings = () => {
  const D = TL_DATA;
  const [sort, setSort] = useState('pts');
  return (
    <Card title="Live standings" pad={false} action={<>
      <div className="topbar-search" style={{ width: 200, padding: '4px 10px' }}>
        <Icon name="search" size={12}/>
        <input placeholder="Search player…"/>
      </div>
      <Btn variant="soft" size="sm" icon="filter">Filter</Btn>
      <Btn variant="soft" size="sm" icon="download">Export</Btn>
    </>}>
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
            {D.STANDINGS.map((p, i) => (
              <tr key={p.id}>
                <td><span className="rank">{i+1}</span></td>
                <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><div><div style={{ fontWeight: 600 }}>{p.name}</div><div className="muted mono" style={{ fontSize: 10 }}>#{p.rating}</div></div></div></td>
                <td className="muted">{p.city}</td>
                <td className="num">{p.played}</td>
                <td className="num">{p.wins}</td>
                <td className="num">{p.losses}</td>
                <td className="num">{p.sets_w}</td>
                <td className="num">{p.sets_l}</td>
                <td className="num"><b style={{ fontSize: 14 }}>{p.pts}</b></td>
                <td><div className="row" style={{ gap: 2 }}>{['W','W','L','W','W'].map((r, j) => <span key={j} className="mono" style={{ width: 14, height: 14, fontSize: 9, display:'grid', placeItems:'center', borderRadius: 3, background: r==='W'?'var(--good)':'var(--bad)', color:'white', fontWeight: 700 }}>{r}</span>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const PlayersList = () => {
  const D = TL_DATA;
  return (
    <Card title="Registered players" pad={false} action={<>
      <Btn variant="soft" size="sm" icon="filter">Status</Btn>
      <Btn variant="primary" size="sm" icon="plus">Add player</Btn>
    </>}>
      <table className="tbl">
        <thead><tr><th>Player</th><th>Joined via</th><th>Hand</th><th>Self-rating</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {D.PLAYERS.slice(0,12).map((p,i) => (
            <tr key={p.id}>
              <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><div><div style={{ fontWeight: 600 }}>{p.name}</div><div className="muted" style={{ fontSize: 11 }}>{p.city} · {p.handle}</div></div></div></td>
              <td><Chip tone={i%2?'primary':''}>{i%3===0?'QR scan':'Direct invite'}</Chip></td>
              <td>{i%4===0?'Left':'Right'}</td>
              <td>{['Beginner','Intermediate','Advanced','Open'][i%4]}</td>
              <td><Chip tone={i<10?'good':'warn'} dot>{i<10?'Active':'Pending'}</Chip></td>
              <td className="row" style={{ gap: 4 }}><button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="edit" size={12}/></button><button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="message" size={12}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

const MatchManagementInner = ({ enterResult }) => {
  const D = TL_DATA;
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div className="row" style={{ gap: 8, flexWrap:'wrap' }}>
        <PillGroup value={filter} onChange={setFilter} options={[
          { value:'all', label:'All matches' },
          { value:'scheduled', label:'Scheduled' },
          { value:'completed', label:'Completed' },
          { value:'pending_confirm', label:'Pending' },
        ]}/>
        <Btn variant="soft" size="sm" icon="filter">Round</Btn>
        <Btn variant="soft" size="sm" icon="filter">Court</Btn>
        <div className="grow"/>
        <Btn variant="primary" size="sm" icon="plus">Schedule match</Btn>
      </div>
      <div style={{ display:'grid', gap: 8 }}>
        {D.MATCHES.filter(m => filter==='all' || m.status===filter).map(m => (
          <MatchRow key={m.id} m={m} mineHighlight={false} onClick={() => enterResult && enterResult(m)}/>
        ))}
      </div>
    </div>
  );
};

const MatchManagement = ({ navigate }) => {
  const [enteringResult, setEnteringResult] = useState(null);
  return (
    <div className="page page--wide">
      <PageHeader
        eyebrow="Warszawa Open Spring 2026"
        title="Match management."
        sub="84 matches across 12 rounds. Click any to confirm a result, reschedule, or message both players."
        action={<><Btn variant="ghost" icon="calendar">Schedule round</Btn><Btn variant="primary" icon="plus">New match</Btn></>}
      />
      <MatchManagementInner enterResult={setEnteringResult}/>
      {enteringResult && <ResultEntryModal m={enteringResult} onClose={()=>setEnteringResult(null)}/>}
    </div>
  );
};

const ResultEntryModal = ({ m, onClose }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-head">
        <div>
          <div className="eyebrow">Match · {m.round} · {m.court}</div>
          <h3 className="h3" style={{ marginTop: 4 }}>Enter result</h3>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={14}/></button>
      </div>
      <div className="modal-body">
        <div style={{ display:'grid', gap: 14 }}>
          {[m.p1, m.p2].map((p, idx) => (
            <div key={idx} className="row" style={{ gap: 12 }}>
              <Avatar src={p.avatar} name={p.name} size={40}/>
              <div className="grow"><div style={{ fontWeight: 700 }}>{p.name}</div><div className="muted mono" style={{ fontSize: 11 }}>#{p.rating || '—'}</div></div>
              <div className="row" style={{ gap: 6 }}>
                {[1,2,3].map(s => <input key={s} className="input mono" defaultValue={idx===0?'6':'4'} style={{ width: 50, textAlign:'center', padding: '8px 0' }}/>)}
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: 18, gap: 6 }}>
          <Chip tone="primary">Best of 3</Chip>
          <Chip>Super tie-break at 1-1</Chip>
        </div>
        <Field label="Notes (optional)" hint="Visible to both players">
          <textarea className="textarea" rows="2" placeholder="e.g. Match interrupted by rain at 4-4 in set 2; resumed next day."/>
        </Field>
      </div>
      <div className="modal-foot">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn variant="soft">Save draft</Btn>
        <Btn variant="primary" iconRight="check" onClick={onClose}>Submit & notify</Btn>
      </div>
    </div>
  </div>
);

const CreateTournament = ({ navigate }) => {
  const [format, setFormat] = useState('single');
  const [facility, setFacility] = useState('');
  return (
    <div className="page page--narrow">
      <PageHeader eyebrow="New competition" title="Create a tournament." sub="One-shot bracket, fixed dates. Use a league instead if you want a multi-week format."/>
      <Card>
        <div style={{ display:'grid', gap: 16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 12 }}>
            <Field label="Tournament name"><input className="input" defaultValue="Mazovia Spring Cup 2026"/></Field>
            <Field label="Organization"><select className="select"><option>Warszawa Tennis Club</option></select></Field>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color:'var(--ink-2)' }}>Format</label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
              {[
                { id: 'single', t: 'Single elimination', s: 'One loss, you\'re out. Standard cup format.' },
                { id: 'double', t: 'Double elimination', s: 'Two losses to be eliminated. Loser\'s bracket.' },
                { id: 'group', t: 'Group + KO', s: 'Round-robin groups, top N to playoff.' },
              ].map(f => (
                <button key={f.id} onClick={()=>setFormat(f.id)}
                  style={{ padding: 14, borderRadius: 12, textAlign:'left', border:'1px solid', borderColor: format===f.id?'var(--primary)':'var(--line)', background: format===f.id?'var(--surface)':'transparent' }}>
                  <Icon name="bracket" size={18}/>
                  <div style={{ fontWeight: 700, marginTop: 6, fontSize: 13 }}>{f.t}</div>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{f.s}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12 }}>
            <Field label="Draw size">
              <select className="select" defaultValue="32"><option>8</option><option>16</option><option>32</option><option>64</option></select>
            </Field>
            <Field label="Surface"><select className="select"><option>Clay</option><option>Hard</option><option>Indoor</option></select></Field>
            <Field label="Match format"><select className="select"><option>Best of 3</option><option>Best of 5</option></select></Field>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12 }}>
            <Field label="Start date"><input className="input" type="date" defaultValue="2026-05-22"/></Field>
            <Field label="End date"><input className="input" type="date" defaultValue="2026-05-24"/></Field>
            <Field label="Entry fee" hint="Disabled in pilot — coming Q3"><input className="input" defaultValue="120 zł" disabled/></Field>
          </div>
          <Field label="Rules editor" hint="Markdown supported">
            <textarea className="textarea" rows="6" defaultValue="• Players must check in 30 min before first match
• Tie-break in deciding set, super tie-break at the final
• Walkover after 15 min late
• Coaching prohibited during play
• Disputed lines: server's call when in doubt"/>
          </Field>
          <div className="row" style={{ marginTop: 8, gap: 8, justifyContent:'flex-end' }}>
            <Btn variant="ghost" onClick={()=>navigate('o_dashboard')}>Save draft</Btn>
            <Btn variant="primary" iconRight="check" onClick={()=>navigate('o_tournament')}>Publish & open registration</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

const TournamentDetailOrganizer = ({ navigate }) => {
  const D = TL_DATA;
  const t = D.TOURNAMENTS[0];
  const [tab, setTab] = useState('seeding');
  return (
    <div className="page page--wide">
      <div className="card" style={{ overflow:'hidden', marginBottom: 24 }}>
        <PhotoBox src={t.cover} ratio="auto" style={{ height: 200, borderRadius: 0 }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }}/>
          <div style={{ position:'absolute', padding: 28, inset: 0, color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <div className="row" style={{ gap: 6 }}>
              <Chip tone="good" dot>QF in progress</Chip>
              <Chip>{t.format}</Chip>
              <Chip tone="accent">{t.fee}</Chip>
            </div>
            <div>
              <div className="display" style={{ fontSize: 40 }}>{t.name}</div>
              <div className="row" style={{ gap: 18, marginTop: 6, fontSize: 13, opacity: 0.9 }}>
                <span>{t.city} · {t.surface}</span>
                <span>{t.date}</span>
                <span>{t.players} players · 8 left</span>
              </div>
            </div>
          </div>
        </PhotoBox>
        <div className="row between" style={{ padding: 16, gap: 8 }}>
          <Tabs active={tab} onChange={setTab} tabs={[
            { id:'seeding', label:'Seeding' },
            { id:'bracket', label:'Bracket' },
            { id:'matches', label:'Matches', count: 31 },
            { id:'edit', label:'Settings' },
          ]}/>
          <div className="row" style={{ gap: 8 }}>
            <Btn variant="ghost" size="sm" icon="qr" onClick={()=>navigate('o_qr_poster')}>QR poster</Btn>
            <Btn variant="ghost" size="sm" icon="download">Export</Btn>
            <Btn variant="primary" size="sm" icon="bracket" onClick={()=>navigate('p_tournament_bracket')}>Open bracket</Btn>
          </div>
        </div>
      </div>

      {tab === 'seeding' && <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 16 }}>
        <Card title="Seeded players" action={<><Btn variant="soft" size="sm" icon="sparkle">Auto-seed by rating</Btn><Btn variant="primary" size="sm" iconRight="bracket">Generate bracket</Btn></>}>
          <table className="tbl">
            <thead><tr><th>Seed</th><th>Player</th><th>Rating</th><th>Country</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {D.PLAYERS.slice(0,8).map((p, i) => (
                <tr key={p.id}>
                  <td><div className="rank" style={{ background: i<2?'var(--accent)':undefined, color: i<2?'white':undefined }}>{i+1}</div></td>
                  <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><b>{p.name}</b></div></td>
                  <td className="num">{p.rating}</td>
                  <td>🇵🇱 PL</td>
                  <td><Chip tone="good" dot>Confirmed</Chip></td>
                  <td className="row" style={{ gap: 4 }}>
                    <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="drag" size={12}/></button>
                    <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="edit" size={12}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div style={{ display:'grid', gap: 12 }}>
          <Card title="Registration">
            <div style={{ display:'grid', gap: 12 }}>
              <div className="row between"><span className="muted">Slots filled</span><b className="mono">8 / 8</b></div>
              <div style={{ height: 6, background:'var(--bg-2)', borderRadius: 3 }}><div style={{ height:'100%', width:'100%', background:'var(--primary)', borderRadius: 3 }}/></div>
              <div className="row between"><span className="muted">Waitlist</span><b className="mono">3</b></div>
              <div className="row between"><span className="muted">Withdrawals</span><b className="mono">0</b></div>
              <Btn variant="soft" block icon="users">Manage waitlist</Btn>
            </div>
          </Card>
          <Card title="Quick tools">
            <div style={{ display:'grid', gap: 6 }}>
              <Btn variant="soft" block icon="qr" onClick={()=>navigate('o_qr_poster')}>QR poster</Btn>
              <Btn variant="soft" block icon="send">Notify all entrants</Btn>
              <Btn variant="soft" block icon="court">Assign courts</Btn>
              <Btn variant="soft" block icon="print">Print scorecards</Btn>
            </div>
          </Card>
        </div>
      </div>}

      {tab === 'bracket' && <Card title="Bracket"><Bracket data={D.BRACKET_8}/></Card>}
      {tab === 'matches' && <MatchManagementInner/>}
      {tab === 'edit' && <Card title="Settings"><div className="muted">Same form as Create tournament.</div></Card>}
    </div>
  );
};

const TournamentBracket = ({ navigate, layout }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader
        eyebrow="Mazovia Spring Cup 2026 · Live"
        title="Tournament bracket."
        sub="Click any match to enter or confirm a result. Your matches highlighted in clay."
        action={<><PillGroup value={layout || 'horizontal'} onChange={()=>{}} options={[{value:'horizontal',label:'↔ Horizontal'},{value:'vertical',label:'↕ Vertical'}]}/><Btn variant="ghost" icon="download">Export PDF</Btn></>}
      />
      <Card pad={false}>
        <Bracket data={D.BRACKET_8} layout={layout || 'horizontal'}/>
      </Card>
    </div>
  );
};

export { CreateLeague, LeagueDetailOrganizer, Standings, MatchManagement, MatchManagementInner, ResultEntryModal, CreateTournament, TournamentDetailOrganizer, TournamentBracket };