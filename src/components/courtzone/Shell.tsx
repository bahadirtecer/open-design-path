// @ts-nocheck
import { Icon } from '@/lib/icons';
import { Avatar } from './atoms';
import { PLAYERS } from '@/lib/mock-data';

const NAV: any[] = [
  { section: 'Play' },
  { id: 'p_dashboard', label: 'Dashboard', icon: 'dashboard', role: 'all' },
  { id: 'p_my', label: 'My leagues & cups', icon: 'trophy', role: 'all' },
  { id: 'p_matches', label: 'Match history', icon: 'flash', role: 'all' },
  { id: 'p_browse_l', label: 'Browse leagues', icon: 'flag', role: 'all', count: 14 },
  { id: 'p_browse_t', label: 'Browse tournaments', icon: 'bracket', role: 'all', count: 8 },
  { section: 'Organize' },
  { id: 'o_dashboard', label: 'Organizer hub', icon: 'shield', role: 'all' },
  { id: 'o_match_l', label: 'Match management', icon: 'court', role: 'all' },
  { section: 'Admin', role: 'admin' },
  { id: 'a_dashboard', label: 'Platform overview', icon: 'chart', role: 'admin' },
  { id: 'a_users', label: 'User management', icon: 'users', role: 'admin' },
  { id: 'a_orgs', label: 'Organizations', icon: 'shield', role: 'admin' },
  { id: 'a_reports', label: 'Reports', icon: 'chart', role: 'admin' },
  { section: 'Account' },
  { id: 'u_profile', label: 'My profile', icon: 'user', role: 'all' },
  { id: 'u_notifications', label: 'Notifications', icon: 'bell', role: 'all', count: 3 },
  { id: 'u_messages', label: 'Inbox', icon: 'mail', role: 'all', count: 2 },
  { id: 'u_qr', label: 'QR scanner', icon: 'qr', role: 'all' },
];

export const Sidebar = ({ activeId, navigate, role }: any) => {
  const visible = NAV.filter((item) => {
    if (item.section) return !item.role || item.role === role || role === 'admin';
    if (role === 'admin') return true;
    // Player can access everything except admin-only items.
    return item.role !== 'admin';
  });
  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={() => navigate('public_landing')} style={{ cursor: 'pointer' }}>
        <div className="sidebar-brand-mark" aria-label="CourtZone"></div>
        <div className="sidebar-brand-name">Court<b>Zone</b></div>
      </div>
      {visible.map((item, i) => item.section ? (
        <div key={'s' + i} className="sidebar-section">{item.section}</div>
      ) : (
        <div key={item.id} className="nav-item" data-active={activeId === item.id} onClick={() => navigate(item.id)}>
          <Icon name={item.icon} size={16} className="ni-ico" />
          <span>{item.label}</span>
          {item.count != null && <span className="ni-count">{item.count}</span>}
        </div>
      ))}
      <div className="sidebar-footer">
        <Avatar src={PLAYERS[0].avatar} name={PLAYERS[0].name} size={32} />
        <div className="grow">
          <div className="uname">{PLAYERS[0].name}</div>
          <div className="urole">{role === 'admin' ? 'Super admin' : 'Player · #1842'}</div>
        </div>
        <Icon name="settings" size={14} className="muted" />
      </div>
    </aside>
  );
};

export const Topbar = ({ title, sub, right, navigate }: any) => (
  <header className="topbar">
    <div className="topbar-title">{title}{sub && <small>{sub}</small>}</div>
    <div className="topbar-search">
      <Icon name="search" size={14} className="muted" />
      <input placeholder="Search players, leagues, courts…" />
      <span className="mono muted" style={{ fontSize: 10 }}>⌘K</span>
    </div>
    <div className="topbar-actions">
      <button className="icon-btn" onClick={() => navigate && navigate('u_qr')} title="Scan QR"><Icon name="qr" size={16} /></button>
      <button className="icon-btn" onClick={() => navigate && navigate('u_notifications')} title="Notifications"><Icon name="bell" size={16} /><span className="dot" /></button>
      <button className="icon-btn" onClick={() => navigate && navigate('u_messages')} title="Inbox"><Icon name="mail" size={16} /></button>
      {right}
    </div>
  </header>
);
