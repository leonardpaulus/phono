import { useEffect, useState } from 'react';

export default function useAlbumDetail(albumId: number | null) {
  const [albumInfo, setAlbumInfo] = useState(null);

  useEffect(() => {
    const getAlbumDetail = async () => {
      const response = await fetch(`/api/single-album/${albumId}`);
      const album = await response.json();
      setAlbumInfo(album);
    };
    getAlbumDetail();
  }, [albumId]);

  return { albumInfo };
}
