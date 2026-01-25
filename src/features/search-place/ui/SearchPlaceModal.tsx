import { useEffect, useState } from 'react';
import { useGetGeocode, useSearchPlace } from '..';
import { Input, ModalLayout } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { saveLastPlace } from '@/entities/place/model/lastSearchedPlace';

type Props = {
  onClose: () => void;
};

export const SearchPlaceModal = ({ onClose }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('');
  const {
    isLoading,
    isSuccess,
    isError,
    data: geoCodeResult,
  } = useGetGeocode(selected, !!selected);

  const { input, setInput, results } = useSearchPlace({
    limit: 30,
  });

  const handleSelect = (item: string) => setSelected(item);

  useEffect(() => {
    if (!isSuccess || !geoCodeResult) return;

    saveLastPlace({
      id: `${geoCodeResult.lat},${geoCodeResult.lon}`,
      lat: geoCodeResult.lat,
      lon: geoCodeResult.lon,
      placeName: selected,
    });
    router.push(`/places/${geoCodeResult.lat},${geoCodeResult.lon}`);
  }, [isSuccess, geoCodeResult, router, selected]);

  return (
    <>
      <ModalLayout onClose={onClose}>
        <Input
          placeholder="지역명을 입력하세요 (2글자 이상)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div>
          {isLoading && <p>선택한 위치의 좌표를 가져오는 중입니다</p>}
          {isError && <p>선택한 위치의 좌표를 가져올 수 없습니다. 다른 지역을 선택해주세요.</p>}
          {results && (
            <ul className="max-h-80 overflow-auto border">
              {results.map((item) => (
                <li
                  key={item}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ModalLayout>
    </>
  );
};
