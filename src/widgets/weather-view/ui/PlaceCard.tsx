import type { SavedPlace } from '@/entities/place/model/types';
import { Coords } from '@/entities/place/model/types';
import { AddFavoriteModal } from '@/features/manage-favorite/ui/AddFavoriteModal';
import { Button, Input } from '@/shared/ui';
import { useEffect, useState } from 'react';

type Props = {
  isFavorite: boolean;
  alias?: string;
  placeName: string;
  coords: Coords;
  canAddMore: boolean;
  onAddFavorite: (place: SavedPlace) => { ok: true } | { ok: false; reason: 'max' | 'duplicate' };
  onRemoveFavorite: (id: string) => void;
  onUpdateFavorite: (id: string, patch: Partial<Pick<SavedPlace, 'alias' | 'placeName'>>) => void;
};

export const PlaceCard = ({
  alias,
  placeName,
  isFavorite,
  coords,
  canAddMore,
  onAddFavorite,
  onRemoveFavorite,
  onUpdateFavorite,
}: Props) => {
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
    const newAlias = aliasInput.trim();
    onUpdateFavorite(placeId, { alias: newAlias ? newAlias : undefined });
    setIsEditingAlias(false);
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="order-1 md:order-2 md:ml-auto">
            {isFavorite ? (
              <Button onClick={() => openModal('remove')}>★ 즐겨찾기 해제</Button>
            ) : (
              <Button onClick={() => openModal('add')}>☆ 즐겨찾기 등록</Button>
            )}
          </div>
          <div className="order-2 md:order-1">
            {isFavorite && (
              <div>
                {isEditingAlias ? (
                  <div className="flex wspace-y-2">
                    <Input
                      placeholder="별칭을 입력하세요"
                      value={aliasInput}
                      onChange={(e) => setAliasInput(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button className='flex-shrink-0' onClick={saveAlias}>저장</Button>
                      <Button onClick={cancelEditAlias}>취소</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    {alias && <p className="text-lg font-semibold">{alias}</p>}
                    <Button onClick={startEditAlias}>이름 변경</Button>
                  </div>
                )}
              </div>
            )}
            <p className="text-sm text-gray-500">{placeName}</p>
          </div>
        </div>
      </div>

      {isModalOpen && mode && (
        <AddFavoriteModal
          mode={mode}
          placeId={placeId}
          placeName={placeName}
          coords={coords}
          canAddMore={canAddMore}
          onAdd={onAddFavorite}
          onRemove={onRemoveFavorite}
          onClose={closeModal}
        />
      )}
    </>
  );
};
