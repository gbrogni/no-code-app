import { Project } from '@/interfaces/project';
import { cookies } from 'next/headers';
import { api } from './api-client';

interface GetProjectsResponse {
  projects: Project[];
}

export async function getProjects(): Promise<GetProjectsResponse> {
  try {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('token')?.value;
    if (!token) {
      throw new Error('No token found');
    }

    const result = await api.get('/api/v1/projects', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json<{ data: Project[]; }>();

    return { projects: result.data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { projects: [] };
  }
}