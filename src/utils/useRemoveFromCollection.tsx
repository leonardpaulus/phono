import { useEffect, useState } from 'react';

export default function useRemoveFromCollection(
  removeAlbumId: number,
  instanceId: number
) {
  const [removeCollection, setRemoveCollection] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    if (removeAlbumId && mounted) {
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
    return () => {
      mounted = false;
    };
  }, [removeAlbumId]);

  return { removeCollection };
}
