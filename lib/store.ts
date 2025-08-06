import { atom } from 'jotai';
import type { User } from '@/lib/types';

// Stores the currently logged-in user's information. Initial value is null.
export const currentUserAtom = atom<User | null>(null);

// Derived atom indicating if a user is logged in based on currentUserAtom. True if currentUserAtom is not null, false otherwise.
export const isLoggedInAtom = atom((get) => !!get(currentUserAtom));