import { useMemo, useState } from 'react';
import { koreaDistricts, useDebounce } from '@/shared';

type Props = {
  limit: number;
};

export const useSearchPlace = ({ limit }: Props) => {

  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 300);

  const results = useMemo(() => {
    if (debouncedInput.length < 2) return [];

    const debouncedKeywords = debouncedInput.trim().split(' ');
    const temp: string[] = [];

    for (const item of koreaDistricts as string[]) {
      if (debouncedKeywords.every((word) => item.includes(word))) {
        temp.push(item);
      }
      if (temp.length >= limit) break;
    }
    return temp;
  }, [debouncedInput, limit]);

  return { input, setInput, results };
};
