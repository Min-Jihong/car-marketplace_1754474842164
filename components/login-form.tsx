'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import type { User } from '@/lib/types';
import { currentUserAtom } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { mockUsers } from '@/lib/mock-data';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const router = useRouter();
  const setCurrentUser = useSetAtom(currentUserAtom);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    const foundUser = mockUsers.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      onLoginSuccess(foundUser);
      router.push('/');
    } else {
      form.setError('email', {
        type: 'manual',
        message: 'Invalid email or password.',
      });
      form.setError('password', {
        type: 'manual',
        message: 'Invalid email or password.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};