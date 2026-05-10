// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { HowItWorks } from '@/pages/public';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';

export const Route = createFileRoute('/how')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return (<div className="public-shell"><HowItWorks navigate={navigate} /><TweaksPanel /></div>);
}
