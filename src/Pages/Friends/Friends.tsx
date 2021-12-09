import styles from './Friends.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import useFriends from '../../utils/useFriends';
import { useEffect } from 'react';

export default function Friends() {
  const { getFriendsList, friendsList } = useFriends();

  useEffect(() => {
    getFriendsList();
  }, []);
  console.log(friendsList);

  return (
    <div className={styles.friendsPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search Users'}
        onSubmit={(search) => console.log(search)}
      />
      <NavBar activeLink={'friends'} />
    </div>
  );
}
