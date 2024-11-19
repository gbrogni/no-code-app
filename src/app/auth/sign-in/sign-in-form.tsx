'use client';

import * as React from 'react';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { useFormState } from '@/hooks/use-form-state';
import { signInWith } from './actions';
import Link from 'next/link';
import { PasswordInput } from '@/components/password-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> { }

export function SignInForm({ className, ...props }: SignInProps) {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [password, setPassword] = useState('');

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWith,
    () => {
      router.push('/');
    },
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit} >
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              defaultValue={searchParams.get('email') ?? ''}
            />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password[0]}
              </p>
            )}

            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-foreground hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Sign in with e-mail'
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isPending}>
        {isPending ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
      <Button variant="outline" type="button" disabled={isPending}>
        {isPending ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}