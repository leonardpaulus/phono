import { useEffect, useState } from 'react';
import { AlbumProps } from '../lib/types';

export default function useAlbumDetail(albumId: number | null) {
  const [albumInfo, setAlbumInfo] = useState<AlbumProps>();

  useEffect(() => {
    if (albumId) {
      const getAlbumDetail = async () => {
        const response = await fetch(`/api/single-album/${albumId}`);
        const album = await response.json();
        setAlbumInfo(album);
      };
      getAlbumDetail();
    }
  }, [albumId]);

  return { albumInfo };
}
