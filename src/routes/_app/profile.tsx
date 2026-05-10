// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router';
import { MyProfile } from '@/pages/misc';
import { useCzNavigate } from '@/lib/use-cz-navigate';

export const Route = createFileRoute('/_app/profile')({ component: Page });
function Page() {
  const navigate = useCzNavigate();
  return <MyProfile navigate={navigate} />;
}
