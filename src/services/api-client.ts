import { env } from '@/lib/env';
import { getCookie } from 'cookies-next';
import { CookiesFn, CookieValueTypes } from 'cookies-next/lib/types';
import ky from 'ky';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: (() => Promise<ReadonlyRequestCookies>) | undefined;

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers');
          cookieStore = async () => await serverCookies();
        }

        const token: CookieValueTypes = getCookie('token', { cookies: cookieStore });

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});