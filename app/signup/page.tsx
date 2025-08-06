'use client';

import { useRouter } from 'next/navigation';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  const router = useRouter();

  const handleSignupSuccess = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Sign Up</h1>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}