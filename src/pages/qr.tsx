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

// QR system: Scanner → list of organizer's competitions → Confirm → Success
// Plus QR poster (printable A4)

const QRScanner = ({ navigate }) => {
  const [code, setCode] = useState('');
  const [scanning, setScanning] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [memberStatus, setMemberStatus] = useState(null); // null | 'member' | 'guest'
  const D = TL_DATA;
  const orgName = 'Warszawa Tennis Club';
  const orgComps = [
    ...D.LEAGUES.filter(l => l.org === orgName).map(l => ({ ...l, kind: 'league' })),
    ...D.TOURNAMENTS.slice(0, 2).map(t => ({ ...t, kind: 'tournament', org: orgName })),
  ];

  const onScan = () => {
    setScanning(false);
    setScanned(true);
    setCode('WTC-2026');
    setMemberStatus(null);
  };

  return (
    <div className="page page--narrow">
      <PageHeader
        eyebrow="Quick join"
        title={scanned ? 'Code accepted.' : 'Scan a CourtZone code.'}
        sub={scanned
          ? `Verified · ${orgName} · pick a league or tournament below to register.`
          : "Most clubs print a poster with the QR. If you don't see one, ask the captain — or paste the code below."}
      />

      {!scanned && (
        <div className="card" style={{ padding: 16, display:'flex', flexDirection:'column', alignItems:'stretch' }}>
          <div style={{ position:'relative', width: '100%', aspectRatio:'1 / 1', borderRadius: 18, overflow:'hidden', background:'#000' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1551757055-b8d40f1c1fa9?w=720&h=720&fit=crop)', backgroundSize:'cover', filter:'brightness(0.4)' }}/>
            <div style={{ position:'absolute', inset: 60, border:'2px solid white', borderRadius: 18, boxShadow:'0 0 0 2000px rgba(0,0,0,0.4)' }}>
              {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([y,x],i) => (
                <div key={i} style={{ position:'absolute', [y]: -2, [x]: -2, width: 28, height: 28, borderTop: y==='top'?'4px solid var(--accent)':'none', borderBottom: y==='bottom'?'4px solid var(--accent)':'none', borderLeft: x==='left'?'4px solid var(--accent)':'none', borderRight: x==='right'?'4px solid var(--accent)':'none', borderRadius: 6 }}/>
              ))}
              {scanning && (
                <div style={{ position:'absolute', left: 20, right: 20, top: 50, height: 2, background:'var(--accent)', boxShadow:'0 0 12px var(--accent)', animation:'scan 1.8s ease-in-out infinite alternate' }}/>
              )}
            </div>
            <style>{`@keyframes scan { 0% { transform: translateY(0) } 100% { transform: translateY(220px) } }`}</style>
            <div style={{ position:'absolute', bottom: 14, left: 0, right: 0, textAlign:'center', color:'white', fontSize: 12, fontFamily:'var(--font-mono)' }}>
              POINT AT QR · OR PASTE CODE BELOW
            </div>
          </div>

          <div className="row" style={{ marginTop: 14, gap: 6, width: '100%' }}>
            <Btn variant="ghost" size="sm" icon={scanning?'eye_off':'camera'} onClick={()=>setScanning(!scanning)}>{scanning?'Pause':'Resume'}</Btn>
            <Btn variant="ghost" size="sm" icon="upload" onClick={onScan}>Upload</Btn>
            <Btn variant="primary" size="sm" icon="qr" onClick={onScan}>Simulate</Btn>
          </div>

          <div style={{ width:'100%', marginTop: 18, display:'flex', alignItems:'center', gap: 10 }}>
            <div className="grow divider"/>
            <span className="mono muted" style={{ fontSize: 10 }}>OR ENTER CODE</span>
            <div className="grow divider"/>
          </div>

          <div className="row" style={{ marginTop: 12, gap: 8, width: '100%' }}>
            <input className="input grow mono" placeholder="WTC-2026-MX1" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} style={{ letterSpacing:'0.08em', fontWeight: 600, minWidth: 0 }}/>
            <Btn variant="primary" disabled={!code.length} onClick={onScan}>Join</Btn>
          </div>

          <div className="muted" style={{ marginTop: 18, fontSize: 12, textAlign:'center', lineHeight: 1.5 }}>
            We never read your camera feed for anything except the QR. The image stays on your device.
          </div>
        </div>
      )}

      {scanned && (
        <>
          <div className="card" style={{ padding: 18, marginBottom: 16, display:'flex', alignItems:'center', gap: 14, background: 'color-mix(in srgb, var(--good) 8%, var(--surface))' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background:'var(--good)', color:'white', display:'grid', placeItems:'center' }}>
              <Icon name="check" size={20}/>
            </div>
            <div className="grow">
              <div className="row" style={{ gap: 10, alignItems:'baseline' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{orgName}</div>
                <Chip tone="good">Verified club</Chip>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>Code <span className="mono"><b>{code}</b></span> · 248 members · ul. Polna 14, Warszawa</div>
            </div>
            <Btn variant="ghost" size="sm" icon="qr" onClick={()=>{ setScanned(false); setScanning(true); setCode(''); setMemberStatus(null); }}>Scan again</Btn>
          </div>

          {memberStatus === null && (
            <div className="card" style={{ padding: 22, marginBottom: 16, textAlign:'center' }}>
              <div className="eyebrow">One quick check</div>
              <div className="h3" style={{ margin:'6px 0 4px' }}>Do you already have a CourtZone account?</div>
              <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>
                We use your account to track results, notify opponents, and protect your spot. New players sign up once — it takes about 30 seconds.
              </div>
              <div className="row" style={{ gap: 10, justifyContent:'center', flexWrap:'wrap' }}>
                <Btn variant="ghost" icon="user" onClick={()=>navigate('public_signup')}>I'm new · Sign up</Btn>
                <Btn variant="primary" iconRight="arrow_right" onClick={()=>setMemberStatus('member')}>Yes, I'm a member</Btn>
              </div>
              <div className="muted" style={{ fontSize: 11, marginTop: 14 }}>
                Already signed in as <b>Iga Górski</b>? Tap "Yes" to continue.
              </div>
            </div>
          )}

          {memberStatus === 'member' && <>
            <h3 className="h3" style={{ margin: '4px 0 12px' }}>Open competitions ({orgComps.length})</h3>
            <div className="card" style={{ padding: 0 }}>
              {orgComps.map((c, i) => (
                <div key={c.id} className="row" style={{ gap: 14, padding: 16, borderTop: i?'1px solid var(--line)':'none', alignItems:'center' }}>
                  <div className="photo" style={{ width: 56, height: 56, backgroundImage:`url(${c.cover})`, backgroundSize:'cover', borderRadius: 10, flexShrink: 0 }}/>
                  <div className="grow" style={{ minWidth: 0 }}>
                    <div className="row" style={{ gap: 8, alignItems:'center', flexWrap:'wrap' }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                      <Chip tone={c.kind==='tournament'?'accent':'primary'}>{c.kind === 'tournament' ? 'Cup' : 'League'}</Chip>
                    </div>
                    <div className="muted row" style={{ gap: 12, fontSize: 12, marginTop: 4, flexWrap:'wrap' }}>
                      <span>{c.format}</span>
                      <span>{c.surface}</span>
                      <span>{c.kind==='tournament' ? c.date : `${c.start} – ${c.end}`}</span>
                      <span>{c.players} players</span>
                      {c.fee && <span>{c.fee}</span>}
                    </div>
                  </div>
                  <Btn variant="primary" size="sm" iconRight="check" onClick={()=>navigate('qr_confirm')}>Register</Btn>
                </div>
              ))}
            </div>
          </>}

          <div className="muted" style={{ marginTop: 16, fontSize: 12, textAlign:'center' }}>
            Don't see what you're looking for? <u style={{ cursor:'pointer' }} onClick={()=>{ setScanned(false); setScanning(true); setCode(''); }}>Scan a different code</u> or browse all competitions.
          </div>
        </>
      )}
    </div>
  );
};

const QRConfirm = ({ navigate }) => {
  const l = TL_DATA.LEAGUES[0];
  return (
    <div className="page page--narrow">
      <div className="card" style={{ overflow:'hidden' }}>
        <PhotoBox src={l.cover} ratio="16/6" style={{ borderRadius: 0 }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6))' }}/>
          <div style={{ position:'absolute', bottom: 20, left: 24, color:'white' }}>
            <Chip tone="good" dot>Live registration · 24/40 joined</Chip>
            <div className="display" style={{ fontSize: 36, marginTop: 8 }}>{l.name}</div>
            <div className="row" style={{ gap: 14, marginTop: 6, fontSize: 13, opacity: 0.9 }}>
              <span className="row" style={{ gap: 4 }}><Icon name="pin" size={13}/>{l.city}</span>
              <span className="row" style={{ gap: 4 }}><Icon name="court" size={13}/>{l.surface}</span>
              <span className="row" style={{ gap: 4 }}><Icon name="calendar" size={13}/>{l.start} – {l.end}</span>
            </div>
          </div>
        </PhotoBox>
        <div style={{ padding: 28 }}>
          <div className="row between" style={{ marginBottom: 16 }}>
            <div>
              <div className="eyebrow">Organized by</div>
              <div className="row" style={{ gap: 10, marginTop: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background:'var(--primary)', color:'var(--primary-ink)', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18 }}>W</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{l.org}</div>
                  <div className="muted" style={{ fontSize: 11 }}>Verified club · 248 members</div>
                </div>
              </div>
            </div>
            <Chip tone="primary">{l.format}</Chip>
          </div>

          <div className="divider" style={{ margin: '20px 0' }}/>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <Stat label="Format" value={l.format}/>
            <Stat label="Surface" value={l.surface}/>
            <Stat label="Players" value={`${l.players}/40`}/>
            <Stat label="Entry fee" value="Free"/>
          </div>

          <h3 className="h3" style={{ marginTop: 8 }}>Confirm your details</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginTop: 12 }}>
            <Field label="Name"><input className="input" defaultValue="Iga Górski"/></Field>
            <Field label="Phone"><input className="input" defaultValue="+48 600 123 456"/></Field>
            <Field label="Racket hand">
              <select className="select" defaultValue="right"><option value="right">Right</option><option>Left</option></select>
            </Field>
            <Field label="Self-rating">
              <select className="select" defaultValue="adv"><option>Beginner</option><option>Intermediate</option><option value="adv">Advanced</option><option>Open</option></select>
            </Field>
          </div>

          <label className="checkbox" style={{ marginTop: 16 }}>
            <input type="checkbox" defaultChecked/>
            <span style={{ fontSize: 12.5 }}>I agree to the <u>league rules</u> and the club's <u>code of conduct</u>.</span>
          </label>

          <div className="row" style={{ marginTop: 24, gap: 8 }}>
            <Btn variant="ghost" onClick={()=>navigate('u_qr')}>Back</Btn>
            <Btn variant="primary" block iconRight="check" onClick={()=>navigate('qr_success')}>Confirm registration</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

const QRSuccess = ({ navigate }) => {
  const l = TL_DATA.LEAGUES[0];
  return (
    <div className="page page--narrow">
      <div className="card" style={{ padding: 0, overflow:'hidden', textAlign:'center' }}>
        <div style={{ background:'linear-gradient(180deg, var(--primary), var(--primary-2))', color:'var(--primary-ink)', padding: '56px 40px 40px', position:'relative' }}>
          <div style={{ width: 96, height: 96, borderRadius: 50, background:'rgba(255,255,255,0.16)', display:'grid', placeItems:'center', margin:'0 auto', boxShadow:'0 0 0 8px rgba(255,255,255,0.08)' }}>
            <Icon name="check" size={48}/>
          </div>
          <div className="display" style={{ fontSize: 44, marginTop: 24 }}>You're in.</div>
          <div style={{ fontSize: 15, opacity: 0.85, marginTop: 8 }}>
            Welcome to <b>{l.name}</b>. Your captain has been notified.
          </div>
        </div>

        <div style={{ padding: 28, textAlign: 'left' }}>
          <div className="eyebrow" style={{ textAlign:'center' }}>Confirmation</div>
          <div className="mono" style={{ textAlign:'center', fontSize: 22, fontWeight: 700, letterSpacing:'0.08em', margin: '8px 0 24px' }}>WTC-2026-#0025</div>

          <div className="card" style={{ padding: 16, marginBottom: 18, background:'var(--bg-2)', boxShadow:'none' }}>
            <div className="row" style={{ gap: 14 }}>
              <div className="photo" style={{ width: 56, height: 56, backgroundImage:`url(${l.cover})`, backgroundSize:'cover', borderRadius: 10 }}/>
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 14 }}>{l.name}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{l.org} · {l.format}</div>
                <div className="muted" style={{ fontSize: 12 }}>{l.start} – {l.end} · {l.surface}</div>
              </div>
              <Chip tone="good" dot>Confirmed</Chip>
            </div>
          </div>

          <div className="eyebrow">What happens next</div>
          <ol style={{ paddingLeft: 18, marginTop: 8, fontSize: 13.5, lineHeight: 1.7, color:'var(--ink-2)' }}>
            <li>You'll get a confirmation email at <b>iga.g@example.com</b>.</li>
            <li>Captain Marek pairs all 24 players on Mar 2; first match within 7 days.</li>
            <li>When your opponent suggests a time, you'll get a notification — confirm to lock the court.</li>
            <li>Enter results from your phone after the last point — your opponent confirms, standings update live.</li>
          </ol>

          <div className="row" style={{ marginTop: 24, gap: 8 }}>
            <Btn variant="ghost" icon="calendar">Add to calendar</Btn>
            <Btn variant="ghost" icon="share">Share</Btn>
            <div className="grow"/>
            <Btn variant="soft" onClick={()=>navigate('u_qr')}>Join another</Btn>
            <Btn variant="primary" iconRight="arrow_right" onClick={()=>navigate('p_league_detail')}>Go to league</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

const QRPoster = ({ navigate }) => {
  const l = TL_DATA.LEAGUES[0];
  return (
    <div className="page" style={{ background: 'var(--bg-2)', minHeight:'100vh' }}>
      <PageHeader
        eyebrow="Printable poster · A4"
        title="Tape this to the clubhouse door."
        sub="Players scan, fill in their racket-hand, and they're in. Designed for quick scans from up to 2 meters."
        action={<>
          <Btn variant="ghost" icon="copy">Copy code</Btn>
          <Btn variant="primary" icon="download">Download PDF</Btn>
        </>}
      />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap: 28, alignItems:'flex-start' }}>
        <div className="qr-poster" style={{ width: 595, margin: '0 auto', minHeight: 842 }}>
          <div className="row between" style={{ borderBottom:'2px solid var(--ink)', paddingBottom: 18 }}>
            <div className="row" style={{ gap: 10 }}>
              <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
              <div className="sidebar-brand-name">Court<b>Zone</b></div>
            </div>
            <div className="mono" style={{ fontSize: 11, color:'var(--ink-3)' }}>2026 SPRING SEASON</div>
          </div>

          <div style={{ marginTop: 36 }}>
            <div className="eyebrow">Join the league</div>
            <div className="display" style={{ fontSize: 56, lineHeight: 0.95, marginTop: 8 }}>{l.name}</div>
          </div>

          <div className="row" style={{ marginTop: 32, gap: 10, flexWrap:'wrap' }}>
            <Chip tone="primary">{l.format}</Chip>
            <Chip>{l.surface} courts</Chip>
            <Chip>{l.start} — {l.end}</Chip>
            <Chip tone="accent">Free entry</Chip>
          </div>

          <div className="row" style={{ marginTop: 36, gap: 28, alignItems:'center' }}>
            <div className="qr-svg-box" style={{ flexShrink: 0 }}>
              <QRGlyph size={220} value="WTC-WARSZAWA-OPEN-2026"/>
            </div>
            <div>
              <div className="eyebrow">How to join</div>
              <ol style={{ paddingLeft: 18, marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
                <li>Open the camera on your phone</li>
                <li>Point it at this code</li>
                <li>Tap "I'm in" — that's it</li>
              </ol>
              <div style={{ marginTop: 16 }}>
                <div className="mono" style={{ fontSize: 11, color:'var(--ink-3)' }}>OR ENTER MANUALLY AT COURTZONE.PL</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 700, marginTop: 4, letterSpacing:'0.08em' }}>WTC-2026</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48, padding: 20, background:'var(--bg-2)', borderRadius: 14 }}>
            <div className="eyebrow">Organized by</div>
            <div className="row" style={{ gap: 12, marginTop: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary)', color:'var(--primary-ink)', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 22 }}>W</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.org}</div>
                <div className="muted" style={{ fontSize: 12 }}>ul. Polna 14, Warszawa · +48 22 555 0188</div>
              </div>
            </div>
          </div>

          <div className="row between" style={{ marginTop: 36, paddingTop: 16, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--ink-3)' }}>
            <span>Registration closes May 18, 23:59</span>
            <span className="mono">courtzone.pl/wtc-2026</span>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
          <Card title="Print options">
            <div style={{ display:'grid', gap: 10 }}>
              <Field label="Paper size">
                <select className="select" defaultValue="A4"><option>A4</option><option>US Letter</option><option>A3 (poster)</option></select>
              </Field>
              <Field label="Color">
                <select className="select" defaultValue="full"><option value="full">Full color</option><option>Single ink (b/w)</option></select>
              </Field>
              <Field label="Custom note">
                <textarea className="textarea" defaultValue="Bring water and your own racket. Court 3 is the registration desk." rows="2"/>
              </Field>
              <Btn variant="primary" block icon="print">Print poster</Btn>
              <Btn variant="ghost" block icon="download">Download PDF</Btn>
            </div>
          </Card>
          <Card title="QR analytics">
            <div className="row between" style={{ alignItems:'baseline' }}>
              <div className="display" style={{ fontSize: 36 }}>148</div>
              <span className="mono muted" style={{ fontSize: 10 }}>SCANS · 14 DAYS</span>
            </div>
            <Sparkline data={[2,4,3,8,12,9,15,18,22,14,16,21,28,24]} width={280} height={48}/>
            <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>83% scan-to-join conversion</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { QRScanner, QRConfirm, QRSuccess, QRPoster };