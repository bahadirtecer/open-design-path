// @ts-nocheck
import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { Sidebar, Topbar } from '@/components/courtzone/Shell';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { useTweaks } from '@/lib/use-tweaks';
import { Icon } from '@/lib/icons';

const PATH_TO_ID: Record<string, string> = {
  '/dashboard': 'p_dashboard', '/organizer': 'o_dashboard', '/admin': 'a_dashboard',
  '/my': 'p_my', '/matches': 'p_matches', '/leagues': 'p_browse_l', '/tournaments': 'p_browse_t',
  '/organizer/create-league': 'o_create_l', '/organizer/create-tournament': 'o_create_t',
  '/organizer/matches': 'o_match_l',
  '/profile': 'u_profile', '/notifications': 'u_notifications', '/messages': 'u_messages',
  '/qr': 'u_qr', '/admin/users': 'a_users', '/admin/orgs': 'a_orgs', '/admin/facilities': 'a_facilities', '/admin/reports': 'a_reports',
};

const ID_TO_LABEL: Record<string, string> = {
  p_dashboard: 'Dashboard', o_dashboard: 'Organizer hub', a_dashboard: 'Platform overview',
  p_my: 'My leagues & cups', p_matches: 'Match history',
  p_browse_l: 'Browse leagues', p_browse_t: 'Browse tournaments',
  o_create_l: 'Create league', o_create_t: 'Create tournament',
  o_match_l: 'Match management',
  u_profile: 'My profile', u_notifications: 'Notifications', u_messages: 'Inbox',
  u_qr: 'QR scanner', a_users: 'User management', a_orgs: 'Organizations', a_reports: 'Reports',
};

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useCzNavigate();
  const [t] = useTweaks();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = PATH_TO_ID[pathname] || (pathname.startsWith('/leagues') ? 'p_browse_l' : pathname.startsWith('/tournaments') ? 'p_browse_t' : '');
  const label = ID_TO_LABEL[activeId] || 'CourtZone';
  return (
    <div className="app">
      <Sidebar activeId={activeId} navigate={navigate} role={t.role} />
      <div className="main">
        <Topbar
          title={label}
          sub={t.role === 'admin' ? 'Super admin · CourtZone HQ' : 'Player · Warszawa'}
          navigate={navigate}
          right={
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('public_landing')}>
              <Icon name="external" size={12} /> View public site
            </button>
          }
        />
        <main>
          <Outlet />
        </main>
      </div>
      <TweaksPanel />
    </div>
  );
}
