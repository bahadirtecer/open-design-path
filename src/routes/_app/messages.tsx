// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { Messages } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/messages')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <Messages navigate={navigate} />;
}
