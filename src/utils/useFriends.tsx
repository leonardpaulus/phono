import { useState } from 'react';
import { FriendProps } from '../lib/types';

export default function useFriends() {
  const [friendsList, setFriendsList] = useState<FriendProps[] | null>(null);

  const getFriendsList = async () => {
    const friendsResponse = await fetch('/api/friends');
    const friends = await friendsResponse.json();
    setFriendsList(friends);
  };

  return { friendsList, getFriendsList };
}
