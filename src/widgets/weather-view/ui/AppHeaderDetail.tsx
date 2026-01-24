'use client';

import { Button } from '@/shared';
import { useRouter } from 'next/navigation';

export const AppHeaderDetail = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <>
      <header className="flex h-12 items-center bg-blue-50 px-4">
        <Button className="text-sm font-medium text-blue-900" onClick={handleClick}>
        {'<'}
        </Button>
      </header>
    </>
  );
};
