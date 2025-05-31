'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirection directe vers la page de login pour le test
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          InvestFlow
        </h1>
      </div>
    </div>
  );
}
