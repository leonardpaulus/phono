import styles from './Friends.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import useFriends from '../../utils/useFriends';
import { useEffect, useState } from 'react';
import FriendsCardList from '../../components/FriendsCardList/FriendsCardList';
import useCollection from '../../utils/useCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import BackButton from '../../components/BackButton/BackButton';
import Loading from '../../components/Loading/Loading';

export default function Friends() {
  const [searchFriend, setSearchFriend] = useState('');
  const { getFriendsList, friendsList, filteredFriendsList } = useFriends(
    () => {
      setSearchResult(false);
    },
    searchFriend
  );
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

  useEffect(() => {
    setSearchResult(true);
    setSearchFriend('');
  }, [friend]);

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
        placeholder={'Search my Friends'}
        onSubmit={(search) => setSearchFriend(search)}
      />
    );
  }

  if (!collection && friendsList) {
    friendsContent = (
      <FriendsCardList
        friendsList={friendsList}
        showFriend={(username) => setFriend(username)}
      />
    );
  }
  if (!collection && filteredFriendsList) {
    friendsContent = (
      <FriendsCardList
        friendsList={filteredFriendsList}
        showFriend={(username) => setFriend(username)}
      />
    );
  }
  if (!collection && friend) {
    friendsContent = <Loading />;
  }
  if (!filteredFriendsList && searchFriend && !searchResult) {
    friendsContent = (
      <div className={styles.searchError}>
        <p>We&apos;re sorry!</p>
        <p>No Matching search Results found :(</p>
      </div>
    );
  }
  if (collection) {
    friendsContent = (
      <>
        <BackButton goBack={() => handleGoBack()} />
        {!searchResult && (
          <div className={styles.searchError}>
            <p>We&apos;re sorry!</p>
            <p>No Matching search Results found :(</p>
          </div>
        )}
        {collection && !filteredCollection && searchResult && (
          <CoverSwiper
            collection={collection}
            onChangeActiveSlide={(activeSlideIndex) =>
              setActiveSlide(activeSlideIndex)
            }
          />
        )}
        {filteredCollection && searchResult && (
          <CoverSwiper
            collection={filteredCollection}
            onChangeActiveSlide={(activeSlideIndex) =>
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
    <div
      className={
        !collection
          ? `${styles.page} ${styles.emptypage}`
          : `${styles.page} ${styles.collectionpage}`
      }
    >
      {searchBar}
      {friendsContent}
    </div>
  );
}
