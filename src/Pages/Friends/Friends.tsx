import styles from './Friends.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import useFriends from '../../utils/useFriends';
import { useEffect, useState } from 'react';
import FriendsCardList from '../../components/FriendsCardList/FriendsCardList';

export default function Friends() {
  const { getFriendsList, friendsList } = useFriends();
  const [friendsCollection, setFriendsCollection] = useState(null);

  useEffect(() => {
    getFriendsList();
  }, []);

  let friendsCards;

  if (friendsList) {
    friendsCards = (
      <div className={styles.friendCards}>
        <FriendsCardList
          friendsList={friendsList}
          showFriendsCollection={(username) => setFriendsCollection(username)}
        />
      </div>
    );
  }

  console.log(friendsList);

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
