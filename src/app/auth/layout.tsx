import { isAuthenticated } from '@/auth/auth';
import { redirect } from 'next/navigation';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<AuthLayoutProps>) {

  if (await isAuthenticated()) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div>{children}</div>
    </div>
  );
}
