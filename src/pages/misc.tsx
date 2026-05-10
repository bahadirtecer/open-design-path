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

// Discovery (27-28), Communication (29-30), Admin (31-33)

const BrowseLeagues = ({ navigate }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Discover" title="Browse leagues." sub="14 leagues open for registration. Filter by city, surface, and skill level."/>
      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap:'wrap' }}>
        <div className="topbar-search" style={{ width: 260 }}>
          <Icon name="search" size={14}/>
          <input placeholder="Search leagues…" defaultValue=""/>
        </div>
        <Btn variant="soft" size="sm" icon="pin">All Poland</Btn>
        <Btn variant="soft" size="sm" icon="court">Surface</Btn>
        <Btn variant="soft" size="sm" icon="calendar">Starting soon</Btn>
        <Btn variant="soft" size="sm" icon="filter">More</Btn>
        <div className="grow"/>
        <PillGroup value="grid" onChange={()=>{}} options={[{value:'grid',label:'Grid'},{value:'map',label:'Map'},{value:'list',label:'List'}]}/>
      </div>
      <div className="row" style={{ gap: 8, marginBottom: 20 }}>
        {['All','Round-robin','Ladder','ATP-points','Hard','Clay','Indoor','Beginner','Open'].map((c,i) => (
          <Chip key={c} tone={i===0?'primary':''}>{c}</Chip>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
        {[...D.LEAGUES, ...D.LEAGUES].slice(0,9).map((l,i) => <EntityCard key={l.id+i} e={l} kind="league" onClick={()=>navigate('p_league_detail')}/>)}
      </div>
    </div>
  );
};

const BrowseTournaments = ({ navigate }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Discover" title="Browse tournaments." sub="8 tournaments open. Entry fees from 0 to 180 zł."/>
      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap:'wrap' }}>
        <div className="topbar-search" style={{ width: 260 }}><Icon name="search" size={14}/><input placeholder="Search tournaments…"/></div>
        <Btn variant="soft" size="sm" icon="pin">All Poland</Btn>
        <Btn variant="soft" size="sm" icon="bracket">Format</Btn>
        <Btn variant="soft" size="sm" icon="tag">Entry fee</Btn>
        <Btn variant="soft" size="sm" icon="calendar">Date</Btn>
        <div className="grow"/>
        <PillGroup value="grid" onChange={()=>{}} options={[{value:'grid',label:'Grid'},{value:'list',label:'List'}]}/>
      </div>
      <div className="row" style={{ gap: 8, marginBottom: 20 }}>
        {['All','Single elim','Double elim','Group + KO','Free','Under 100 zł','Open','Junior'].map((c,i) => (
          <Chip key={c} tone={i===0?'accent':''}>{c}</Chip>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
        {[...D.TOURNAMENTS, ...D.TOURNAMENTS].slice(0,9).map((t,i) => <EntityCard key={t.id+i} e={t} kind="tournament" onClick={()=>navigate('p_tournament_detail')}/>)}
      </div>
    </div>
  );
};

const NotificationsPage = ({ navigate }) => {
  const [items, setItems] = useState(TL_DATA.NOTIFICATIONS);
  const ico = { match: 'court', result: 'check', standings: 'trophy', invite: 'mail', message: 'message' };
  return (
    <div className="page page--narrow">
      <PageHeader eyebrow="Inbox" title="Notifications." sub="3 unread. Mark them read after you act on each."
        action={<Btn variant="ghost" icon="check" onClick={()=>setItems(items.map(n=>({...n,read:true})))}>Mark all read</Btn>}/>
      <Card pad={false}>
        {items.map((n, i) => (
          <div key={n.id} style={{ display:'flex', gap: 14, padding: '16px 20px', borderTop: i?'1px solid var(--line)':'none', background: n.read?'transparent':'color-mix(in srgb, var(--primary) 4%, transparent)', cursor:'pointer' }}
               onClick={()=>setItems(items.map(x => x.id===n.id?{...x,read:true}:x))}>
            {!n.read && <div style={{ width: 6, height: 6, borderRadius: 50, background: 'var(--accent)', marginTop: 8, flexShrink: 0 }}/>}
            <div style={{ width: 36, height: 36, borderRadius: 10, background:'var(--bg-2)', display:'grid', placeItems:'center', color:'var(--primary)', flexShrink: 0 }}>
              <Icon name={ico[n.type] || 'bell'} size={16}/>
            </div>
            <div className="grow" style={{ paddingLeft: n.read?20:0 }}>
              <div className="row between">
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{n.title}</div>
                <span className="mono muted" style={{ fontSize: 10 }}>{n.time}</span>
              </div>
              <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{n.body}</div>
              {n.type==='result' && !n.read && <div className="row" style={{ gap: 6, marginTop: 10 }}>
                <Btn size="sm" variant="primary" iconRight="check">Confirm</Btn>
                <Btn size="sm" variant="ghost">Dispute</Btn>
              </div>}
              {n.type==='invite' && !n.read && <div className="row" style={{ gap: 6, marginTop: 10 }}>
                <Btn size="sm" variant="primary">Accept</Btn>
                <Btn size="sm" variant="ghost">Decline</Btn>
              </div>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const Messages = ({ navigate }) => {
  const D = TL_DATA;
  const [active, setActive] = useState(D.ANNOUNCEMENTS[0].id);
  const cur = D.ANNOUNCEMENTS.find(a => a.id === active);
  return (
    <div className="page page--wide" style={{ padding: 0, maxWidth: 'none' }}>
      <div style={{ display:'grid', gridTemplateColumns:'380px 1fr', height: 'calc(100vh - 60px)' }}>
        <div style={{ borderRight: '1px solid var(--line)', display:'flex', flexDirection:'column', background: 'var(--surface)' }}>
          <div style={{ padding: '20px 20px 12px' }}>
            <h2 className="h2" style={{ fontSize: 24 }}>Inbox</h2>
            <div className="topbar-search" style={{ marginTop: 12, width:'100%' }}>
              <Icon name="search" size={14}/>
              <input placeholder="Search announcements…"/>
            </div>
            <div className="row" style={{ gap: 6, marginTop: 12 }}>
              <Chip tone="primary">All</Chip><Chip>Leagues</Chip><Chip>Cups</Chip><Chip>Platform</Chip>
            </div>
          </div>
          <div className="scroll" style={{ overflow:'auto', flex: 1 }}>
            {D.ANNOUNCEMENTS.map(a => (
              <div key={a.id} onClick={()=>setActive(a.id)}
                style={{ padding: '14px 20px', borderTop:'1px solid var(--line)', cursor:'pointer', background: active===a.id?'var(--bg-2)':'transparent', position:'relative' }}>
                {a.unread && <div style={{ position:'absolute', left: 8, top: 22, width: 6, height: 6, borderRadius: 50, background: a.color }}/>}
                <div className="row between"><b style={{ fontSize: 13 }}>{a.from}</b><span className="mono muted" style={{ fontSize: 10 }}>{a.time}</span></div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{a.subject}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4, overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient:'vertical' }}>{a.preview}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 36, overflow:'auto' }}>
          {cur && <>
            <div className="row" style={{ gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: cur.color, color:'white', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 22 }}>{cur.from[0]}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{cur.from}</div>
                <div className="muted mono" style={{ fontSize: 11 }}>{cur.time}</div>
              </div>
              <div className="grow"/>
              <Btn variant="ghost" size="sm" icon="star">Star</Btn>
              <Btn variant="ghost" size="sm" icon="trash">Archive</Btn>
            </div>
            <h1 className="h2" style={{ marginTop: 20 }}>{cur.subject}</h1>
            <div style={{ marginTop: 20, fontSize: 15, lineHeight: 1.7, color:'var(--ink-2)', maxWidth: 720 }}>
              <p>{cur.preview}</p>
              <p>We've been working with the captains for the last fortnight to make sure the change is as smooth as possible. The new schedule is reflected in your dashboard already — please double-check that your match times still work for you.</p>
              <p>If you have any questions, hit reply or message us directly via the league page.</p>
              <p>— {cur.from}</p>
            </div>
            <div className="row" style={{ marginTop: 28, gap: 8 }}>
              <Btn variant="primary" icon="send">Reply</Btn>
              <Btn variant="ghost" icon="message">Forward</Btn>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
};

const AdminUsers = ({ navigate }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Admin · User management" title="2,418 registered users." sub="Search, filter, ban or activate. Click any row for the full profile."
        action={<Btn variant="primary" icon="download">Export users</Btn>}/>
      <div className="row" style={{ gap: 8, marginBottom: 16 }}>
        <div className="topbar-search" style={{ width: 320 }}><Icon name="search" size={14}/><input placeholder="Search by name, email, handle…"/></div>
        <Btn variant="soft" size="sm" icon="filter">Status</Btn>
        <Btn variant="soft" size="sm" icon="filter">Role</Btn>
        <Btn variant="soft" size="sm" icon="filter">City</Btn>
        <div className="grow"/>
        <span className="muted" style={{ fontSize: 12 }}>Showing 16 of 2,418</span>
      </div>
      <Card pad={false}>
        <table className="tbl">
          <thead><tr><th><input type="checkbox"/></th><th>User</th><th>Role</th><th>City</th><th>Joined</th><th>Last active</th><th>Matches</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {D.PLAYERS.map((p,i) => (
              <tr key={p.id}>
                <td><input type="checkbox"/></td>
                <td><div className="row" style={{ gap: 10 }}><Avatar src={p.avatar} name={p.name} size={28}/><div><div style={{ fontWeight: 600 }}>{p.name}</div><div className="muted" style={{ fontSize: 11 }}>{p.handle}@example.com</div></div></div></td>
                <td>{i<3?<Chip tone="primary">Organizer</Chip>:i<5?<Chip tone="accent">Pro</Chip>:<Chip>Player</Chip>}</td>
                <td>{p.city}</td>
                <td className="muted mono" style={{ fontSize: 11 }}>{['Apr 12','May 3','Mar 28','Jan 14','Feb 6','Apr 20','Jan 2','Mar 18','Feb 22','Apr 30','May 1','Apr 8','Mar 14','Jan 20','Feb 28','Apr 5'][i]}</td>
                <td className="muted mono" style={{ fontSize: 11 }}>{i<4?'2h ago':i<10?'Yesterday':i<14?'3d ago':'2w ago'}</td>
                <td className="num">{p.w + p.l}</td>
                <td><Chip tone={i===15?'bad':i===14?'warn':'good'} dot>{i===15?'Banned':i===14?'Pending':'Active'}</Chip></td>
                <td className="row" style={{ gap: 4 }}>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="eye" size={12}/></button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="message" size={12}/></button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="ban" size={12}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const AdminOrgs = ({ navigate }) => {
  const D = TL_DATA;
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Admin · Organizations" title="147 active clubs & captains." sub="Approve new orgs, audit existing leagues, archive dormant ones."
        action={<Btn variant="primary" icon="plus">New org</Btn>}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <Stat label="Total clubs" value="147" delta="+8 this month"/>
        <Stat label="Pending approval" value="3" delta="2 ≥ 7d"/>
        <Stat label="Active leagues" value="89"/>
        <Stat label="Active tournaments" value="42"/>
      </div>
      <Card pad={false}>
        <table className="tbl">
          <thead><tr><th>Club</th><th>Region</th><th>Members</th><th>Active comps</th><th>Created</th><th>Plan</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {[...D.ORGANIZATIONS, ...D.ORGANIZATIONS].slice(0,10).map((o, i) => (
              <tr key={o.id+i}>
                <td><div className="row" style={{ gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: o.color, color:'white', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic' }}>{o.name[0]}</div>
                  <div><div style={{ fontWeight: 600 }}>{o.name}</div><div className="muted" style={{ fontSize: 11 }}>captain@{o.name.toLowerCase().replace(/\s/g,'')}.pl</div></div>
                </div></td>
                <td>{['Mazowieckie','Pomorskie','Małopolskie','Wielkopolskie'][i%4]}</td>
                <td className="num">{o.members}</td>
                <td className="num">{o.leagues + o.tournaments}</td>
                <td className="muted mono" style={{ fontSize: 11 }}>2024</td>
                <td><Chip tone={i===0?'primary':''}>{i===0?'Pro':'Free'}</Chip></td>
                <td><Chip tone={i===5?'warn':'good'} dot>{i===5?'Needs approval':'Active'}</Chip></td>
                <td className="row" style={{ gap: 4 }}>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="eye" size={12}/></button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="check" size={12}/></button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="trash" size={12}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const AdminReports = ({ navigate }) => {
  return (
    <div className="page page--wide">
      <PageHeader eyebrow="Admin · Reports" title="Platform analytics." sub="Operational metrics over the last 90 days. Schedule weekly digests in Settings."
        action={<><Btn variant="ghost" icon="calendar">Last 90 days</Btn><Btn variant="primary" icon="download">Export PDF</Btn></>}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <Stat label="MAU" value="2,418" delta="+11.4%"/>
        <Stat label="Matches recorded" value="38,142" delta="+8.2%"/>
        <Stat label="QR scan→join" value="83%" delta="+4 pts"/>
        <Stat label="Avg. dispute rate" value="1.2%" delta="-0.3 pts" deltaDir="down"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 16 }}>
        <Card title="Matches per week" action={<PillGroup value="90" onChange={()=>{}} options={[{value:'30',label:'30d'},{value:'90',label:'90d'},{value:'365',label:'1y'}]}/>}>
          <Bars height={220} color="var(--primary)" data={Array.from({length:13}, (_,i) => ({ l: 'W'+(i+1), v: 200 + Math.sin(i/2)*60 + i*15 + Math.random()*40 }))}/>
        </Card>
        <Card title="Format split">
          <div style={{ display:'grid', gap: 12 }}>
            {[
              { l: 'Round-robin', v: 42, c: 'var(--primary)' },
              { l: 'Single elim', v: 28, c: 'var(--accent)' },
              { l: 'Ladder', v: 18, c: 'var(--warn)' },
              { l: 'Double elim', v: 8, c: 'var(--good)' },
              { l: 'Group + KO', v: 4, c: 'var(--bad)' },
            ].map(f => (
              <div key={f.l}>
                <div className="row between" style={{ fontSize: 12, marginBottom: 4 }}><span>{f.l}</span><span className="mono"><b>{f.v}%</b></span></div>
                <div style={{ height: 8, background: 'var(--bg-2)', borderRadius: 4 }}>
                  <div style={{ width: f.v+'%', height:'100%', background: f.c, borderRadius: 4 }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Active users by hour (typical day)">
          <Bars height={120} color="var(--accent)" data={Array.from({length:24}, (_,h) => ({ l: h%4===0?h+'h':'', v: Math.max(20, 200*Math.exp(-Math.pow((h-19)/4, 2)) + 60*Math.exp(-Math.pow((h-12)/3, 2)) + Math.random()*20) }))}/>
        </Card>
        <Card title="Geography (top regions)">
          <div style={{ display:'grid', gap: 10 }}>
            {[
              { r: 'Mazowieckie', v: 32, c: 612 },
              { r: 'Pomorskie', v: 18, c: 348 },
              { r: 'Małopolskie', v: 14, c: 271 },
              { r: 'Dolnośląskie', v: 11, c: 213 },
              { r: 'Wielkopolskie', v: 9, c: 174 },
            ].map(r => (
              <div key={r.r} className="row" style={{ gap: 12 }}>
                <span style={{ width: 120, fontSize: 13 }}>{r.r}</span>
                <div style={{ flex: 1, height: 8, background:'var(--bg-2)', borderRadius: 4 }}><div style={{ width: r.v*3+'%', height:'100%', background:'var(--primary)', borderRadius: 4 }}/></div>
                <span className="mono" style={{ fontSize: 12, width: 40, textAlign:'right' }}>{r.c}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export { BrowseLeagues, BrowseTournaments, NotificationsPage, Messages, AdminUsers, AdminOrgs, AdminReports };