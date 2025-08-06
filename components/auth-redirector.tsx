'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAtomValue } from 'jotai';

import { currentUserAtom, isLoggedInAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';

export const AuthRedirector = () => {
  const router = useRouter();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const currentUser = useAtomValue(currentUserAtom);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      if (currentUser.role === 'seller') {
        router.replace('/seller/dashboard');
      } else if (currentUser.role === 'buyer') {
        router.replace('/buyer/products');
      }
    }
  }, [isLoggedIn, currentUser, router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        Welcome to Car Marketplace
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Your one-stop shop for buying and selling cars.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/login" passHref>
          <Button className="px-6 py-3 text-lg">
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button variant="outline" className="px-6 py-3 text-lg">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};