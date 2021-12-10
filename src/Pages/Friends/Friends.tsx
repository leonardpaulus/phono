import styles from './Friends.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import useFriends from '../../utils/useFriends';
import { useEffect, useState } from 'react';
import FriendsCardList from '../../components/FriendsCardList/FriendsCardList';
import useCollection from '../../utils/useCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NoMatchingSearchResult from '../../assets/NoMatchingSearchResult.svg';
import BackButton from '../../components/BackButton/BackButton';

export default function Friends() {
  const { getFriendsList, friendsList } = useFriends();
  const [friend, setFriend] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { collection, setCollection, filteredCollection } = useCollection(
    () => {
      setSearchResult(false);
    },
    null,
    friend
  );

  let friendsContent;

  useEffect(() => {
    getFriendsList();
    setCollection(null);
  }, []);

  if (!collection && friendsList) {
    friendsContent = (
      <div className={styles.friendCards}>
        <FriendsCardList
          friendsList={friendsList}
          showFriend={(username) => setFriend(username)}
        />
      </div>
    );
  }
  if (collection) {
    friendsContent = (
      <>
        <BackButton goBack={() => setCollection(null)} />
        {!searchResult && (
          <>
            <img
              src={NoMatchingSearchResult}
              className={styles.noMatchingSearchResultsIcon}
            />
            <p>We&apos;re sorry!</p>
            <p>No Matching search Results found :(</p>
          </>
        )}
        {collection && !filteredCollection && searchResult && (
          <CoverSwiper
            collection={collection}
            changeActiveSlide={(activeSlideIndex) =>
              setActiveSlide(activeSlideIndex)
            }
          />
        )}
        {filteredCollection && searchResult && (
          <CoverSwiper
            collection={filteredCollection}
            changeActiveSlide={(activeSlideIndex) =>
              setActiveSlide(activeSlideIndex)
            }
          />
        )}
        {collection && !filteredCollection && searchResult && (
          <AlbumInfo collection={collection[activeSlide]} />
        )}
        {filteredCollection && searchResult && (
          <AlbumInfo collection={filteredCollection[activeSlide]} />
        )}
      </>
    );
  }

  return (
    <div className={styles.friendsPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search Users'}
        onSubmit={(search) => console.log(search)}
      />
      {friendsContent}
      <NavBar activeLink={'friends'} />
    </div>
  );
}
