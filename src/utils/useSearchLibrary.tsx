import { useState } from 'react';

export default function useSearchLibrary(
  searchQuery: string,
  searchCategory: string
) {
  const [searchResult, setSearchResult] = useState(null);

  const encodedSearchQuery = encodeURIComponent(searchQuery);

  const getSearchResult = async () => {
    const artistResponse = await fetch(
      `/api/search/${searchCategory}/${encodedSearchQuery}`
    );
    const artistSearch = await artistResponse.json();
    setSearchResult(artistSearch);
  };

  return { getSearchResult, searchResult };
}
