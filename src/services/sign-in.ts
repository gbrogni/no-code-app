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
    .post('api/v1/login', {
      json: {
        email,
        password,
      },
    })
    .json<{ data: { token: string; }; }>();

  const token = result.data.token;
  console.log(token);
  return { token };
}