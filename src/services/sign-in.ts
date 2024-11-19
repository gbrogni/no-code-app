import { api } from './api-client';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> {
  const result = await api
    .post('login', {
      json: {
        email,
        password,
      },
    })
    .json<SignInResponse>();

  return result;
}