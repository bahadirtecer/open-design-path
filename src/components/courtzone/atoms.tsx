// @ts-nocheck
import * as React from 'react';
import { useMemo } from 'react';
import { Icon } from '@/lib/icons';

export const Avatar = ({ src, name, size = 36, className = '' }: any) => {
  const initials = (name || '?').split(' ').slice(0, 2).map((s: string) => s[0]).join('').toUpperCase();
  if (src) return <img className={`avatar ${className}`} src={src} alt={name} style={{ width: size, height: size }} />;
  return (
    <span className={`avatar ${className}`} style={{ width: size, height: size, display: 'inline-grid', placeItems: 'center', fontSize: size * 0.36, fontWeight: 700, background: 'var(--bg-2)', color: 'var(--ink-2)' }}>
      {initials}
    </span>
  );
};

export const Stat = ({ label, value, delta, deltaDir = 'up', icon }: any) => (
  <div className="stat">
    <div className="row between"><span className="stat-label">{label}</span>{icon && <Icon name={icon} size={14} />}</div>
    <div className="stat-value">{value}</div>
    {delta && <div className={`stat-delta ${deltaDir}`}>{deltaDir === 'up' ? '▲' : '▼'} {delta}</div>}
  </div>
);

export const Chip = ({ children, tone = '', dot = false }: any) => (
  <span className={`chip ${tone ? 'chip-' + tone : ''} ${dot ? 'chip-dot' : ''}`}>{children}</span>
);

export const Btn = ({ variant = 'primary', size, block, icon, iconRight, children, onClick, type, disabled, style }: any) => (
  <button type={type || 'button'} disabled={disabled} onClick={onClick}
    style={style}
    className={`btn btn-${variant} ${size ? 'btn-' + size : ''} ${block ? 'btn-block' : ''}`}>
    {icon && <Icon name={icon} size={size === 'sm' ? 13 : 15} />}
    {children}
    {iconRight && <Icon name={iconRight} size={size === 'sm' ? 13 : 15} />}
  </button>
);

export const Field = ({ label, hint, children, span }: any) => (
  <div className="field" style={span ? { gridColumn: `span ${span}` } : {}}>
    {label && <label>{label}</label>}
    {children}
    {hint && <span className="hint">{hint}</span>}
  </div>
);

export const Card = ({ title, action, children, pad = true, className = '' }: any) => (
  <div className={`card ${className}`}>
    {title && (
      <div className="card-head">
        <h3>{title}</h3>
        {action && <div className="actions">{action}</div>}
      </div>
    )}
    {pad ? <div className="card-body">{children}</div> : children}
  </div>
);

export const PhotoBox = ({ src, label, ratio = '16/9', className = '', style = {}, children }: any) => (
  <div className={`photo ${src ? '' : 'photo-placeholder'} ${className}`}
    style={{ aspectRatio: ratio, backgroundImage: src ? `url(${src})` : 'none', ...style }}>
    {!src && <span>{label || 'PLACEHOLDER'}</span>}
    {children}
  </div>
);

export const Tabs = ({ tabs, active, onChange }: any) => (
  <div className="tabs">
    {tabs.map((t: any) => (
      <button key={t.id} className="tab" data-active={active === t.id} onClick={() => onChange(t.id)}>
        {t.label}{t.count != null && <span className="muted" style={{ marginLeft: 6, fontWeight: 500 }}>{t.count}</span>}
      </button>
    ))}
  </div>
);

export const PillGroup = ({ options, value, onChange }: any) => (
  <div className="pill-group">
    {options.map((o: any) => (
      <button key={o.value} data-active={value === o.value} onClick={() => onChange(o.value)}>{o.label}</button>
    ))}
  </div>
);

export const QRGlyph = ({ size = 240, value = 'COURTZONE-WTC-2026', color = '#15211c' }: any) => {
  const N = 25;
  const cells = useMemo(() => {
    const seed = [...value].reduce((s: number, c: string) => s * 31 + c.charCodeAt(0), 7);
    let r = seed;
    const rand = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    const grid = Array(N * N).fill(0).map(() => rand() > 0.52 ? 1 : 0);
    const finder = (cx: number, cy: number) => {
      for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        const onBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[(cy + y) * N + (cx + x)] = onBorder || inner ? 1 : 0;
      }
    };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    return grid;
  }, [value]);
  const cs = size / N;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="white" />
      {cells.map((v: number, i: number) => v ? (
        <rect key={i} x={(i % N) * cs} y={Math.floor(i / N) * cs} width={cs} height={cs} fill={color} rx={cs * 0.15} />
      ) : null)}
    </svg>
  );
};

export const ScoreInput = ({ value, onChange, max = 7 }: any) => (
  <input type="number" min={0} max={max} value={value} onChange={(e) => onChange(e.target.value)}
    className="input" style={{ width: 56, textAlign: 'center', fontFamily: 'var(--font-mono)', padding: '8px 0' }} />
);

export const MatchRow = ({ m, onClick, mineHighlight = true }: any) => {
  const isMine = mineHighlight && m.mine;
  return (
    <div className="card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', borderColor: isMine ? 'var(--accent)' : undefined }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ minWidth: 60 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{m.round}</div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{m.date}</div>
        </div>
        <div className="grow row" style={{ gap: 8 }}>
          <Avatar src={m.p1.avatar} name={m.p1.name} size={28} />
          <span style={{ fontSize: 13, fontWeight: m.score && m.score.startsWith('6') ? 700 : 500 }}>{m.p1.name}</span>
          <span className="muted" style={{ margin: '0 6px' }}>vs</span>
          <Avatar src={m.p2.avatar} name={m.p2.name} size={28} />
          <span style={{ fontSize: 13 }}>{m.p2.name}</span>
        </div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 600, minWidth: 130, textAlign: 'right' }}>{m.score}</div>
        <div style={{ width: 110, textAlign: 'right' }}>
          {m.status === 'completed' && <Chip tone="good" dot>Final</Chip>}
          {m.status === 'scheduled' && <Chip tone="primary" dot>Scheduled</Chip>}
          {m.status === 'pending_confirm' && <Chip tone="warn" dot>Confirm</Chip>}
        </div>
      </div>
    </div>
  );
};

export const EntityCard = ({ e, kind, onClick }: any) => (
  <div className="card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={onClick}>
    <PhotoBox src={e.cover} ratio="16/8" style={{ borderRadius: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55))' }} />
      <div style={{ position: 'relative', padding: 14, display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="row" style={{ gap: 6 }}>
          {e.status === 'active' && <Chip tone="good" dot>Live</Chip>}
          {e.status === 'upcoming' && <Chip tone="primary" dot>Soon</Chip>}
          {e.status === 'past' && <Chip dot>Past</Chip>}
          {kind === 'tournament' && <Chip tone="accent">{e.fee}</Chip>}
        </div>
        <div style={{ marginTop: 'auto', color: 'white' }}>
          <div className="mono" style={{ fontSize: 10, opacity: .85, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{e.surface} · {e.format}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'var(--display-italic)', fontSize: 22, lineHeight: 1.1 }}>{e.name}</div>
        </div>
      </div>
    </PhotoBox>
    <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="row" style={{ gap: 10, fontSize: 12, color: 'var(--ink-2)' }}>
        <span className="row" style={{ gap: 4 }}><Icon name="pin" size={13} />{e.city}</span>
        <span className="row" style={{ gap: 4 }}><Icon name="users" size={13} />{e.players}</span>
        <span className="row" style={{ gap: 4 }}><Icon name="calendar" size={13} />{kind === 'tournament' ? e.date : `${e.start}–${e.end}`}</span>
      </div>
      <Icon name="arrow_right" size={14} />
    </div>
  </div>
);

export const Bracket = ({ data, layout = 'horizontal' }: any) => (
  <div className="bracket" data-bracket-layout={layout} style={{ flexDirection: layout === 'vertical' ? 'column' : 'row' }}>
    {data.rounds.map((r: any, ri: number) => (
      <div key={ri} className="bracket-round" style={layout === 'vertical' ? { flexDirection: 'row', minWidth: 'auto' } : {}}>
        <div className="bracket-round-label">{r.name}</div>
        {r.matches.map((m: any) => (
          <div key={m.id} className="bracket-match" data-mine={m.mine || undefined}>
            {(['p1', 'p2'] as const).map((k, idx) => {
              const isWinner = m.winner === k;
              return (
                <div key={k} className="bracket-row" data-winner={m.winner ? (isWinner ? 'true' : 'false') : undefined}>
                  <div className="br-name">
                    <span className="br-seed">{m[k].seed || ''}</span>
                    {m[k].avatar ? <Avatar src={m[k].avatar} name={m[k].name} size={20} /> : null}
                    <span>{m[k].name}</span>
                  </div>
                  <div className="br-score">
                    {(idx === 0 ? m.scores : m.oscores).map((s: any, i: number) => <span key={i}>{s}</span>)}
                  </div>
                </div>
              );
            })}
            {m.pending && <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: 'var(--warn)' }}>● Live</div>}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Phone = ({ children, status = '9:41' }: any) => (
  <div className="phone-frame">
    <div className="phone-screen">
      <div className="phone-status">
        <span>{status}</span>
        <span style={{ display: 'flex', gap: 5, fontSize: 11 }}>
          <span>●●●●</span><span>WiFi</span><span>100</span>
        </span>
      </div>
      <div className="phone-content">{children}</div>
    </div>
  </div>
);

export const PhoneTabBar = ({ active = 'home', onChange }: any) => {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'play', icon: 'trophy', label: 'Play' },
    { id: 'scan', icon: 'qr', label: 'Scan' },
    { id: 'msg', icon: 'bell', label: 'Inbox' },
    { id: 'me', icon: 'user', label: 'Profile' },
  ];
  return (
    <div className="phone-tabbar">
      {tabs.map((t) => (
        <button key={t.id} className="phone-tab" data-active={active === t.id} onClick={() => onChange && onChange(t.id)}>
          <Icon name={t.icon} size={20} className="pt-ico" />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export const Sparkline = ({ data, color = 'var(--primary)', width = 120, height = 36 }: any) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d: number, i: number) => `${(i / (data.length - 1)) * width},${height - ((d - min) / (max - min || 1)) * height * 0.9 - 2}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" points={pts} />
      <polyline fill={color} fillOpacity={0.12} stroke="none" points={`0,${height} ${pts} ${width},${height}`} />
    </svg>
  );
};

export const Bars = ({ data, color = 'var(--primary)', height = 120 }: any) => {
  const max = Math.max(...data.map((d: any) => d.v));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {data.map((d: any, i: number) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', height: `${(d.v / max) * 100}%`, background: color, borderRadius: 4, opacity: 0.85 }} />
          <span className="mono muted" style={{ fontSize: 9 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

export const PageHeader = ({ eyebrow, title, sub, action }: any) => (
  <div className="row between" style={{ marginBottom: 24, alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
    <div>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
      <h1 className="h1">{title}</h1>
      {sub && <div className="muted" style={{ marginTop: 6, fontSize: 14, maxWidth: 600 }}>{sub}</div>}
    </div>
    {action && <div className="row" style={{ gap: 8 }}>{action}</div>}
  </div>
);
