import { useState } from 'react';

export default function useMyCollection() {
  const [collection, setCollection] = useState(null);

  const getMyCollection = async () => {
    const response = await fetch('/api/me');
    const myCollection = await response.json();
    setCollection(myCollection);
  };

  return { getMyCollection, collection };
}
