import { Header } from '@/components/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No code API',
  description: 'Create a REST API without writing any code',
};

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
    </div>
  );
}
