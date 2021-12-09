import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { FuseSearchProps } from '../lib/types';

export default function useMyCollection(
  searchQuery: string,
  onNoSearchResults: () => void
) {
  const [collection, setCollection] = useState(null);
  const [filteredCollection, setFilteredCollection] =
    useState<FuseSearchProps | null>(null);

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

  return { collection, filteredCollection };
}
