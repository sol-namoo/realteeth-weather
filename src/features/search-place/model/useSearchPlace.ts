import { useMemo, useState } from 'react';
import { koreaDistricts } from '@/shared';

type Props = {
  limit: number;
};

export const useSearchPlace = ({ limit }: Props) => {
  // Todo: 디바운스 걸기
  // Todo: 더보기 (옵셔널)
  // 선택 시 callback

  const [input, setInput] = useState('');
  // const debouncedKeyword = useDebounce(input)

  // 리스트 필터링
  const results = useMemo(() => {
    if (input.length < 2) return [];

    const debouncedKeywords = input.trim().split(' ');
    const temp: string[] = [];

    for (const item of koreaDistricts as string[]) {
      if (debouncedKeywords.every((word) => item.includes(word))) {
        temp.push(item);
      }
      if (temp.length >= limit) break;
    }
    return temp;
  }, [input, limit]);

  return { input, setInput, results };
};
