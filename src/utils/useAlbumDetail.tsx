import { useEffect, useState } from 'react';
import { AlbumProps } from '../lib/types';

export default function useAlbumDetail(albumId: number | null | string) {
  const [albumInfo, setAlbumInfo] = useState<AlbumProps | null>(null);

  useEffect(() => {
    if (typeof albumId === 'number') {
      const getAlbumDetail = async () => {
        const response = await fetch(`/api/album/${albumId}`, {
          method: 'GET',
        });
        const album = await response.json();
        setAlbumInfo(album);
      };
      getAlbumDetail();
    }
    if (typeof albumId === 'string') {
      setAlbumInfo(null);
    }
  }, [albumId]);

  return { albumInfo };
}
