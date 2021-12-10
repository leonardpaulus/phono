import styles from './Friends.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import useFriends from '../../utils/useFriends';
import { useEffect, useState } from 'react';
import FriendsCardList from '../../components/FriendsCardList/FriendsCardList';
import useCollection from '../../utils/useCollection';

export default function Friends() {
  const { getFriendsList, friendsList } = useFriends();
  const [friend, setFriend] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const { collection, setCollection } = useCollection(
    () => {
      setSearchResult(false);
    },
    null,
    friend
  );

  useEffect(() => {
    getFriendsList();
    setCollection(null);
  }, []);

  if (collection) {
    console.log('COLLECTION');
  }
  if (!searchResult) {
    console.log('SearchResult');
  }

  let friendsCards;

  if (friendsList) {
    friendsCards = (
      <div className={styles.friendCards}>
        <FriendsCardList
          friendsList={friendsList}
          showFriend={(username) => setFriend(username)}
        />
      </div>
    );
  }

  return (
    <div className={styles.friendsPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search Users'}
        onSubmit={(search) => console.log(search)}
      />
      {friendsCards}
      <NavBar activeLink={'friends'} />
    </div>
  );
}
