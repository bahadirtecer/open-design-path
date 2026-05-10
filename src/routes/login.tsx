// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@/pages/public';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';

export const Route = createFileRoute('/login')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return (<div className="public-shell"><Login navigate={navigate} /><TweaksPanel /></div>);
}
