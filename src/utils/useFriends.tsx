// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react';
import { FriendProps } from '../lib/types';
import Fuse from 'fuse.js';

export default function useFriends(
  onNoSearchResults: () => void,
  searchQuery?: string | null
) {
  const [friendsList, setFriendsList] = useState<FriendProps[] | null>(null);
  const [filteredFriendsList, setfilteredFriendsList] = useState<
    FriendProps[] | null
  >(null);

  const options = {
    isCaseSensitive: false,
    findAllMatches: true,
    includeMatches: false,
    threshold: 0.5,
    keys: ['username'],
  };

  useEffect(() => {
    let mounted = true;
    if (friendsList && searchQuery != '') {
      const fuse = new Fuse(friendsList, options);
      const result = fuse.search(searchQuery);

      if (result.length === 0) {
        if (mounted) {
          setfilteredFriendsList(null);
          onNoSearchResults();
        }
      } else {
        if (mounted) {
          setfilteredFriendsList(result);
        }
      }
    }
    if (searchQuery === '') {
      setfilteredFriendsList(null);
    }
    return () => {
      mounted = false;
    };
  }, [searchQuery]);

  const getFriendsList = async () => {
    const friendsResponse = await fetch('/api/friends');
    const friends = await friendsResponse.json();
    setFriendsList(friends);
  };

  return { friendsList, getFriendsList, filteredFriendsList };
}
