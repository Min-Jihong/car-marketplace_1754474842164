'use client';

import { AuthRedirector } from '@/components/auth-redirector';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <AuthRedirector />
    </div>
  );
}