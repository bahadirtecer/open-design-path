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

// Public pages 1-6: Landing, About, How it works, Sign up, Login, Password reset

const PublicNav = ({ navigate, route }) =>
<nav style={{ position: 'sticky', top: 0, zIndex: 20, background: 'color-mix(in srgb, var(--bg) 90%, transparent)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 28 }}>
      <div className="row" style={{ gap: 10, cursor: 'pointer' }} onClick={() => navigate('public_landing')}>
        <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
        <div className="sidebar-brand-name">Court<b>Zone</b></div>
      </div>
      <div className="row" style={{ gap: 22, marginLeft: 28, fontSize: 13, fontWeight: 500 }}>
        <a onClick={() => navigate('public_landing')} style={{ cursor: 'pointer', opacity: route === 'public_landing' ? 1 : .7 }}>Home</a>
        <a onClick={() => navigate('public_how')} style={{ cursor: 'pointer', opacity: route === 'public_how' ? 1 : .7 }}>How it works</a>
        <a onClick={() => navigate('public_about')} style={{ cursor: 'pointer', opacity: route === 'public_about' ? 1 : .7 }}>About</a>
        <a onClick={() => navigate('p_browse_l')} style={{ cursor: 'pointer' }}>Browse leagues</a>
        <a onClick={() => navigate('live_hub')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className="live-dot" style={{ background: '#FF1F1F' }} /> Watch live
        </a>
      </div>
      <div className="row" style={{ marginLeft: 'auto', gap: 8 }}>
        <Btn variant="ghost" size="sm" onClick={() => navigate('public_login')}>Log in</Btn>
        <Btn variant="primary" size="sm" onClick={() => navigate('public_signup')}>Get started</Btn>
      </div>
    </div>
  </nav>;


const Landing = ({ navigate }) =>
<div>
    <PublicNav navigate={navigate} route="public_landing" />
    {/* Hero */}
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px 40px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'center' }}>
      <div>
        <div className="row" style={{ gap: 10, alignItems: 'center' }}>
          <div className="eyebrow">Polska liga tenisa amatorskiego</div>
          <span style={{ width: 4, height: 4, borderRadius: 50, background: 'var(--ink-3)' }} />
          <Chip tone="live" dot>NEW · Live broadcasting</Chip>
        </div>
        <h1 className="h0" style={{ marginTop: 16, fontSize: 92, lineHeight: 1.02 }}>Organize.<br />Compete.<br /><span style={{ color: 'var(--live-red, #FF1F1F)' }}>Broadcast.</span></h1>
        <p style={{ maxWidth: 520, marginTop: 22, fontSize: 17, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          Create leagues, run tournaments, and share your matches with the world — all in one platform built for amateur clubs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 28, maxWidth: 540 }}>
          {[
        { i: 'qr', t: 'QR-based instant registration', tag: null },
        { i: 'bracket', t: 'Automated brackets & standings', tag: null },
        { i: 'broadcast', t: 'Live match broadcasting', tag: 'NEW' }].
        map((f, i) =>
        <div key={i} style={{ padding: '14px 14px 12px', border: '1px solid var(--line)', borderRadius: 12, background: f.tag ? 'color-mix(in srgb, #FF1F1F 4%, var(--bg-1))' : 'var(--bg-1)', borderColor: f.tag ? 'color-mix(in srgb, #FF1F1F 30%, var(--line))' : 'var(--line)' }}>
              <div className="row between"><Icon name={f.i} size={18} />{f.tag && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FF1F1F', letterSpacing: '0.1em' }}>{f.tag}</span>}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 10, lineHeight: 1.35 }}>{f.t}</div>
            </div>
        )}
        </div>
        <div className="row" style={{ marginTop: 28, gap: 10 }}>
          <Btn variant="primary" size="lg" iconRight="arrow_right" onClick={() => navigate('public_signup')}>Start your league</Btn>
          <Btn variant="ghost" size="lg" onClick={() => navigate('live_hub')}>
            <span className="live-dot" style={{ background: '#FF1F1F', marginRight: 6 }} /> Watch live matches
          </Btn>
        </div>
      </div>
      <div style={{ position: 'relative', minHeight: 540 }}>
        <PhotoBox src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=900&h=720&fit=crop" ratio="3/4" style={{ borderRadius: 18 }} />
        {/* Floating live-stream mockup */}
        <div className="card" style={{ position: 'absolute', bottom: -28, left: -36, width: 300, padding: 0, overflow: 'hidden', boxShadow: '0 24px 60px -20px rgba(0,0,0,0.3)' }}>
          <div style={{ aspectRatio: '16/9', backgroundImage: 'url(https://images.unsplash.com/photo-1551773161-9c439e1e0bb1?w=600&h=340&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.55))', width: "298px" }} />
            <div style={{ position: 'absolute', top: 8, left: 8 }}><LiveBadge size="sm" /></div>
            <div style={{ position: 'absolute', top: 8, right: 8 }}><ViewerBadge count={234} size="sm" /></div>
            <div style={{ position: 'absolute', bottom: 6, left: 8, color: 'white', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>SET 2 · 6-4 · 3-2</div>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Iga Górski vs Hanna K.</div>
            <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Warszawa Open · Court 2</div>
          </div>
        </div>
        {/* Floating stat */}
        <div className="card" style={{ position: 'absolute', top: 28, right: -36, padding: 14, width: 200, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <span className="live-dot" style={{ background: '#FF1F1F', width: 12, height: 12 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>12 LIVE NOW</div>
              <div className="muted" style={{ fontSize: 10 }}>Across Poland</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ position: 'absolute', top: 180, right: -52, padding: 12, width: 180 }}>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', color: 'var(--primary-ink)', display: 'grid', placeItems: 'center' }}>
              <Icon name="trophy" size={14} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>10k+ matches</div>
              <div className="muted" style={{ fontSize: 10 }}>Played this year</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* LIVE NOW carousel */}
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 28px 20px' }}>
      <FeaturedLive navigate={navigate} max={4} />
    </section>

    {/* Features grid */}
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 28px' }}>
      <div className="row between" style={{ marginBottom: 36, alignItems: 'flex-end' }}>
        <div>
          <div className="eyebrow">What's inside</div>
          <h2 className="h1" style={{ marginTop: 8 }}>Everything a club captain needs.</h2>
        </div>
        <div className="muted" style={{ maxWidth: 360, fontSize: 14 }}>From the first poster on the locker-room wall to the trophy ceremony — covered.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
      { icon: 'qr', title: 'QR onboarding', body: 'Print one A4 poster. Members scan, register, and they\'re in. No invite-link copy-paste.' },
      { icon: 'bracket', title: 'Brackets that draw themselves', body: 'Single elim, double elim, group + KO, round-robin, ladder. Generated on demand.' },
      { icon: 'court', title: 'Court & schedule manager', body: 'Drag matches into open court slots. Conflict detection, weather rescheduling, automatic notifications.' },
      { icon: 'chart', title: 'Standings & ratings', body: 'Live points table, ATP-style ranking points, and ladder challenge windows — all auto-updated on result entry.' },
      { icon: 'flash', title: 'Two-tap result entry', body: 'Players punch in scores from the court. Both confirm. The bracket and standings update in real time.' },
      { icon: 'shield', title: 'Captain controls', body: 'Approve registrations, freeze rosters mid-season, hand out walkovers, archive past editions.' }].
      map((f, i) =>
      <div key={i} className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-2)', display: 'grid', placeItems: 'center', color: 'var(--primary)' }}>
              <Icon name={f.icon} size={20} />
            </div>
            <h3 className="h3">{f.title}</h3>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 13.5, lineHeight: 1.55 }}>{f.body}</p>
          </div>
      )}
      </div>
    </section>

    {/* How it works strip */}
    <section style={{ background: '#f2f2f2', padding: '80px 28px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="eyebrow">Three steps</div>
        <h2 className="h1" style={{ marginTop: 8, marginBottom: 36 }}>From idea to first serve in under five minutes.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
        { n: '01', t: 'Create your league or cup', b: 'Choose a format, set fees (or don\'t), draft the rules. We populate sensible defaults so you don\'t stare at a blank form.' },
        { n: '02', t: 'Share the QR poster', b: 'A printable A4 with your club\'s branding. Tape it to the clubhouse door. Players scan, fill in their racket-hand, done.' },
        { n: '03', t: 'Manage matches in flow', b: 'Bracket auto-draws. Players record results from courtside. You step in only when there\'s a dispute.' }].
        map((s, i) =>
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="display" style={{ fontSize: 64, color: 'var(--accent)' }}>{s.n}</div>
              <h3 className="h3">{s.t}</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.b}</p>
            </div>
        )}
        </div>
      </div>
    </section>

    {/* Testimonial */}
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 28px', textAlign: 'center' }}>
      <div className="display" style={{ fontSize: 36, lineHeight: 1.25, color: 'var(--ink)' }}>
        "We replaced four spreadsheets, a WhatsApp group, and a paper ladder with CourtZone. Our club secretary got her Sundays back."
      </div>
      <div className="row" style={{ justifyContent: 'center', gap: 12, marginTop: 24 }}>
        <Avatar src={TL_DATA.PLAYERS[1].avatar} name="Marek Lewandowski" size={40} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Marek Lewandowski</div>
          <div className="muted" style={{ fontSize: 12 }}>Captain · TKKF Kraków</div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ maxWidth: 1280, margin: '0 auto 80px', padding: '0 28px' }}>
      <div className="card" style={{ padding: '56px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' }}>
        <div>
          <div className="display" style={{ fontSize: 44, lineHeight: 1.1 }}>Ready to print the first poster?</div>
          <div style={{ marginTop: 10, opacity: 0.85, fontSize: 15 }}>Free for clubs under 50 members. No card required.</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Btn variant="accent" size="lg" iconRight="arrow_right" onClick={() => navigate('public_signup')}>Create account</Btn>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 40, fontSize: 13, color: 'var(--ink-3)' }}>
        <div className="row" style={{ gap: 8 }}>
          <div className="sidebar-brand-mark" style={{ width: 24, height: 24 }} aria-label="CourtZone"></div>
          <span>CourtZone © 2026</span>
        </div>
        <div className="row" style={{ gap: 18, marginLeft: 'auto' }}>
          <span>Privacy</span><span>Terms</span><span>Press kit</span><span>Status</span>
        </div>
      </div>
    </footer>
  </div>;


const About = ({ navigate }) =>
<div>
    <PublicNav navigate={navigate} route="public_about" />
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '80px 28px' }}>
      <div className="eyebrow">About</div>
      <h1 className="h0" style={{ marginTop: 12, fontSize: 64 }}>Built courtside.</h1>
      <p style={{ marginTop: 28, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)' }}>
        CourtZone started in the spring of 2024 in a tin-roofed clubhouse in Mokotów, after a captain spent his fourth weekend trying to redraw a bracket because two players couldn't agree on a score. We're a small team — three engineers, one designer, two club captains who don't let us forget what this is for.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
        <PhotoBox src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=900&fit=crop" ratio="4/5" />
        <PhotoBox src="https://images.unsplash.com/photo-1551773161-9c439e1e0bb1?w=800&h=900&fit=crop" ratio="4/5" />
      </div>
      <h2 className="h2" style={{ marginTop: 56 }}>Our vision</h2>
      <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)' }}>
        Amateur tennis is mostly run by volunteers with day jobs. We think every club should have league-grade tooling, even if their season ends in a barbecue and a hand-painted trophy. So we charge nothing for clubs under 50 members, ever. The big leagues subsidize the small ones.
      </p>
      <h2 className="h2" style={{ marginTop: 40 }}>Principles</h2>
      <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        <li><b>Print-friendly first.</b> Every important screen has a paper version. Locker rooms don't have wifi.</li>
        <li><b>Two-tap interactions.</b> If a player needs more than two taps to enter a score, we redesign.</li>
        <li><b>Captains are users too.</b> Every organizer flow is something a tired person can do at 9pm on a Sunday.</li>
        <li><b>Open data.</b> Export anything, any time. CSV, ICS, PDF.</li>
      </ul>
      <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--line)' }}>
        <div>
          <div className="h3">Want to chat?</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>We respond within a working day, usually faster.</div>
        </div>
        <Btn variant="primary" iconRight="send">hello@courtzone.pl</Btn>
      </div>
    </div>
  </div>;


const HowItWorks = ({ navigate }) =>
<div>
    <PublicNav navigate={navigate} route="public_how" />
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 28px' }}>
      <div className="eyebrow">For organizers</div>
      <h1 className="h0" style={{ marginTop: 12, fontSize: 64 }}>How CourtZone works.</h1>
      <p style={{ maxWidth: 640, marginTop: 24, fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)' }}>
        A walkthrough of a typical season — from setup to the trophy ceremony, with the screens and tools you'll touch along the way.
      </p>
      {[
    { n: '01', t: 'Create your competition', b: 'Pick a format (round-robin, ladder, single elim, etc), set the dates and venue, and decide whether you\'re charging an entry fee. We pre-fill the rules with sensible defaults — you can override anything.', img: 'https://images.unsplash.com/photo-1551757055-b8d40f1c1fa9?w=900&h=600&fit=crop' },
    { n: '02', t: 'Print the registration poster', b: 'CourtZone generates an A4 poster with your league\'s name, your club\'s logo, and a single big QR. Print it. Tape it to the clubhouse door. Players scan it, hit "I\'m in", and they\'re registered.', img: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=900&h=600&fit=crop' },
    { n: '03', t: 'Generate the bracket or seed the ladder', b: 'For knockout cups, we draw the bracket from your seedings (auto or manual). For ladders, players claim their starting position with a 1-set qualifier. For round-robins, the schedule self-populates.', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=900&h=600&fit=crop' },
    { n: '04', t: 'Players record results from courtside', b: 'Both players punch in the score on their phones; the system reconciles. If they disagree, you get a notification with both inputs side-by-side and one tap to resolve.', img: 'https://images.unsplash.com/photo-1527171647209-450b3f4ec0a4?w=900&h=600&fit=crop' },
    { n: '05', t: 'Standings update live; you stay out of the way', b: 'The bracket re-draws after each round. Points tables update in real time. Notifications go out automatically. You only step in when there\'s a dispute or a walkover.', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&h=600&fit=crop' }].
    map((s, i) =>
    <div key={i} style={{ display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1.1fr' : '1.1fr 1fr', gap: 40, alignItems: 'center', marginTop: 64 }}>
          <div style={{ order: i % 2 ? 2 : 1 }}>
            <div className="display" style={{ fontSize: 56, color: 'var(--accent)' }}>{s.n}</div>
            <h2 className="h2" style={{ marginTop: 4 }}>{s.t}</h2>
            <p style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>{s.b}</p>
          </div>
          <PhotoBox src={s.img} ratio="4/3" style={{ order: i % 2 ? 1 : 2, borderRadius: 16 }} />
        </div>
    )}
      <div style={{ marginTop: 80, textAlign: 'center' }}>
        <Btn variant="primary" size="lg" iconRight="arrow_right" onClick={() => navigate('public_signup')}>Create your first league</Btn>
      </div>
    </div>
  </div>;


const SignUp = ({ navigate }) => {
  const [role, setRole] = useState('player');
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.1fr' }}>
      <div style={{ position: 'relative' }}>
        <PhotoBox src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=1600&fit=crop" ratio="auto" style={{ height: '100vh', borderRadius: 0 }} />
        <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.55))', color: 'white' }}>
          <div className="row" style={{ gap: 10, cursor: 'pointer' }} onClick={() => navigate('public_landing')}>
            <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
            <div className="sidebar-brand-name" style={{ color: 'white' }}>CourtZone</div>
          </div>
          <div>
            <div className="display" style={{ fontSize: 44, lineHeight: 1.1 }}>"Joined a league on Tuesday. Played my first match Wednesday."</div>
            <div style={{ marginTop: 16, opacity: 0.85 }}>— Hanna Kowalczyk, Gdańsk</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 className="h1">Create your account.</h1>
          <p className="muted" style={{ marginTop: 6 }}>Free forever for clubs under 50 members.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 28 }}>
            {['player', 'organizer'].map((r) =>
            <button key={r} onClick={() => setRole(r)}
            style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 12, textAlign: 'left',
              background: role === r ? 'var(--surface)' : 'transparent',
              borderColor: role === r ? 'var(--primary)' : 'var(--line)',
              boxShadow: role === r ? '0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent)' : 'none' }}>
                <Icon name={r === 'player' ? 'tennis' : 'shield'} size={20} />
                <div style={{ fontWeight: 700, marginTop: 6 }}>I'm a {r}</div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>
                  {r === 'player' ? 'Joining leagues, tracking matches' : 'Running a club or competition'}
                </div>
              </button>
            )}
          </div>

          <form style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            <Field label="Full name"><input className="input" defaultValue="Iga Górski" /></Field>
            <Field label="Email"><input className="input" type="email" defaultValue="iga@example.com" /></Field>
            <Field label="Password" hint="At least 8 characters, one number"><input className="input" type="password" defaultValue="••••••••••" /></Field>
            <label className="checkbox" style={{ marginTop: 4 }}>
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: 12 }}>I agree to the <u>Terms</u> and <u>Privacy Policy</u></span>
            </label>
            <Btn variant="primary" block size="lg" iconRight="arrow_right" style={{ background: '#85b201', borderColor: '#85b201', color: '#fff' }} onClick={() => navigate(role === 'organizer' ? 'o_dashboard' : 'p_dashboard')}>Create account</Btn>
          </form>

          <div className="row" style={{ gap: 8, margin: '20px 0', alignItems: 'center' }}>
            <div className="grow divider" />
            <span className="muted mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>OR</span>
            <div className="grow divider" />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <Btn variant="soft" block icon="mail">Continue with Google</Btn>
            <Btn variant="soft" block icon="user">Continue with Apple</Btn>
          </div>

          <div className="muted" style={{ marginTop: 24, fontSize: 13, textAlign: 'center' }}>
            Already have an account? <a onClick={() => navigate('public_login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Log in</a>
          </div>
        </div>
      </div>
    </div>);

};

const Login = ({ navigate }) =>
<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 40, background: 'var(--bg)' }}>
    <div style={{ width: '100%', maxWidth: 400 }}>
      <div className="row" style={{ gap: 10, justifyContent: 'center', marginBottom: 24, cursor: 'pointer' }} onClick={() => navigate('public_landing')}>
        <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
        <div className="sidebar-brand-name">Court<b>Zone</b></div>
      </div>
      <div className="card" style={{ padding: 32 }}>
        <h1 className="h2" style={{ textAlign: 'center' }}>Welcome back.</h1>
        <p className="muted" style={{ textAlign: 'center', marginTop: 4, fontSize: 13 }}>Pick up where you left off — three matches scheduled this week.</p>
        <form style={{ display: 'grid', gap: 14, marginTop: 24 }}>
          <Field label="Email"><input className="input" type="email" defaultValue="iga@example.com" /></Field>
          <Field label="Password">
            <div style={{ position: 'relative' }}>
              <input className="input" type="password" defaultValue="••••••••••" style={{ width: '100%' }} />
              <Icon name="eye" size={15} className="muted" style={{ position: 'absolute', right: 12, top: 12 }} />
            </div>
          </Field>
          <div className="row between" style={{ fontSize: 12 }}>
            <label className="checkbox"><input type="checkbox" defaultChecked /><span>Remember me</span></label>
            <a onClick={() => navigate('public_reset')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</a>
          </div>
          <Btn variant="primary" block size="lg" style={{ background: '#85b201', borderColor: '#85b201', color: '#fff' }} onClick={() => navigate('p_dashboard')}>Log in</Btn>
        </form>
        <div className="row" style={{ gap: 8, margin: '18px 0', alignItems: 'center' }}>
          <div className="grow divider" /><span className="muted mono" style={{ fontSize: 10 }}>OR</span><div className="grow divider" />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <Btn variant="soft" block icon="mail">Continue with Google</Btn>
          <Btn variant="soft" block icon="user">Continue with Apple</Btn>
        </div>
      </div>
      <div className="muted" style={{ marginTop: 20, fontSize: 13, textAlign: 'center' }}>
        New here? <a onClick={() => navigate('public_signup')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Create account</a>
      </div>
    </div>
  </div>;


const PasswordReset = ({ navigate }) => {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 40, background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div className="row" style={{ gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
          <div className="sidebar-brand-name">Court<b>Zone</b></div>
        </div>
        <div className="card" style={{ padding: 32, textAlign: 'center' }}>
          {!sent ?
          <>
              <div style={{ width: 56, height: 56, margin: '0 auto', borderRadius: 14, background: 'var(--bg-2)', display: 'grid', placeItems: 'center', color: 'var(--primary)' }}>
                <Icon name="mail" size={24} />
              </div>
              <h1 className="h2" style={{ marginTop: 16 }}>Reset password</h1>
              <p className="muted" style={{ marginTop: 6, fontSize: 13 }}>Enter the email tied to your account and we'll send a reset link.</p>
              <form style={{ display: 'grid', gap: 14, marginTop: 24, textAlign: 'left' }} onSubmit={(e) => {e.preventDefault();setSent(true);}}>
                <Field label="Email"><input className="input" type="email" defaultValue="iga@example.com" autoFocus /></Field>
                <Btn type="submit" variant="primary" block size="lg" onClick={() => setSent(true)}>Send reset link</Btn>
              </form>
            </> :

          <>
              <div style={{ width: 56, height: 56, margin: '0 auto', borderRadius: 14, background: 'color-mix(in srgb, var(--good) 18%, var(--surface))', display: 'grid', placeItems: 'center', color: 'var(--good)' }}>
                <Icon name="check" size={24} />
              </div>
              <h1 className="h2" style={{ marginTop: 16 }}>Check your inbox</h1>
              <p className="muted" style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55 }}>
                We've sent a reset link to <b style={{ color: 'var(--ink)' }}>iga@example.com</b>. The link is valid for 30 minutes.
              </p>
              <Btn variant="ghost" block style={{ marginTop: 20 }} onClick={() => setSent(false)}>Use a different email</Btn>
            </>
          }
        </div>
        <div className="muted" style={{ marginTop: 20, fontSize: 13, textAlign: 'center' }}>
          <a onClick={() => navigate('public_login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>← Back to login</a>
        </div>
      </div>
    </div>);

};

export { Landing, About, HowItWorks, SignUp, Login, PasswordReset, PublicNav };