// @ts-nocheck
// Maps the prototype's string route IDs to TanStack Router paths.
import { useNavigate as useTanstackNavigate } from '@tanstack/react-router';

const ROUTE_MAP: Record<string, { to: string; params?: Record<string, string> }> = {
  // public
  public_landing:        { to: '/' },
  public_about:          { to: '/about' },
  public_how:            { to: '/how' },
  public_signup:         { to: '/signup' },
  public_login:          { to: '/login' },
  public_reset:          { to: '/reset' },
  // dashboards
  p_dashboard:           { to: '/dashboard' },
  o_dashboard:           { to: '/organizer' },
  a_dashboard:           { to: '/admin' },
  // player
  p_my:                  { to: '/my' },
  p_league_detail:       { to: '/leagues/$id', params: { id: 'l1' } },
  p_tournament_detail:   { to: '/tournaments/$id', params: { id: 't1' } },
  p_tournament_bracket:  { to: '/tournaments/$id/bracket', params: { id: 't1' } },
  p_match_entry:         { to: '/matches/entry' },
  p_matches:             { to: '/matches' },
  p_browse_l:            { to: '/leagues' },
  p_browse_t:            { to: '/tournaments' },
  // organizer
  o_create_l:            { to: '/organizer/create-league' },
  o_create_t:            { to: '/organizer/create-tournament' },
  o_league:              { to: '/organizer/leagues/$id', params: { id: 'l1' } },
  o_tournament:          { to: '/organizer/tournaments/$id', params: { id: 't1' } },
  o_match_l:             { to: '/organizer/matches' },
  // qr
  u_qr:                  { to: '/qr' },
  qr_confirm:            { to: '/qr/confirm' },
  qr_success:            { to: '/qr/success' },
  qr_poster:             { to: '/qr/poster' },
  // account
  u_profile:             { to: '/profile' },
  u_public_profile:      { to: '/u/$handle', params: { handle: 'iga.g' } },
  u_notifications:       { to: '/notifications' },
  u_messages:            { to: '/messages' },
  // live
  live_hub:              { to: '/live' },
  live_watch:            { to: '/live/watch/$id', params: { id: 'm1' } },
  live_go:               { to: '/live/go' },
  live_dashboard:        { to: '/live/dashboard' },
  // admin
  a_users:               { to: '/admin/users' },
  a_orgs:                { to: '/admin/orgs' },
  a_reports:             { to: '/admin/reports' },
};

export function useCzNavigate() {
  const nav = useTanstackNavigate();
  return (id: string, params?: Record<string, string>) => {
    const target = ROUTE_MAP[id];
    if (!target) {
      console.warn('Unknown route id:', id);
      return;
    }
    // @ts-ignore
    nav({ to: target.to, params: { ...target.params, ...params } });
  };
}
