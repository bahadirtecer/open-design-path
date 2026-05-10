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

// Live streaming feature: Go Live (player), Broadcaster Dashboard, Watch (spectator), Streams Hub
// Plus reusable LIVE-NOW carousel for the homepage and a LiveBadge primitive.

const LiveBadge = ({ size = 'md' }) => {
  const h = size === 'sm' ? 18 : size === 'lg' ? 28 : 22;
  return (
    <span className="live-badge" style={{ height: h, padding: `0 ${h*0.45}px`, fontSize: h*0.5 }}>
      <span className="live-dot"/>
      LIVE
    </span>
  );
};

const ViewerBadge = ({ count, size = 'md' }) => (
  <span className="viewer-badge" data-size={size}>
    <Icon name="eye" size={size==='sm'?10:12}/>
    {Number(count).toLocaleString()}
  </span>
);

// Mock live streams pool
const LIVE_STREAMS = () => {
  const D = TL_DATA;
  const seed = [
    { id:'ls1', p1: D.PLAYERS[0], p2: D.PLAYERS[2], comp: D.LEAGUES[0], score:'6-4, 3-2', viewers: 234, peak: 268, started:'23 min', court:'Court 2' },
    { id:'ls2', p1: D.PLAYERS[1], p2: D.PLAYERS[3], comp: D.TOURNAMENTS[0], score:'4-6, 5-3', viewers: 487, peak: 512, started:'1h 12m', court:'Centre' },
    { id:'ls3', p1: D.PLAYERS[5], p2: D.PLAYERS[8], comp: D.LEAGUES[2], score:'7-5, 2-1', viewers: 92, peak: 140, started:'42 min', court:'Court 1' },
    { id:'ls4', p1: D.PLAYERS[4], p2: D.PLAYERS[6], comp: D.LEAGUES[1], score:'3-2', viewers: 56, peak: 71, started:'8 min', court:'Indoor 4' },
    { id:'ls5', p1: D.PLAYERS[7], p2: D.PLAYERS[10], comp: D.TOURNAMENTS[2], score:'6-2, 6-4, 4-3', viewers: 1812, peak: 1980, started:'2h 5m', court:'Show court' },
    { id:'ls6', p1: D.PLAYERS[9], p2: D.PLAYERS[11], comp: D.LEAGUES[5], score:'5-5', viewers: 38, peak: 64, started:'34 min', court:'Court 3' },
    { id:'ls7', p1: D.PLAYERS[12], p2: D.PLAYERS[14], comp: D.LEAGUES[3], score:'1-1', viewers: 21, peak: 29, started:'12 min', court:'Court 5' },
    { id:'ls8', p1: D.PLAYERS[2], p2: D.PLAYERS[5], comp: D.TOURNAMENTS[1], score:'6-3, 4-2', viewers: 412, peak: 481, started:'58 min', court:'Centre' },
  ];
  return seed.map((s,i) => ({ ...s, thumb: s.comp.cover.replace(/w=\d+&h=\d+/, 'w=720&h=405') }));
};

const StreamCard = ({ s, navigate, compact = false }) => (
  <div className="stream-card" onClick={()=>navigate('live_watch')}>
    <div className="stream-thumb" style={{ backgroundImage:`url(${s.thumb})` }}>
      <div className="stream-thumb-overlay"/>
      <div style={{ position:'absolute', top: 10, left: 10 }}><LiveBadge size={compact?'sm':'md'}/></div>
      <div style={{ position:'absolute', bottom: 10, right: 10 }}><ViewerBadge count={s.viewers}/></div>
      <div className="stream-thumb-score">{s.score}</div>
      <button className="stream-watch-btn"><Icon name="play" size={14}/> Watch now</button>
    </div>
    <div style={{ padding: compact?'10px 12px 12px':'14px 16px 16px' }}>
      <div className="row" style={{ gap: 8, alignItems:'center' }}>
        <Avatar src={s.p1.avatar} name={s.p1.name} size={20}/>
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>{s.p1.name.split(' ').map((w,i)=>i?w[0]+'.':w).join(' ')}</span>
        <span className="muted mono" style={{ fontSize: 11 }}>vs</span>
        <Avatar src={s.p2.avatar} name={s.p2.name} size={20}/>
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>{s.p2.name.split(' ').map((w,i)=>i?w[0]+'.':w).join(' ')}</span>
      </div>
      <div className="muted" style={{ fontSize: 12, marginTop: 6, display:'flex', gap: 10, flexWrap:'wrap' }}>
        <span><Icon name="trophy" size={10}/> {s.comp.name.split(' ').slice(0,3).join(' ')}</span>
        <span><Icon name="pin" size={10}/> {s.court}</span>
        <span><Icon name="clock" size={10}/> {s.started} ago</span>
      </div>
    </div>
  </div>
);

// PAGE 34: Go Live (pre-stream checklist)
const GoLive = ({ navigate }) => {
  const D = TL_DATA;
  const m = D.MATCHES.find(x => x.mine && x.status !== 'completed') || D.MATCHES[0];
  const [checks, setChecks] = useState({ speed: true, power: true, angle: false, terms: false });
  const [generated, setGenerated] = useState(false);
  const [keyVisible, setKeyVisible] = useState(false);
  const [copied, setCopied] = useState(null);
  const ready = checks.speed && checks.power && checks.angle && checks.terms;
  const copy = (k, v) => { navigator.clipboard?.writeText(v); setCopied(k); setTimeout(()=>setCopied(null), 1500); };

  return (
    <div className="page page--wide live-page">
      <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
        <span style={{ cursor:'pointer' }} onClick={()=>navigate('p_dashboard')}>Dashboard</span> ›
        <span style={{ cursor:'pointer', marginLeft: 6 }} onClick={()=>navigate('p_my')}>My matches</span> ›
        <span style={{ marginLeft: 6 }}>Match #{m.id} ›</span>
        <b style={{ marginLeft: 6, color:'var(--ink)' }}>Go Live</b>
      </div>
      <PageHeader eyebrow="Broadcast" title="Broadcast your match." sub="Share your game with the tennis community. Stream goes to youtube.com/@courtzone and embeds back here."/>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap: 24, alignItems:'flex-start' }}>
        <div style={{ display:'grid', gap: 16 }}>
          {/* Match summary */}
          <Card>
            <div className="row" style={{ gap: 24, alignItems:'center', justifyContent:'center' }}>
              <div style={{ textAlign:'center' }}>
                <Avatar src={m.p1.avatar} name={m.p1.name} size={64}/>
                <div style={{ fontWeight: 700, marginTop: 8 }}>{m.p1.name}</div>
                <div className="muted mono" style={{ fontSize: 11 }}>#{m.p1.rating}</div>
              </div>
              <div style={{ width: 56, height: 56, borderRadius: 50, border:'2px solid var(--line)', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 22 }}>vs</div>
              <div style={{ textAlign:'center' }}>
                <Avatar src={m.p2.avatar} name={m.p2.name} size={64}/>
                <div style={{ fontWeight: 700, marginTop: 8 }}>{m.p2.name}</div>
                <div className="muted mono" style={{ fontSize: 11 }}>#{m.p2.rating}</div>
              </div>
            </div>
            <div className="divider" style={{ margin:'18px 0' }}/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12 }}>
              <Stat label="Competition" value={m.leagueName?.split(' ').slice(0,2).join(' ')}/>
              <Stat label="Court" value="WTC · Court 2"/>
              <Stat label="Scheduled" value={m.date || 'Now'}/>
              <Stat label="Format" value="Bo3"/>
            </div>
          </Card>

          {/* Pre-stream checklist */}
          <Card title="Pre-stream checklist" action={<span className="muted" style={{ fontSize: 12 }}><b>{Object.values(checks).filter(Boolean).length}</b> / 4</span>}>
            <div style={{ display:'grid', gap: 2 }}>
              <ChecklistRow label="Internet speed test passed" hint="Tested at 8.4 Mbps up · 32 ms" checked={checks.speed} onClick={()=>setChecks({...checks, speed:!checks.speed})} action={<Btn size="sm" variant="ghost" icon="flash">Test now</Btn>}/>
              <ChecklistRow label="Device fully charged or plugged in" hint="iPhone 14 · 87%" checked={checks.power} onClick={()=>setChecks({...checks, power:!checks.power})}/>
              <ChecklistRow label="Camera angle positioned correctly" hint="Mount above the net post for best framing" checked={checks.angle} onClick={()=>setChecks({...checks, angle:!checks.angle})} action={<Btn size="sm" variant="ghost" icon="play">2-min guide</Btn>}/>
              <ChecklistRow label="I agree to the streaming guidelines" hint="No commentary on minors, no ads, captions encouraged" checked={checks.terms} onClick={()=>setChecks({...checks, terms:!checks.terms})}/>
            </div>
          </Card>

          {/* App selection */}
          <Card title="Choose your streaming app" action={<a className="muted" style={{ fontSize: 12, cursor:'pointer' }}>Need help installing?</a>}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
              {[
                { name:'OBS Studio Mobile', tag:'Most reliable', tone:'primary', icon:'broadcast', stars: 5 },
                { name:'Larix Broadcaster', tag:'Easiest setup', tone:'accent', icon:'flash', stars: 4 },
                { name:'Streamlabs Mobile', tag:'Best chat', tone:'', icon:'message', stars: 4 },
              ].map(a => (
                <div key={a.name} className="app-card">
                  <div className="app-card-logo"><Icon name={a.icon} size={24}/></div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 12 }}>{a.name}</div>
                  {a.tag && <Chip tone={a.tone} style={{ marginTop: 6 }}>{a.tag}</Chip>}
                  <div className="row" style={{ gap: 2, marginTop: 8, color:'var(--warn)' }}>
                    {Array.from({length:5}).map((_,i) => <span key={i} style={{ opacity: i<a.stars?1:0.25 }}>★</span>)}
                  </div>
                  <Btn block size="sm" variant="soft" icon="download" style={{ marginTop: 10 }}>Download</Btn>
                </div>
              ))}
            </div>
          </Card>

          {/* Credentials */}
          <Card title="Stream credentials" action={generated && <Chip tone="good" dot>Activated</Chip>}>
            {!generated && (
              <div style={{ padding: '24px 8px', textAlign:'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 50, background:'var(--bg-2)', display:'grid', placeItems:'center', margin:'0 auto', color:'var(--ink-3)' }}>
                  <Icon name="lock" size={22}/>
                </div>
                <div className="muted" style={{ fontSize: 13, marginTop: 14 }}>Click <b>Go Live</b> below to generate your stream key.</div>
                <div style={{ display:'grid', gap: 8, maxWidth: 460, margin:'18px auto 0' }}>
                  <div className="cred-row" style={{ filter:'blur(4px)' }}><span className="muted mono" style={{ fontSize: 11 }}>RTMP</span><span className="mono">rtmp://stream.courtzone.pl/live/···········</span></div>
                  <div className="cred-row" style={{ filter:'blur(4px)' }}><span className="muted mono" style={{ fontSize: 11 }}>KEY</span><span className="mono">sk_·····················</span></div>
                </div>
              </div>
            )}
            {generated && (
              <div style={{ display:'grid', gap: 10 }}>
                <CopyRow label="RTMP server URL" value="rtmp://stream.courtzone.pl/live" copied={copied==='rtmp'} onCopy={()=>copy('rtmp','rtmp://stream.courtzone.pl/live')}/>
                <CopyRow label="Stream key" value={keyVisible?'sk_4f8b29ad4c2e91f0a73':'sk_·······················'} mask={!keyVisible} onToggle={()=>setKeyVisible(!keyVisible)} copied={copied==='key'} onCopy={()=>copy('key','sk_4f8b29ad4c2e91f0a73')}/>
                <div style={{ background:'color-mix(in srgb, var(--good) 10%, transparent)', borderRadius: 10, padding: 12, fontSize: 12.5, color:'var(--good)', display:'flex', gap: 10, alignItems:'center' }}>
                  <Icon name="check" size={14}/>
                  <span><b>Stream activated.</b> Paste these into your app, hit Start, and you'll appear in the live hub within ~10s.</span>
                </div>
                <div className="row between" style={{ marginTop: 4, fontSize: 12 }}>
                  <span className="muted">Auto-stop in</span>
                  <span className="mono" style={{ fontWeight: 700 }}>3:00:00</span>
                </div>
              </div>
            )}
          </Card>

          {/* CTA */}
          <div className="card live-cta">
            <Btn variant="live" size="lg" disabled={!ready} block onClick={()=>{ setGenerated(true); setTimeout(()=>navigate('live_dashboard'), 1100); }}>
              <span className="live-dot" style={{ background:'white' }}/> {ready ? 'Go live now' : `Complete the checklist (${4 - Object.values(checks).filter(Boolean).length} left)`}
            </Btn>
            <div className="muted" style={{ textAlign:'center', fontSize: 11, marginTop: 10 }}>
              By going live, you agree to our streaming guidelines · Match results still need to be entered manually
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display:'grid', gap: 16, position:'sticky', top: 80 }}>
          <Card title="Live preview">
            <div style={{ aspectRatio:'16/9', background:'#0a0a0a', borderRadius: 12, display:'grid', placeItems:'center', color:'rgba(255,255,255,0.5)', fontSize: 12 }}>
              {generated ? <div style={{ textAlign:'center' }}><div className="live-dot" style={{ width: 14, height: 14, margin:'0 auto 8px' }}/><div>Waiting for app...</div></div> : 'Your stream will appear here'}
            </div>
            <div className="row between" style={{ marginTop: 12, fontSize: 12 }}>
              <span className="muted">👁 0 viewers</span>
              <span className="muted mono">{generated?'CONNECTING':'OFFLINE'}</span>
            </div>
          </Card>
          <Card title="Need help?">
            <div style={{ display:'grid', gap: 8, fontSize: 13 }}>
              <a className="row" style={{ gap: 8, color:'var(--ink-2)', cursor:'pointer' }}><Icon name="play" size={14}/> Watch the 2-min setup video</a>
              <a className="row" style={{ gap: 8, color:'var(--ink-2)', cursor:'pointer' }}><Icon name="message" size={14}/> Contact streaming support</a>
              <a className="row" style={{ gap: 8, color:'var(--ink-2)', cursor:'pointer' }}><Icon name="info" size={14}/> Streaming guidelines</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ChecklistRow = ({ label, hint, checked, onClick, action }) => (
  <div className="check-row" data-checked={checked} onClick={onClick}>
    <div className="check-mark">{checked ? <Icon name="check" size={12}/> : null}</div>
    <div className="grow">
      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
      {hint && <div className="muted" style={{ fontSize: 12 }}>{hint}</div>}
    </div>
    {action && <div onClick={e=>e.stopPropagation()}>{action}</div>}
  </div>
);

const CopyRow = ({ label, value, mask, onToggle, onCopy, copied }) => (
  <div className="cred-row">
    <span className="muted mono" style={{ fontSize: 10, width: 56 }}>{label.toUpperCase().slice(0,12)}</span>
    <span className="mono grow" style={{ fontSize: 12.5, overflow:'hidden', textOverflow:'ellipsis' }}>{value}</span>
    {onToggle && <button className="icon-btn" onClick={onToggle} style={{ width: 28, height: 28 }}><Icon name={mask?'eye':'eye_off'} size={12}/></button>}
    <button className="icon-btn" onClick={onCopy} style={{ width: 28, height: 28, color: copied?'var(--good)':'inherit' }}><Icon name={copied?'check':'copy'} size={12}/></button>
  </div>
);

// PAGE 35: Broadcaster dashboard
const LiveDashboard = ({ navigate }) => {
  const D = TL_DATA;
  const [viewers, setViewers] = useState(47);
  const [elapsed, setElapsed] = useState(83 * 60 + 15);
  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(20, v + Math.round((Math.random()-0.45)*4)));
      setElapsed(e => e+1);
    }, 1500);
    return () => clearInterval(id);
  }, []);
  const fmt = (s) => `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const m = D.MATCHES.find(x => x.mine) || D.MATCHES[0];

  return (
    <div className="live-dashboard">
      <div className="live-topbar">
        <div className="row" style={{ gap: 14, alignItems:'center' }}>
          <LiveBadge size="lg"/>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{m.p1.name} vs {m.p2.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{m.leagueName} · WTC Court 2</div>
          </div>
        </div>
        <div className="row" style={{ gap: 10, alignItems:'center' }}>
          <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{fmt(elapsed)}</div>
          <div className="muted mono" style={{ fontSize: 11 }}>STREAMING</div>
        </div>
        <Btn variant="live" iconRight="stop" onClick={()=>navigate('p_dashboard')}>End stream</Btn>
      </div>

      <div className="live-grid">
        <div className="live-preview-pane">
          <div className="live-player">
            <div style={{ position:'absolute', inset:0, background:`url(${m.p1.avatar}) center/cover, url(https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1400&h=800&fit=crop) center/cover`, opacity: 0.7 }}/>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent, rgba(0,0,0,0.7))' }}/>
            <div style={{ position:'absolute', top: 14, left: 14 }}><LiveBadge/></div>
            <div style={{ position:'absolute', top: 14, right: 14 }}><ViewerBadge count={viewers}/></div>
            <div style={{ position:'absolute', bottom: 16, left: 16, color:'white' }}>
              <div className="mono" style={{ fontSize: 12, opacity: 0.7 }}>SET 2 · GAME 5</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>6-4 · 3-2 · 30-15</div>
            </div>
            <div style={{ position:'absolute', bottom: 16, right: 16, fontSize: 11, color:'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)' }}>courtzone.pl</div>
          </div>
          <div className="row between" style={{ padding: 12, color:'rgba(255,255,255,0.7)', fontSize: 12 }}>
            <div className="row" style={{ gap: 14 }}>
              <span>Quality: <select style={{ background:'transparent', color:'inherit', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 6px' }}><option>Auto</option><option>1080p</option><option>720p</option></select></span>
              <span>•</span>
              <span>Latency: <b style={{ color:'#fff' }}>2.1s</b></span>
            </div>
            <button className="icon-btn" style={{ background:'rgba(255,255,255,0.1)', color:'#fff', border:'none' }}><Icon name="external" size={14}/></button>
          </div>

          <div className="live-actions">
            <button className="live-action-btn"><Icon name="camera" size={16}/> Snapshot</button>
            <button className="live-action-btn"><Icon name="flash" size={16}/> Update score</button>
            <button className="live-action-btn"><Icon name="bell" size={16}/> Notify followers</button>
            <button className="live-action-btn"><Icon name="copy" size={16}/> Copy link</button>
          </div>
        </div>

        <div className="live-sidebar">
          <div className="live-stat-row">
            <div className="live-stat live-stat-hero">
              <div className="muted mono" style={{ fontSize: 10 }}>VIEWERS NOW</div>
              <div className="display" style={{ fontSize: 56, color:'#fff', lineHeight: 1 }}>{viewers}</div>
              <Sparkline data={[20,28,24,33,42,38,45,49,47,52,48,viewers]} width={220} height={36} color="#FF3B30"/>
            </div>
            <div style={{ display:'grid', gap: 10 }}>
              <div className="live-stat"><div className="muted mono" style={{ fontSize: 10 }}>PEAK</div><div style={{ fontSize: 22, fontWeight: 700, color:'#fff' }}>83</div></div>
              <div className="live-stat"><div className="muted mono" style={{ fontSize: 10 }}>TOTAL VIEWS</div><div style={{ fontSize: 22, fontWeight: 700, color:'#fff' }}>156</div></div>
              <div className="live-stat"><div className="muted mono" style={{ fontSize: 10 }}>AVG WATCH</div><div style={{ fontSize: 22, fontWeight: 700, color:'#fff' }}>12:34</div></div>
            </div>
          </div>

          <div className="live-stat" style={{ marginTop: 14 }}>
            <div className="row between" style={{ marginBottom: 12 }}>
              <span className="mono muted" style={{ fontSize: 10 }}>STREAM HEALTH</span>
              <Chip tone="good" dot>Excellent</Chip>
            </div>
            <div style={{ display:'grid', gap: 10, fontSize: 13, color:'rgba(255,255,255,0.85)' }}>
              <HealthRow label="Bitrate" value="3.2 Mbps" status="good"/>
              <HealthRow label="Frame rate" value="30 fps" status="good"/>
              <HealthRow label="Connection" value="Stable · 5 bars" status="good"/>
              <HealthRow label="Dropped frames" value="0.04% · 12 of 28k" status="good"/>
            </div>
          </div>

          <div className="live-chat">
            <div className="row between" style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color:'#fff', letterSpacing:'0.04em' }}>YOUTUBE LIVE CHAT</span>
              <span className="muted mono" style={{ fontSize: 10 }}>{viewers - 8} active</span>
            </div>
            <div className="live-chat-feed">
              {[
                { u:'maciekw', c:'#3b82f6', t:'gooo Iga 🎾'},
                { u:'tennisfan_pl', c:'#f59e0b', t:'that backhand was unreal'},
                { u:'klubMokotów', c:'#10b981', t:'streaming from the clubhouse 🍺'},
                { u:'kasia_b', c:'#ef4444', t:'who\'s up next on court 2?'},
                { u:'WTC_official', c:'#8b5cf6', t:'Court 2 free at 18:00 if anyone\'s grinding 🎾'},
                { u:'grzegorz', c:'#3b82f6', t:'2-1 in the 2nd, anything can happen'},
                { u:'tennisfan_pl', c:'#f59e0b', t:'commentary plz 🎤'},
              ].map((msg,i) => (
                <div key={i} className="chat-msg">
                  <span className="chat-u" style={{ color: msg.c }}>{msg.u}</span>
                  <span className="chat-t">{msg.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthRow = ({ label, value, status }) => (
  <div className="row between">
    <span className="muted">{label}</span>
    <span style={{ display:'flex', alignItems:'center', gap: 6 }}>
      <span style={{ width: 6, height: 6, borderRadius: 50, background: status==='good'?'#10b981':status==='warn'?'#f59e0b':'#ef4444' }}/>
      <b className="mono" style={{ fontSize: 12 }}>{value}</b>
    </span>
  </div>
);

// PAGE 36: Watch live (spectator)
const WatchLive = ({ navigate }) => {
  const D = TL_DATA;
  const s = LIVE_STREAMS()[0];
  const [tab, setTab] = useState('about');
  return (
    <div className="page page--wide watch-page">
      <div className="watch-player-wrap">
        <div className="watch-player" style={{ backgroundImage: `url(${s.thumb})` }}>
          <div className="watch-player-overlay"/>
          <div style={{ position:'absolute', top: 18, left: 18 }}><LiveBadge size="lg"/></div>
          <div style={{ position:'absolute', top: 18, right: 18 }}><ViewerBadge count={s.viewers} size="lg"/></div>
          <button className="watch-play"><Icon name="play" size={28}/></button>
          <div style={{ position:'absolute', bottom: 0, left: 0, right: 0, padding: 18, display:'flex', alignItems:'flex-end', gap: 16, color:'white', background:'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
            <div className="grow">
              <div style={{ fontSize: 12, opacity: 0.7, fontFamily:'var(--font-mono)' }}>SET 2 · {s.score}</div>
              <div className="display" style={{ fontSize: 32, marginTop: 4 }}>{s.p1.name} vs {s.p2.name}</div>
            </div>
            <div className="row" style={{ gap: 6 }}>
              {['cc','quality','fullscreen'].map(i => (
                <button key={i} className="icon-btn" style={{ background:'rgba(255,255,255,0.15)', color:'#fff', border:'none' }}><Icon name={i==='cc'?'message':i==='quality'?'settings':'external'} size={14}/></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="watch-info-bar">
        <div className="row" style={{ gap: 10, alignItems:'center' }}>
          <Avatar src={s.p1.avatar} name={s.p1.name} size={36}/>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{s.p1.name}</div>
            <div className="muted mono" style={{ fontSize: 10 }}>#{s.p1.rating} · serving</div>
          </div>
          <div className="watch-score">
            <div className="watch-score-row"><span>{s.p1.name.split(' ')[0]}</span><span className="mono"><b>6</b><b>3</b><b style={{color:'var(--accent)'}}>2</b></span></div>
            <div className="watch-score-row muted"><span>{s.p2.name.split(' ')[0]}</span><span className="mono"><b>4</b><b>6</b><b>1</b></span></div>
          </div>
          <Avatar src={s.p2.avatar} name={s.p2.name} size={36}/>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{s.p2.name}</div>
            <div className="muted mono" style={{ fontSize: 10 }}>#{s.p2.rating}</div>
          </div>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <Chip tone="primary">{s.comp.name}</Chip>
          <Chip>{s.court}</Chip>
        </div>
        <div className="row" style={{ gap: 6 }}>
          {[{n:'WhatsApp',i:'message'},{n:'X',i:'flash'},{n:'Copy',i:'copy'}].map(b => (
            <Btn key={b.n} variant="ghost" size="sm" icon={b.i}>{b.n}</Btn>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap: 24, marginTop: 24 }}>
        <div>
          <Tabs active={tab} onChange={setTab} tabs={[
            { id:'about', label:'About this match' },
            { id:'standings', label:'Standings impact' },
            { id:'highlights', label:'Highlights', count: 3 },
          ]}/>

          {tab==='about' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
              <Card title="Head-to-head">
                <div className="row" style={{ gap: 10, marginBottom: 14 }}>
                  <div style={{ flex:1, padding: 14, background:'color-mix(in srgb, var(--good) 8%, transparent)', borderRadius: 10, textAlign:'center' }}>
                    <div className="display" style={{ fontSize: 36, color:'var(--good)' }}>4</div>
                    <div className="muted" style={{ fontSize: 11 }}>{s.p1.name.split(' ')[0].toUpperCase()}</div>
                  </div>
                  <div style={{ flex:1, padding: 14, background:'color-mix(in srgb, var(--bad) 8%, transparent)', borderRadius: 10, textAlign:'center' }}>
                    <div className="display" style={{ fontSize: 36, color:'var(--bad)' }}>2</div>
                    <div className="muted" style={{ fontSize: 11 }}>{s.p2.name.split(' ')[0].toUpperCase()}</div>
                  </div>
                </div>
                <div style={{ display:'grid', gap: 6, fontSize: 12 }}>
                  {[{d:'Mar 14, Clay',s:'6-4, 7-5'},{d:'Feb 2, Hard',s:'6-3, 4-6, 6-2'},{d:'Jan 18, Clay',s:'7-6, 6-4'}].map((p,i)=>(
                    <div key={i} className="row between" style={{ padding:'6px 0', borderTop: i?'1px solid var(--line)':'none' }}>
                      <span className="muted">{p.d}</span><span className="mono"><b>{p.s}</b></span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="Recent form">
                <div style={{ display:'grid', gap: 14 }}>
                  {[s.p1, s.p2].map((p,i) => (
                    <div key={p.id}>
                      <div className="row between" style={{ marginBottom: 6 }}>
                        <div className="row" style={{ gap: 8 }}><Avatar src={p.avatar} name={p.name} size={22}/><b style={{ fontSize: 13 }}>{p.name}</b></div>
                        <span className="mono muted" style={{ fontSize: 11 }}>W{i?'L':'W'}WW{i?'L':'W'}</span>
                      </div>
                      <div className="row" style={{ gap: 4 }}>
                        {(i?'WLWWL':'WWLWW').split('').map((r,j) => (
                          <span key={j} style={{ width: 24, height: 24, borderRadius: 6, background: r==='W'?'var(--good)':'var(--bad)', color:'white', display:'grid', placeItems:'center', fontSize: 11, fontWeight: 700 }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {tab==='standings' && (
            <Card title={`If ${s.p1.name.split(' ')[0]} wins...`}>
              <div className="row" style={{ gap: 14 }}>
                <div style={{ flex:1, padding: 16, background:'color-mix(in srgb, var(--good) 8%, transparent)', borderRadius: 10 }}>
                  <div className="muted" style={{ fontSize: 12 }}>{s.p1.name}</div>
                  <div className="display" style={{ fontSize: 28, color:'var(--good)' }}>↑ #1</div>
                  <div className="muted" style={{ fontSize: 11 }}>+3 pts · clinches playoff spot</div>
                </div>
                <div style={{ flex:1, padding: 16, background:'color-mix(in srgb, var(--bad) 8%, transparent)', borderRadius: 10 }}>
                  <div className="muted" style={{ fontSize: 12 }}>{s.p2.name}</div>
                  <div className="display" style={{ fontSize: 28, color:'var(--bad)' }}>↓ #5</div>
                  <div className="muted" style={{ fontSize: 11 }}>-1 pt · slips out of top 4</div>
                </div>
              </div>
            </Card>
          )}

          {tab==='highlights' && (
            <Card title="AI-generated key moments" action={<Chip tone="accent">Beta</Chip>}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 10 }}>
                {[{t:'Set 1 break point',m:'18:32'},{t:'Iga\'s 142 km/h ace',m:'27:14'},{t:'Net cord rally — 22 shots',m:'41:05'}].map((h,i) => (
                  <div key={i} className="card" style={{ padding: 0, overflow:'hidden', cursor:'pointer' }}>
                    <div style={{ aspectRatio:'16/9', backgroundImage:`url(${s.thumb})`, backgroundSize:'cover', position:'relative' }}>
                      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }}/>
                      <div style={{ position:'absolute', bottom: 6, right: 6, background:'rgba(0,0,0,0.7)', color:'white', padding:'2px 6px', borderRadius: 4, fontSize: 10, fontFamily:'var(--font-mono)' }}>{h.m}</div>
                    </div>
                    <div style={{ padding: 10, fontSize: 12.5, fontWeight: 600 }}>{h.t}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="card live-cta" style={{ marginTop: 16, background:'var(--primary)', color:'var(--primary-ink)', borderColor:'var(--primary)' }}>
            <div className="row between" style={{ alignItems:'center' }}>
              <div>
                <div className="display" style={{ fontSize: 28 }}>Playing tennis too?</div>
                <div style={{ marginTop: 6, opacity: 0.85 }}>Create your own league — free under 50 members.</div>
              </div>
              <Btn variant="accent" iconRight="arrow_right" onClick={()=>navigate('public_signup')}>Start your league</Btn>
            </div>
          </div>
        </div>

        <div className="watch-chat">
          <div className="row between" style={{ padding: 12, borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing:'0.04em' }}>LIVE CHAT · {s.viewers - 8} active</span>
            <button className="icon-btn" style={{ width: 26, height: 26 }}><Icon name="settings" size={11}/></button>
          </div>
          <div className="muted" style={{ padding: '10px 12px', fontSize: 11, borderBottom: '1px solid var(--line)' }}>Be respectful. No spam. Chat is moderated.</div>
          <div className="watch-chat-feed">
            {[
              { u:'maciekw', c:'#3b82f6', t:'gooo Iga 🎾' },
              { u:'tennisfan_pl', c:'#f59e0b', t:'that backhand was unreal' },
              { u:'klubMokotów', c:'#10b981', t:'streaming from the clubhouse 🍺' },
              { u:'kasia_b', c:'#ef4444', t:'who\'s up next on court 2?' },
              { u:'WTC_official', c:'#8b5cf6', t:'Court 2 free at 18:00 if anyone\'s grinding' },
              { u:'grzegorz', c:'#3b82f6', t:'2-1 in the 2nd, anything can happen' },
              { u:'maciekw', c:'#3b82f6', t:'how do I subscribe to her matches?' },
            ].map((msg,i) => (
              <div key={i} className="chat-msg" style={{ color:'var(--ink-2)' }}>
                <span className="chat-u" style={{ color: msg.c }}>{msg.u}</span>
                <span style={{ fontSize: 13 }}>{msg.t}</span>
              </div>
            ))}
          </div>
          <div className="watch-chat-input">
            <input className="input" placeholder="Say something nice..." style={{ flex: 1 }}/>
            <Btn size="sm" variant="primary" icon="send">Send</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// PAGE 37: Live Streams Hub
const LiveHub = ({ navigate }) => {
  const streams = LIVE_STREAMS();
  const [filter, setFilter] = useState('all');
  return (
    <div className="page page--wide">
      <div className="row between" style={{ alignItems:'flex-end', marginBottom: 24 }}>
        <div>
          <div className="row" style={{ gap: 12, alignItems:'center' }}><LiveBadge size="lg"/><div className="eyebrow">Live now · {streams.length} matches</div></div>
          <h1 className="h0" style={{ marginTop: 12, fontSize: 56 }}>Live right now.</h1>
          <p style={{ color:'var(--ink-2)', fontSize: 15, maxWidth: 560, marginTop: 8 }}>Tennis happening across Poland this minute. Pick a match, jump into the chat, and cheer the home club.</p>
        </div>
        <div className="topbar-search" style={{ width: 260 }}>
          <Icon name="search" size={14}/>
          <input placeholder="Search players, leagues..."/>
        </div>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 20, flexWrap:'wrap' }}>
        {[
          { id:'all', l:'All', n: streams.length },
          { id:'leagues', l:'Leagues', n: 5 },
          { id:'tournaments', l:'Tournaments', n: 3 },
          { id:'near', l:'Near me', n: 2 },
          { id:'following', l:'Following', n: 1 },
        ].map(f => (
          <button key={f.id} className="filter-pill" data-active={filter===f.id} onClick={()=>setFilter(f.id)}>
            {f.l} <span className="muted mono" style={{ fontSize: 10 }}>{f.n}</span>
          </button>
        ))}
        <div className="grow"/>
        <Btn size="sm" variant="soft" icon="filter">Sort: most viewers</Btn>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap: 24, alignItems:'flex-start' }}>
        <div className="stream-grid">
          {streams.map(s => <StreamCard key={s.id} s={s} navigate={navigate}/>)}
        </div>

        <div style={{ display:'grid', gap: 16, position:'sticky', top: 80 }}>
          <Card title="Starting soon">
            <div style={{ display:'grid', gap: 12 }}>
              {[
                { p1:'Tomasz Nowak', p2:'Karolina Dąbrowska', when:'45 min', comp:'Kraków Ladder' },
                { p1:'Jakub Wójcik', p2:'Adam Krawczyk', when:'1h 12m', comp:'Pomeranian Open' },
                { p1:'Anna Jankowska', p2:'Iga Górski', when:'2h 30m', comp:'Warszawa Open' },
              ].map((m,i) => (
                <div key={i} className="row" style={{ gap: 10, padding: '10px 0', borderTop: i?'1px solid var(--line)':'none' }}>
                  <div className="grow" style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.p1} vs {m.p2}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{m.comp} · in {m.when}</div>
                  </div>
                  <Btn size="sm" variant="ghost" icon="bell">Remind</Btn>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Going live this week">
            <div style={{ display:'grid', gap: 10, fontSize: 13 }}>
              {['Mazovia Spring Cup · Final · Sat 16:00','Pomeranian Open · Semis · Fri 18:00','Bałtyk Coastal · Quarters · Sun 14:00'].map((t,i) => (
                <div key={i} className="row" style={{ gap: 8 }}>
                  <span className="mono muted" style={{ fontSize: 11 }}>{['SAT','FRI','SUN'][i]}</span>
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Featured live carousel (used in landing hero & homepage section)
const FeaturedLive = ({ navigate, max = 4 }) => {
  const streams = LIVE_STREAMS().slice(0, max);
  return (
    <section className="featured-live">
      <div className="row between" style={{ alignItems:'flex-end', marginBottom: 18 }}>
        <div className="row" style={{ gap: 14, alignItems:'center' }}>
          <LiveBadge size="lg"/>
          <h2 className="h1" style={{ margin: 0, fontSize: 36 }}>Live now</h2>
          <span className="muted">·</span>
          <span className="muted">{streams.length} matches</span>
        </div>
        <a className="row" style={{ gap: 6, cursor:'pointer', fontSize: 13, color:'var(--ink-2)' }} onClick={()=>navigate('live_hub')}>
          View all <Icon name="arrow_right" size={12}/>
        </a>
      </div>
      <div className="featured-live-row">
        {streams.map(s => <StreamCard key={s.id} s={s} navigate={navigate} compact/>)}
      </div>
    </section>
  );
};

export { GoLive, LiveDashboard, WatchLive, LiveHub, FeaturedLive, LiveBadge, ViewerBadge, StreamCard };