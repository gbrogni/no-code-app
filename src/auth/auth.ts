import { getProfile } from '@/services/get-profile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return !!cookieStore.get('token')?.value;
}

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/auth/sign-in');
  }

  try {
    const { user } = await getProfile();
    return { user };
  } catch (error) {
    console.error('Failed to get profile:', error);
    return redirect('/api/auth/sign-out');
  }
}