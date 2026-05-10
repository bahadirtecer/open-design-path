// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { PublicProfile } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/u/$handle')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <PublicProfile navigate={navigate} />;
}
