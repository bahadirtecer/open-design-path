// @ts-nocheck
import { useMemo, useState } from 'react';
import { Icon } from '@/lib/icons';
import { Btn, Card, PageHeader } from '@/components/courtzone/atoms';
import { useFacilities, type Facility } from '@/lib/use-facilities';
import { FacilityModal } from '@/components/courtzone/FacilityPicker';

// Warsaw bounding box used to project lat/lng → SVG coords.
const BBOX = { minLat: 52.10, maxLat: 52.32, minLng: 20.88, maxLng: 21.18 };
const W = 800;
const H = 420;

const project = (lat?: number, lng?: number) => {
  if (lat == null || lng == null) return null;
  const x = ((lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng)) * W;
  const y = (1 - (lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * H;
  return { x: Math.max(20, Math.min(W - 20, x)), y: Math.max(20, Math.min(H - 20, y)) };
};

const surfaceColor = (s: string) => ({
  Clay: 'oklch(0.68 0.16 40)',
  Hard: 'oklch(0.65 0.16 240)',
  Indoor: 'oklch(0.62 0.16 290)',
  Grass: 'oklch(0.65 0.16 145)',
}[s] || 'var(--primary)');

const FacilityMap = ({ list, activeId, onPick }: any) => (
  <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'1px solid var(--line)' }}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block', background:
      'linear-gradient(135deg, color-mix(in srgb, var(--primary) 6%, var(--surface-2)), var(--surface-2))' }}>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="color-mix(in srgb, var(--ink) 8%, transparent)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#grid)"/>
      {/* Decorative river */}
      <path d="M 0 240 C 150 220, 250 320, 380 280 S 620 180, 800 230"
        fill="none" stroke="color-mix(in srgb, var(--primary) 25%, transparent)" strokeWidth="22" strokeLinecap="round"/>
      {list.map((f: Facility) => {
        const p = project(f.lat, f.lng);
        if (!p) return null;
        const active = f.id === activeId;
        return (
          <g key={f.id} style={{ cursor:'pointer' }} onClick={() => onPick(f.id)}>
            <circle cx={p.x} cy={p.y} r={active ? 18 : 14} fill={surfaceColor(f.surface)} opacity="0.18"/>
            <circle cx={p.x} cy={p.y} r={active ? 9 : 6} fill={surfaceColor(f.surface)} stroke="white" strokeWidth="2"/>
            {active && (
              <g transform={`translate(${p.x + 14}, ${p.y - 10})`}>
                <rect x="0" y="0" rx="6" ry="6" width={Math.min(220, f.name.length * 7 + 24)} height="38"
                  fill="var(--bg)" stroke="var(--line)"/>
                <text x="12" y="16" fontSize="12" fontWeight="600" fill="var(--ink)">{f.name}</text>
                <text x="12" y="30" fontSize="10" fill="var(--ink-3)">{f.surface} · {f.ownerLabel}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
    <div style={{ position:'absolute', left:12, top:12, background:'var(--bg)', border:'1px solid var(--line)',
      borderRadius:8, padding:'6px 10px', fontSize:11, display:'flex', gap:10, alignItems:'center' }}>
      <Icon name="pin" size={12} className="muted"/> <b>Warszawa</b>
      <span className="muted">· {list.length} facilities</span>
    </div>
    <div style={{ position:'absolute', right:12, bottom:12, background:'var(--bg)', border:'1px solid var(--line)',
      borderRadius:8, padding:'8px 10px', fontSize:11, display:'flex', gap:12 }}>
      {['Clay','Hard','Indoor','Grass'].map((s) => (
        <span key={s} style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
          <span style={{ width:8, height:8, borderRadius:99, background:surfaceColor(s) }}/>{s}
        </span>
      ))}
    </div>
  </div>
);

const Stat = ({ label, value, hint, icon }: any) => (
  <div style={{ padding:14, borderRadius:12, border:'1px solid var(--line)', background:'var(--surface)' }}>
    <div className="row" style={{ justifyContent:'space-between', alignItems:'flex-start' }}>
      <div className="eyebrow">{label}</div>
      <Icon name={icon} size={14} className="muted"/>
    </div>
    <div style={{ fontSize:26, fontWeight:700, marginTop:6 }}>{value}</div>
    {hint && <div className="muted" style={{ fontSize:11.5, marginTop:2 }}>{hint}</div>}
  </div>
);

export const AdminFacilities = () => {
  // Admin scope: show every facility on the platform (admin + player owned).
  const { all, add } = useFacilities('admin');
  const [activeId, setActiveId] = useState<string | null>(all[0]?.id || null);
  const [modal, setModal] = useState(false);

  const stats = useMemo(() => {
    const shared = all.filter((f) => f.sharedPublic).length;
    const bySurface: Record<string, number> = {};
    all.forEach((f) => { bySurface[f.surface] = (bySurface[f.surface] || 0) + 1; });
    const top = Object.entries(bySurface).sort((a,b)=>b[1]-a[1])[0];
    return {
      total: all.length, shared,
      private: all.length - shared,
      topSurface: top ? `${top[0]} · ${top[1]}` : '—',
    };
  }, [all]);

  const active = all.find((f) => f.id === activeId);

  return (
    <div style={{ display:'grid', gap:16 }}>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <div className="eyebrow">Admin · Facilities</div>
          <h1 style={{ margin:'4px 0 0', fontSize:24 }}>Facility management</h1>
          <div className="muted" style={{ fontSize:12, marginTop:2 }}>
            Every court & venue on the platform. Admin-owned facilities can be published as shared.
          </div>
        </div>
        <Btn variant="primary" icon="plus" onClick={() => setModal(true)}>New facility</Btn>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
        <Stat label="Total facilities" value={stats.total} icon="court" hint="Owned by admins + players"/>
        <Stat label="Shared publicly" value={stats.shared} icon="broadcast" hint="Available to all organizers"/>
        <Stat label="Private" value={stats.private} icon="lock" hint="Only the owner can use"/>
        <Stat label="Top surface" value={stats.topSurface} icon="tennis" hint="Most common court type"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        <Card title="Facilities map" action={
          <span className="muted" style={{ fontSize:11 }}>Click a pin to inspect</span>
        }>
          <FacilityMap list={all} activeId={activeId} onPick={setActiveId}/>
        </Card>

        <Card title={active ? active.name : 'Select a facility'} action={
          active && <span className="chip" style={{ background:'var(--surface-2)' }}>{active.surface}</span>
        }>
          {active ? (
            <div style={{ display:'grid', gap:10, fontSize:13 }}>
              <Row icon="pin" label="Location">{active.location}</Row>
              <Row icon="clock" label="Hours">{active.hoursFrom && active.hoursTo ? `${active.hoursFrom} – ${active.hoursTo}` : 'Not set'}</Row>
              <Row icon="user" label="Owner">{active.ownerLabel} <span className="muted">· {active.ownerRole}</span></Row>
              <Row icon={active.sharedPublic ? 'broadcast' : 'lock'} label="Visibility">
                {active.sharedPublic ? 'Shared with all organizers' : 'Private to owner'}
              </Row>
              <Row icon="target" label="Coordinates">
                <span className="mono">{active.lat?.toFixed(4)}, {active.lng?.toFixed(4)}</span>
              </Row>
            </div>
          ) : (
            <div className="muted" style={{ fontSize:12 }}>Pick a facility on the map to see details.</div>
          )}
        </Card>
      </div>

      <Card title="All facilities" action={
        <span className="muted" style={{ fontSize:11 }}>{all.length} total</span>
      }>
        <div style={{ overflow:'auto' }}>
          <table className="table" style={{ width:'100%', fontSize:13 }}>
            <thead>
              <tr>
                <th style={{ textAlign:'left' }}>Name</th>
                <th style={{ textAlign:'left' }}>Surface</th>
                <th style={{ textAlign:'left' }}>Hours</th>
                <th style={{ textAlign:'left' }}>Owner</th>
                <th style={{ textAlign:'left' }}>Visibility</th>
              </tr>
            </thead>
            <tbody>
              {all.map((f) => (
                <tr key={f.id} onClick={() => setActiveId(f.id)}
                  style={{ cursor:'pointer', background: f.id===activeId ? 'var(--surface-2)' : 'transparent' }}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:8, height:8, borderRadius:99, background:surfaceColor(f.surface) }}/>
                      <b>{f.name}</b>
                    </div>
                    <div className="muted" style={{ fontSize:11 }}>{f.location}</div>
                  </td>
                  <td>{f.surface}</td>
                  <td>{f.hoursFrom && f.hoursTo ? `${f.hoursFrom}–${f.hoursTo}` : <span className="muted">—</span>}</td>
                  <td>{f.ownerLabel}</td>
                  <td>
                    {f.sharedPublic
                      ? <span className="chip" style={{ background:'color-mix(in srgb, var(--primary) 14%, transparent)', color:'var(--primary)' }}>Shared</span>
                      : <span className="chip" style={{ background:'var(--surface-2)' }}>Private</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {modal && <FacilityModal onClose={() => setModal(false)} onCreated={(f) => setActiveId(f.id)}/>}
    </div>
  );
};

const Row = ({ icon, label, children }: any) => (
  <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:8, alignItems:'center' }}>
    <span className="muted" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11.5 }}>
      <Icon name={icon} size={12}/> {label}
    </span>
    <span>{children}</span>
  </div>
);
