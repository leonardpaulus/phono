// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { AlbumProps } from '../lib/types';

export default function useCollection(
  onNoSearchResults?: () => void,
  searchQuery?: string | null,
  username?: string | null
) {
  const [collection, setCollection] = useState<AlbumProps[] | null>(null);
  const [filteredCollection, setFilteredCollection] = useState<
    AlbumProps[] | null
  >(null);

  const options = {
    isCaseSensitive: false,
    findAllMatches: true,
    includeMatches: false,
    threshold: 0.3,
    keys: ['artist', 'title'],
  };

  const getCollection = async () => {
    const response = await fetch(URL);
    const fetchedCollection = await response.json();
    setCollection(fetchedCollection);
  };

  let URL;
  if (username) {
    URL = `/api/friends/${username}`;
  } else {
    URL = '/api/me';
  }

  useEffect(() => {
    if (username) {
      getCollection();
    }
  }, [username]);

  useEffect(() => {
    let mounted = true;
    if (collection && searchQuery != '') {
      const fuse = new Fuse(collection, options);
      const result = fuse.search(searchQuery);

      if (result.length === 0) {
        if (mounted) {
          setFilteredCollection(null);
          onNoSearchResults();
        }
      } else {
        if (mounted) {
          setFilteredCollection(result);
        }
      }
    }
    if (searchQuery === '') {
      setFilteredCollection(null);
    }
    return () => {
      mounted = false;
    };
  }, [searchQuery]);

  async function removeAlbum(removeAlbum: AlbumProps) {
    setCollection((albums) => [
      albums?.filter((album) => album.id !== removeAlbum.id),
    ]);
    await fetch(`/api/collection/${removeAlbum.id}/${removeAlbum.instanceId}`, {
      method: 'DELETE',
    });
  }

  async function addAlbum(addAlbum: AlbumProps) {
    setCollection((albums) => [albums, addAlbum]);
    await fetch(`/api/collection/${addAlbum.id}`, {
      method: 'POST',
    });
  }

  return {
    getCollection,
    collection,
    filteredCollection,
    setCollection,
    removeAlbum,
    addAlbum,
  };
}
