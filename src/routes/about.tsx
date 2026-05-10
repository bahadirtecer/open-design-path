// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { About } from '@/pages/public';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';

export const Route = createFileRoute('/about')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return (<div className="public-shell"><About navigate={navigate} /><TweaksPanel /></div>);
}
