import { useEffect, useState } from 'react';
import { AlbumProps } from '../lib/types';

export default function useAlbumDetail(albumId: number | null) {
  const [albumInfo, setAlbumInfo] = useState<AlbumProps | null>(null);

  useEffect(() => {
    const getAlbumDetail = async () => {
      const response = await fetch(`/api/album/${albumId}`, {
        method: 'GET',
      });
      const album = await response.json();
      setAlbumInfo(album);
    };
    getAlbumDetail();
  }, [albumId]);

  return { albumInfo, setAlbumInfo };
}
