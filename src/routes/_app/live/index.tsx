// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { LiveHub } from '@/pages/live';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/live/')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <LiveHub navigate={navigate} />;
}
