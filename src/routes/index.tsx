import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: LandingRedirect,
});

function LandingRedirect() {
  useEffect(() => {
    window.location.replace('/landing.html');
  }, []);
  return null;
}
