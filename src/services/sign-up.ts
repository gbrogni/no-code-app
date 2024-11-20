import { api } from './api-client';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export async function signUp({
  name,
  email,
  password,
}: SignUpRequest): Promise<void> {
  await api.post('api/v1/users/', {
    json: {
      name,
      email,
      password,
    },
  });
}