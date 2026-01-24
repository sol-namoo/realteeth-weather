import { updateFavorite } from '@/entities/place';
import { Coords } from '@/entities/place/model/types';
import { AddFavoriteModal } from '@/features/manage-favorite/ui/AddFavoriteModal';
import { useEffect, useState } from 'react';

type Props = {
  isFavorite: boolean;
  alias?: string;
  placeName: string;
  coords: Coords;
};

export const PlaceCard = ({ alias, placeName, isFavorite, coords }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'remove' | null>(null);
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [aliasInput, setAliasInput] = useState(alias ?? '');
  const placeId = `${coords.lat},${coords.lon}`;

  useEffect(() => {
    if (!isEditingAlias) {
      setAliasInput(alias ?? '');
    }
  }, [alias, isEditingAlias]);

  const openModal = (mode: 'add' | 'remove') => {
    setMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMode(null);
  };

  const startEditAlias = () => {
    setAliasInput(alias ?? '');
    setIsEditingAlias(true);
  };

  const cancelEditAlias = () => {
    setAliasInput(alias ?? '');
    setIsEditingAlias(false);
  };

  const saveAlias = () => {
    if (!isFavorite) return;
    const nextAlias = aliasInput.trim();
    updateFavorite(placeId, { alias: nextAlias ? nextAlias : undefined });
    setIsEditingAlias(false);
  };

  return (
    <>
      <div>
        <div>
          {isFavorite ? (
            <button onClick={() => openModal('remove')}>색칠된 별</button>
          ) : (
            <button onClick={() => openModal('add')}>빈 별</button>
          )}
        </div>
        <div>
          {isFavorite && (
            <div>
              {isEditingAlias ? (
                <div>
                  <input
                    placeholder="별칭을 입력하세요"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                  />
                  <button onClick={saveAlias}>저장</button>
                  <button onClick={cancelEditAlias}>취소</button>
                </div>
              ) : (
                <div>
                  {alias && <p>{alias}</p>}
                  <button onClick={startEditAlias}>이름 변경</button>
                </div>
              )}
            </div>
          )}
          <p>{placeName}</p>
        </div>
      </div>

      {isModalOpen && mode && (
        <AddFavoriteModal
          mode={mode}
          placeId={placeId}
          placeName={placeName}
          coords={coords}
          onClose={closeModal}
        />
      )}
    </>
  );
};
