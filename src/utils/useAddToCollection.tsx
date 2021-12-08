import { useEffect, useState } from 'react';

export default function useAddToCollection(albumId: number) {
  const [inCollection, setInCollection] = useState<boolean>(false);

  useEffect(() => {
    if (albumId) {
      const addAlbum = async () => {
        const inCollectionResponse = await fetch(`/api/collection/${albumId}`, {
          method: 'POST',
        });
        const inCollectionStatus = await inCollectionResponse.json();
        setInCollection(inCollectionStatus);
      };
      addAlbum();
    }
  }, [albumId]);

  return { inCollection };
}
