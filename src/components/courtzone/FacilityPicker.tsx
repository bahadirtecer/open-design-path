// @ts-nocheck
import * as React from 'react';
import { useState } from 'react';
import { Icon } from '@/lib/icons';
import { Btn, Field } from '@/components/courtzone/atoms';
import { useFacilities, type Facility } from '@/lib/use-facilities';
import { useTweaks } from '@/lib/use-tweaks';

// Inline modal — no external dialog dep, matches existing CompetitionPicker style.
const Modal = ({ onClose, children }: any) => (
  <div onClick={onClose}
    style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:100, display:'grid', placeItems:'center', padding:20 }}>
    <div onClick={(e)=>e.stopPropagation()}
      style={{ background:'var(--bg)', borderRadius:14, border:'1px solid var(--line)', padding:24, width:'100%', maxWidth:560, maxHeight:'90vh', overflow:'auto' }}>
      {children}
    </div>
  </div>
);

// Decorative map preview — placeholder for Google Maps picker
const MapPick = ({ location, onLocationChange }: any) => (
  <div style={{ border:'1px solid var(--line)', borderRadius:10, overflow:'hidden' }}>
    <div style={{
      height: 160, position:'relative',
      background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, var(--surface-2)), var(--surface-2))',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 24px, color-mix(in srgb, var(--ink) 6%, transparent) 24px 25px), repeating-linear-gradient(90deg, transparent 0 24px, color-mix(in srgb, var(--ink) 6%, transparent) 24px 25px)',
    }}>
      <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-100%)', color:'var(--primary)' }}>
        <Icon name="pin" size={28}/>
      </div>
      <div style={{ position:'absolute', bottom:8, right:8, fontSize:10, color:'var(--ink-3)', background:'var(--bg)', padding:'2px 6px', borderRadius:4 }}>
        Google Maps preview
      </div>
    </div>
    <div style={{ display:'flex', gap:6, padding:8, borderTop:'1px solid var(--line)', background:'var(--surface)' }}>
      <Icon name="search" size={14} style={{ alignSelf:'center', color:'var(--ink-3)' }}/>
      <input className="input" style={{ flex:1, height:30 }} placeholder="Search address on Google Maps"
        value={location} onChange={(e)=>onLocationChange(e.target.value)}/>
    </div>
  </div>
);

export const FacilityModal = ({ onClose, onCreated }: { onClose: () => void; onCreated: (f: Facility) => void }) => {
  const [t] = useTweaks();
  const { add } = useFacilities(t.role);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [surface, setSurface] = useState('Hard');
  const [hoursFrom, setHoursFrom] = useState('');
  const [hoursTo, setHoursTo] = useState('');
  const [shared, setShared] = useState(false);
  const canSave = name.trim() && location.trim();

  const submit = () => {
    if (!canSave) return;
    const f = add({ name, location, surface, hoursFrom, hoursTo, sharedPublic: shared } as any);
    onCreated(f);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
        <div>
          <div className="eyebrow">New facility</div>
          <div style={{ fontSize:20, fontWeight:700, marginTop:4 }}>Add a facility</div>
          <div className="muted" style={{ fontSize:12, marginTop:2 }}>Only you can use this facility{t.role === 'admin' ? ' — unless you mark it as shared.' : '.'}</div>
        </div>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--ink-3)' }}>
          <Icon name="x" size={18}/>
        </button>
      </div>

      <div style={{ display:'grid', gap:14 }}>
        <Field label="Facility name">
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Mokotów Tennis Club"/>
        </Field>
        <Field label="Location" hint="Pick on Google Maps">
          <MapPick location={location} onLocationChange={setLocation}/>
        </Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
          <Field label="Court surface">
            <select className="select" value={surface} onChange={(e)=>setSurface(e.target.value)}>
              <option>Clay</option><option>Hard</option><option>Indoor</option><option>Grass</option>
            </select>
          </Field>
          <Field label="Open from" hint="Optional">
            <input className="input" type="time" value={hoursFrom} onChange={(e)=>setHoursFrom(e.target.value)}/>
          </Field>
          <Field label="Open until" hint="Optional">
            <input className="input" type="time" value={hoursTo} onChange={(e)=>setHoursTo(e.target.value)}/>
          </Field>
        </div>
        <div className="muted" style={{ fontSize:11.5, marginTop:-4 }}>
          Available hours feed the auto-scheduler when generating fixtures for leagues & tournaments.
        </div>

        {t.role === 'admin' && (
          <label style={{
            display:'flex', alignItems:'center', gap:10, padding:12, borderRadius:10,
            border:'1px solid var(--line)', background:'var(--surface-2)', cursor:'pointer',
          }}>
            <input type="checkbox" checked={shared} onChange={(e)=>setShared(e.target.checked)}
              style={{ width:18, height:18, accentColor:'var(--primary)' }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600 }}>Share publicly with all organizers</div>
              <div className="muted" style={{ fontSize:11.5 }}>Only admins can publish facilities (e.g. municipal courts) for everyone to use.</div>
            </div>
          </label>
        )}

        <div className="row" style={{ justifyContent:'flex-end', gap:8, marginTop:8 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" icon="check" onClick={submit} disabled={!canSave}>Save facility</Btn>
        </div>
      </div>
    </Modal>
  );
};

export const FacilityPicker = ({ value, onChange }: { value?: string; onChange: (id: string) => void }) => {
  const [t] = useTweaks();
  const { facilities } = useFacilities(t.role);
  const [open, setOpen] = useState(false);

  // Ensure value resolves to an option; default to the first visible facility.
  React.useEffect(() => {
    if (!value && facilities[0]) onChange(facilities[0].id);
  }, [facilities, value, onChange]);

  return (
    <>
      <div className="row" style={{ gap:8 }}>
        <select className="select grow" value={value || ''} onChange={(e)=>onChange(e.target.value)}>
          {facilities.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}{f.ownerRole === 'admin' && f.sharedPublic ? ' · shared' : ''}
            </option>
          ))}
        </select>
        <Btn variant="soft" size="sm" icon="plus" onClick={()=>setOpen(true)}>New facility</Btn>
      </div>
      {open && <FacilityModal onClose={()=>setOpen(false)} onCreated={(f)=>onChange(f.id)}/>}
    </>
  );
};
