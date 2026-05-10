// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { SignUp } from '@/pages/public';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';

export const Route = createFileRoute('/signup')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return (<div className="public-shell"><SignUp navigate={navigate} /><TweaksPanel /></div>);
}
