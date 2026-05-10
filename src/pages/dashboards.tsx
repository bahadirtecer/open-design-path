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
import { useTweaks } from '@/lib/use-tweaks';
import createCompetitionImg from '@/assets/create-competition.jpg';

// Dashboards 7-9: Player, Organizer, Super admin

const PlayerDashboard = ({ navigate }) => {
  const D = TL_DATA;
  const me = D.PLAYERS[0];
  return (
    <div className="page">
      <PageHeader
        eyebrow={`Welcome back · ${new Date().toLocaleDateString('en-GB', { weekday:'long', month:'long', day:'numeric' })}`}
        title={`Cześć, ${me.name.split(' ')[0]}.`}
        sub="Three matches this week. You moved up to #1 in Warszawa Open. Keep the momentum."
        action={<>
          <Btn variant="ghost" icon="qr" onClick={()=>navigate('u_qr')}>Scan to join</Btn>
          <Btn variant="primary" icon="plus" onClick={()=>navigate('p_browse_l')}>Find a league</Btn>
        </>}
      />

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <div className="stat">
          <div className="stat-label">League rank</div>
          <div className="row" style={{ gap: 12, alignItems:'baseline' }}>
            <div className="stat-value">#1</div>
            <Sparkline data={[8,7,5,4,3,2,1]} width={80} height={28}/>
          </div>
          <div className="stat-delta up">▲ 7 places this season</div>
        </div>
        <Stat label="Win rate" value="74%" delta="+6%" deltaDir="up"/>
        <Stat label="Matches this month" value="11" delta="3 won this week" deltaDir="up"/>
        <Stat label="Rating" value="1842" delta="+24 ELO" deltaDir="up"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 16 }}>
        {/* Active competitions */}
        <Card title="Your competitions" action={<Btn variant="soft" size="sm" icon="grid" onClick={()=>navigate('p_my')}>See all</Btn>}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
            {D.LEAGUES.slice(0,2).map(l => (
              <EntityCard key={l.id} e={l} kind="league" onClick={()=>navigate('p_league_detail')}/>
            ))}
            {D.TOURNAMENTS.slice(0,2).map(t => (
              <EntityCard key={t.id} e={t} kind="tournament" onClick={()=>navigate('p_tournament_detail')}/>
            ))}
          </div>
        </Card>

        {/* Upcoming matches timeline */}
        <Card title="Upcoming matches" action={<Btn variant="soft" size="sm" onClick={()=>navigate('p_matches')}>History</Btn>}>
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            {D.MATCHES.filter(m => m.status==='scheduled').slice(0,4).map((m, i) => (
              <div key={m.id} style={{ display:'flex', gap: 12, position:'relative', paddingLeft: 30 }}>
                <div style={{ position:'absolute', left: 8, top: 4, width: 12, height: 12, borderRadius: 50, background: i===0?'var(--accent)':'var(--bg-2)', border: '2px solid var(--surface)', boxShadow:'0 0 0 2px var(--line)' }}/>
                {i < 3 && <div style={{ position:'absolute', left: 13, top: 16, bottom: -16, width: 2, background:'var(--line)' }}/>}
                <div className="grow">
                  <div className="mono" style={{ fontSize: 10, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{m.date}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>vs {m.p2.name}</div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{m.leagueName} · {m.court}</div>
                </div>
                <Btn variant="soft" size="sm">Details</Btn>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent results */}
        <Card title="Recent results" action={<Btn variant="soft" size="sm" onClick={()=>navigate('p_matches')}>All matches</Btn>}>
          <div style={{ display:'grid', gap: 8 }}>
            {D.MATCHES.filter(m => m.status==='completed').slice(0,3).map(m => (
              <div key={m.id} className="row" style={{ gap: 12, padding: '8px 4px' }}>
                <Avatar src={m.p2.avatar} name={m.p2.name} size={32}/>
                <div className="grow">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>vs {m.p2.name}</div>
                  <div className="muted" style={{ fontSize: 11 }}>{m.leagueName} · {m.date}</div>
                </div>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: m.score.startsWith('6')?'var(--good)':'var(--ink-2)' }}>{m.score}</span>
                <Chip tone="good" dot>W</Chip>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card title="Quick actions">
          <div style={{ display:'grid', gap: 8 }}>
            <Btn variant="primary" block icon="qr" onClick={()=>navigate('u_qr')}>Scan join code</Btn>
            <Btn variant="soft" block icon="plus" onClick={()=>navigate('p_match_entry')}>Enter match result</Btn>
            <Btn variant="soft" block icon="calendar" onClick={()=>navigate('p_matches')}>Match calendar</Btn>
            <Btn variant="soft" block icon="user" onClick={()=>navigate('u_profile')}>Edit profile</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

const OrganizerEmpty = ({ navigate }) => (
  <div className="page">
    <PageHeader
      eyebrow="Organizer hub"
      title="Run your own league or cup."
      sub="You haven't organized any competition yet. Create one in minutes — invite players, auto-schedule matches and let CourtZone handle scoring."
    />
    <Card pad={false}>
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 0, alignItems:'stretch' }}>
        <div style={{ padding: 36, display:'flex', flexDirection:'column', justifyContent:'center', gap: 18 }}>
          <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
            <Chip tone="primary" dot>New competition</Chip>
            <Chip>Free to start</Chip>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize: 32, lineHeight: 1.1, fontStyle:'italic', marginBottom: 8 }}>
              From idea to first match in 5 minutes.
            </div>
            <div className="muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
              Pick a format, set the dates, share a QR code. You'll become the organizer of your competition and unlock the full hub: standings, disputes, brackets, announcements.
            </div>
          </div>
          <ul style={{ display:'grid', gap: 8, fontSize: 13, color:'var(--ink-2)' }}>
            <li className="row" style={{ gap: 10 }}><Icon name="flag" size={14}/> Round-robin, ladder or ATP-style league</li>
            <li className="row" style={{ gap: 10 }}><Icon name="bracket" size={14}/> Single / double elimination cup brackets</li>
            <li className="row" style={{ gap: 10 }}><Icon name="qr" size={14}/> One QR code to onboard every player</li>
          </ul>
          <div className="row" style={{ gap: 10, marginTop: 4 }}>
            <Btn variant="primary" icon="plus" onClick={()=>navigate('o_create_l')}>New league</Btn>
            <Btn variant="soft" icon="plus" onClick={()=>navigate('o_create_t')}>New tournament</Btn>
          </div>
        </div>
        <div style={{ background:'var(--bg-2)', display:'grid', placeItems:'center', padding: 24 }}>
          <img
            src={createCompetitionImg}
            alt="Empty tournament bracket illustration"
            loading="lazy"
            width={1024}
            height={640}
            style={{ width:'100%', height:'auto', maxWidth: 520, borderRadius: 12, boxShadow:'var(--shadow-md)' }}
          />
        </div>
      </div>
    </Card>
  </div>
);

const OrganizerDashboard = ({ navigate }) => {
  const D = TL_DATA;
  const [t] = useTweaks();
  if (t.organizing === 'none') return <OrganizerEmpty navigate={navigate} />;
  return (
    <div className="page page--wide">
      <PageHeader
        eyebrow="Organizer hub"
        title="4 organizations · 7 active competitions."
        sub="Two matches need your dispute resolution. Mazovia Spring Cup opens registration in 3 days."
        action={<>
          <Btn variant="ghost" icon="download" onClick={()=>navigate('o_league')}>Export season</Btn>
          <Btn variant="primary" icon="plus" onClick={()=>navigate('o_create_l')}>New competition</Btn>
        </>}
      />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <Stat label="Total participants" value="650" delta="+18 this week"/>
        <Stat label="Matches this week" value="84" delta="14 disputed → 1"/>
        <Stat label="QR scans (30d)" value="412" delta="+34%"/>
        <Stat label="Net Promoter" value="68" delta="+4 vs last season"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 16 }}>
        <Card title="Your organizations" action={<Btn variant="soft" size="sm" icon="plus">New org</Btn>}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
            {D.ORGANIZATIONS.map(o => (
              <div key={o.id} className="card" style={{ padding: 16, cursor:'pointer' }} onClick={()=>navigate('o_league')}>
                <div className="row between">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: o.color, color:'white', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontSize: 22, fontStyle:'italic' }}>
                    {o.name[0]}
                  </div>
                  <Icon name="arrow_right" size={14} className="muted"/>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 12 }}>{o.name}</div>
                <div className="row" style={{ gap: 12, marginTop: 8, fontSize: 11.5, color: 'var(--ink-3)' }}>
                  <span><b style={{ color:'var(--ink)' }}>{o.leagues}</b> leagues</span>
                  <span><b style={{ color:'var(--ink)' }}>{o.tournaments}</b> cups</span>
                  <span><b style={{ color:'var(--ink)' }}>{o.members}</b> members</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Needs attention">
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            <div style={{ padding: 12, borderRadius: 10, background:'color-mix(in srgb, var(--bad) 8%, transparent)', border:'1px solid color-mix(in srgb, var(--bad) 24%, transparent)' }}>
              <div className="row between">
                <Chip tone="bad" dot>Dispute</Chip>
                <span className="mono muted" style={{ fontSize: 10 }}>2h ago</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8 }}>Marek L. vs Aleksandra M.</div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Score conflict — 7-5,4-6,6-2 vs 5-7,6-4,2-6</div>
              <Btn variant="bad" size="sm" style={{ marginTop: 8 }}>Resolve →</Btn>
            </div>
            <div style={{ padding: 12, borderRadius: 10, background:'color-mix(in srgb, var(--warn) 12%, transparent)', border:'1px solid color-mix(in srgb, var(--warn) 30%, transparent)' }}>
              <div className="row between">
                <Chip tone="warn" dot>Walkover</Chip>
                <span className="mono muted" style={{ fontSize: 10 }}>4h ago</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8 }}>Tomasz N. requested w/o</div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Injury — needs your approval</div>
              <Btn variant="ghost" size="sm" style={{ marginTop: 8 }}>Review</Btn>
            </div>
          </div>
        </Card>

        <Card title="Match volume (last 14 days)" pad={false}>
          <div style={{ padding: 18 }}>
            <Bars data={[
              { l:'M', v: 8 },{ l:'T', v: 12 },{ l:'W', v: 14 },{ l:'T', v: 11 },{ l:'F', v: 18 },{ l:'S', v: 22 },{ l:'S', v: 19 },
              { l:'M', v: 9 },{ l:'T', v: 13 },{ l:'W', v: 16 },{ l:'T', v: 14 },{ l:'F', v: 21 },{ l:'S', v: 26 },{ l:'S', v: 24 },
            ]} height={140} color="var(--primary)"/>
          </div>
        </Card>

        <Card title="Recent activity">
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            {D.ACTIVITY.slice(0,6).map(a => (
              <div key={a.id} className="row" style={{ gap: 10, fontSize: 13 }}>
                <div style={{ width: 6, height: 6, borderRadius: 50, background: 'var(--primary)' }}/>
                <span><b>{a.who}</b> <span className="muted">{a.what}</span></span>
                <span className="mono muted" style={{ fontSize: 10, marginLeft:'auto' }}>{a.when}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = ({ navigate }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader
        eyebrow="Super admin · Platform health"
        title="All systems normal."
        sub="2,418 active players across 147 clubs. Yesterday's peak: 312 concurrent."
        action={<Btn variant="primary" icon="download" onClick={()=>navigate('a_reports')}>Export report</Btn>}
      />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
        <Stat label="DAU" value="1,284" delta="+8.2%"/>
        <Stat label="Active leagues" value="89" delta="+5"/>
        <Stat label="Matches/day" value="412" delta="+11%"/>
        <Stat label="Uptime 30d" value="99.98%"/>
        <Stat label="Support tickets" value="14" delta="-3 this week" deltaDir="down"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 16 }}>
        <Card title="Platform growth (90 days)">
          <Bars data={Array.from({length:30}, (_,i) => ({ l: i%5===0?(''+(i+1)):'', v: 40 + Math.sin(i/3)*15 + i*2.4 + Math.random()*8 }))} height={180} color="var(--primary)"/>
        </Card>
        <Card title="System health" pad={false}>
          <div style={{ padding: 16 }}>
            {[
              { n: 'Web app', s: 'Operational', t: 'good' },
              { n: 'API', s: 'Operational', t: 'good' },
              { n: 'Notifications', s: 'Operational', t: 'good' },
              { n: 'PDF export', s: 'Degraded', t: 'warn' },
              { n: 'Database', s: 'Operational', t: 'good' },
            ].map((s,i) => (
              <div key={i} className="row between" style={{ padding:'8px 0', borderTop: i?'1px solid var(--line)':'none' }}>
                <div className="row" style={{ gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 50, background: s.t==='good'?'var(--good)':'var(--warn)' }}/>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.n}</span>
                </div>
                <span className="muted mono" style={{ fontSize: 11 }}>{s.s}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top clubs by activity" action={<Btn variant="soft" size="sm" onClick={()=>navigate('a_orgs')}>All clubs</Btn>}>
          <table className="tbl">
            <thead><tr><th>Club</th><th>Members</th><th>Matches/wk</th><th>Net Promoter</th><th>Plan</th></tr></thead>
            <tbody>
              {D.ORGANIZATIONS.map((o, i) => (
                <tr key={o.id}>
                  <td><div className="row" style={{ gap: 8 }}><span className="rank">{i+1}</span>{o.name}</div></td>
                  <td className="num">{o.members}</td>
                  <td className="num">{20 + i*8}</td>
                  <td className="num">{72 - i*4}</td>
                  <td><Chip tone={i===0?'primary':''}>{i===0?'Pro':'Free'}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Live feed">
          <div style={{ display:'flex', flexDirection:'column', gap: 14, fontSize: 13 }}>
            {D.ACTIVITY.concat([
              { id:'x1', who: 'Wrocław Senior+', what: 'archived season', when: '5 min ago' },
              { id:'x2', who: 'New club', what: 'joined: Olsztyn TC', when: '12 min ago' },
            ]).slice(0,8).map(a => (
              <div key={a.id} className="row" style={{ gap: 10 }}>
                <span className="mono muted" style={{ fontSize: 10, width: 60 }}>{a.when}</span>
                <span><b>{a.who}</b> <span className="muted">{a.what}</span></span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export { PlayerDashboard, OrganizerDashboard, AdminDashboard };