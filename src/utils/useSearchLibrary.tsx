import { useEffect, useState } from 'react';

export default function useSearchLibrary(
  searchQuery: string,
  searchCategory: string
) {
  const [searchResult, setSearchResult] = useState(null);

  const encodedSearchQuery = encodeURIComponent(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      const getSearchResult = async () => {
        const searchResponse = await fetch(
          `/api/search/${searchCategory}/${encodedSearchQuery}`
        );
        const search = await searchResponse.json();
        setSearchResult(search);
      };
      getSearchResult();
    }
  }, [searchCategory, searchQuery]);

  return { searchResult };
}
