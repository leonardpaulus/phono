// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { AlbumProps } from '../lib/types';

export default function useCollection(
  username?: string,
  searchQuery: string,
  onNoSearchResults: () => void
) {
  const [collection, setCollection] = useState<AlbumProps[] | null>(null);
  const [filteredCollection, setFilteredCollection] = useState<
    AlbumProps[] | null
  >(null);
  const [friendsCollection, setFriendsCollection] = useState(null);

  const options = {
    isCaseSensitive: false,
    findAllMatches: true,
    includeMatches: false,
    threshold: 0.3,
    keys: ['artist', 'title'],
  };

  const getMyCollection = async () => {
    const response = await fetch('/api/me');
    const myCollection = await response.json();
    setCollection(myCollection);
  };

  const getFriendsCollection = async () => {
    const response = await fetch(`/api/friends/${username}`);
    const userCollection = await response.json();
    setFriendsCollection(userCollection);
  };

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
    if (collection === null) {
      getMyCollection();
    }
    return () => {
      mounted = false;
    };
  }, [searchQuery]);

  return {
    collection,
    filteredCollection,
    getFriendsCollection,
    friendsCollection,
  };
}
