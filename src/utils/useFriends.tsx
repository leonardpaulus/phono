import { useState } from 'react';

export default function useFriends() {
  const [friendsList, setFriendsList] = useState(null);

  const getFriendsList = async () => {
    const friendsResponse = await fetch('/api/friends');
    const friends = await friendsResponse.json();
    setFriendsList(friends);
  };

  return { friendsList, getFriendsList };
}
