import { useMemo, useState } from 'react';
import { ModalLayout } from '@/shared/ui';
import { addFavorite, canAddMore, removeFavorite } from '@/entities/place';
import type { Coords } from '@/entities/place/model/types';

type Props = {
  mode: 'add' | 'remove';
  placeId: string;
  placeName: string;
  coords: Coords;
  onClose: () => void;
};

export const AddFavoriteModal = ({ mode, placeId, placeName, coords, onClose }: Props) => {
  const [aliasInput, setAliasInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canAdd = useMemo(() => canAddMore(), []);

  const handleAddFavorite = () => {
    const alias = aliasInput.trim();
    const result = addFavorite({
      id: placeId,
      placeName,
      alias: alias ? alias : undefined,
      lat: coords.lat,
      lon: coords.lon,
    });

    if (!result.ok) {
      setErrorMessage(
        result.reason === 'duplicate'
          ? '이미 즐겨찾기에 추가된 장소입니다.'
          : '즐겨찾기 6개가 저장되어 더 이상 추가할 수 없습니다.',
      );
      return;
    }

    onClose();
  };

  const handleRemoveFavorite = () => {
    removeFavorite(placeId);
    onClose();
  };

  return (
    <ModalLayout onClose={onClose}>
      {mode === 'add' && !canAdd && (
        <div>
          <p>즐겨찾기 6개가 저장되어 더 이상 추가할 수 없습니다.</p>
          <button onClick={onClose}>확인</button>
        </div>
      )}
      {mode === 'add' && canAdd && (
        <div>
          <input
            placeholder="즐겨찾기 이름을 입력하세요"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <div>
            <button onClick={handleAddFavorite}>저장</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      )}
      {mode === 'remove' && (
        <div>
          <p>즐겨찾기를 해제하시겠습니까?</p>
          <button onClick={handleRemoveFavorite}>예</button>
          <button onClick={onClose}>아니요</button>
        </div>
      )}
    </ModalLayout>
  );
};
