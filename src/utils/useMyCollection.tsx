import { useState } from 'react';

export default function useMyCollection() {
  const [collection, setCollection] = useState(null);

  const getMyCollection = async () => {
    const response = await fetch('http://localhost:3001/api/me');
    const myCollection = await response.json();
    setCollection(myCollection);
  };

  return { getMyCollection, collection };
}
