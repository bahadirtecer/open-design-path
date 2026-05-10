// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { Landing } from '@/pages/public';
import { useCzNavigate } from '@/lib/use-cz-navigate';
import { TweaksPanel } from '@/components/courtzone/TweaksPanel';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const navigate = useCzNavigate();
  return (
    <div className="public-shell">
      <Landing navigate={navigate} />
      <TweaksPanel />
    </div>
  );
}
