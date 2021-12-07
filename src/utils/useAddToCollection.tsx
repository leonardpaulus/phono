import { useEffect, useState } from 'react';

export default function useSearchLibrary(albumId: number) {
  const [inCollection, setInCollection] = useState<boolean>(false);

  useEffect(() => {
    if (albumId) {
      const getSearchResult = async () => {
        const inCollectionResponse = await fetch(`/api/collection/${albumId}`, {
          method: 'POST',
        });
        const inCollectionStatus = await inCollectionResponse.json();
        setInCollection(inCollectionStatus);
      };
      getSearchResult();
    }
  }, [albumId]);

  return { inCollection };
}
