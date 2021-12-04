import { useState } from 'react';

export default function useSearchLibrary(searchQuery: string) {
  const [searchArtistResult, setSearchArtistResult] = useState(null);
  const [searchTitleResult, setSearchTitleResult] = useState(null);

  const encodedSearchQuery = encodeURIComponent(searchQuery);

  const getSearchResult = async () => {
    const artistResponse = await fetch(
      `/api/search/artist/${encodedSearchQuery}`
    );
    const titleResponse = await fetch(
      `/api/search/title/${encodedSearchQuery}`
    );
    const artistSearch = await artistResponse.json();
    const titleSearch = await titleResponse.json();
    setSearchArtistResult(artistSearch);
    setSearchTitleResult(titleSearch);
  };

  return { getSearchResult, searchArtistResult, searchTitleResult };
}
