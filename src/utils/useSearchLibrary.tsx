import { useState } from 'react';

export default function useSearchLibrary(searchQuery: string) {
  const [searchResult, setSearchResult] = useState(null);

  const encodedSearchQuery = encodeURIComponent(searchQuery);

  const getSearchResult = async () => {
    const response = await fetch(`/api/search/${encodedSearchQuery}`);
    const search = await response.json();
    setSearchResult(search);
  };

  return { getSearchResult, searchResult };
}
