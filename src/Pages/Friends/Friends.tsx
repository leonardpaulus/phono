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
import Loading from '../../assets/Loading.svg';

export default function Friends() {
  const { getFriendsList, friendsList } = useFriends();
  const [friend, setFriend] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { collection, setCollection, filteredCollection } = useCollection(
    () => {
      setSearchResult(false);
    },
    searchQuery,
    friend
  );

  let friendsContent;
  let searchBar;

  useEffect(() => {
    getFriendsList();
    setCollection(null);
  }, []);

  function handleOnSubmit(search: string) {
    setSearchQuery(search);
    if (search === '') {
      setSearchResult(true);
    }
  }

  function handleGoBack() {
    setCollection(null);
    setSearchQuery('');
    setFriend(null);
  }

  if (collection) {
    searchBar = (
      <SearchBar
        placeholder={`Search ${friend}s Collection`}
        onSubmit={(search) => handleOnSubmit(search)}
      />
    );
  }
  if (!collection) {
    searchBar = (
      <SearchBar
        placeholder={'Search Users'}
        onSubmit={(search) => console.log(search)}
      />
    );
  }

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
  if (!collection && friend) {
    friendsContent = (
      <>
        <div className={styles.loadingContainer}>
          <img src={Loading} className={styles.loading} />
          <p>Loading</p>
          <p>{friend}s Collection ...</p>
        </div>
      </>
    );
  }
  if (collection) {
    friendsContent = (
      <>
        <BackButton goBack={() => handleGoBack()} />
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
      {searchBar}
      {friendsContent}
      <NavBar activeLink={'friends'} />
    </div>
  );
}
