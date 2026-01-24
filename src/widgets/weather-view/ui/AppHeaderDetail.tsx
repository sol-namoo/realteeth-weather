'use client';

import { useRouter } from 'next/navigation';

export const AppHeaderDetail = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <>
      <header className="text-xl font-bold">
        <button onClick={handleClick}>홈으로</button>
      </header>
    </>
  );
};
