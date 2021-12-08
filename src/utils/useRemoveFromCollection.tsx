import { useEffect, useState } from 'react';

export default function useRemoveFromCollection(
  removeAlbumId: number,
  instanceId: number
) {
  const [removeCollection, setRemoveCollection] = useState<boolean>(true);

  useEffect(() => {
    if (removeAlbumId) {
      const removeAlbum = async () => {
        const inCollectionResponse = await fetch(
          `/api/collection/${removeAlbumId}/${instanceId}`,
          {
            method: 'DELETE',
          }
        );
        const inCollectionStatus = await inCollectionResponse.json();
        setRemoveCollection(inCollectionStatus);
      };
      removeAlbum();
    }
  }, [removeAlbumId]);

  return { removeCollection };
}
