import styles from './MyCollection.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import useCollection from '../../utils/useCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import NoMatchingSearchResult from '../../assets/NoMatchingSearchResult.svg';
import Loading from '../../assets/Loading.svg';

export default function MyCollection(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const { collection, filteredCollection, getCollection } = useCollection(
    () => {
      setSearchResult(false);
    },
    searchQuery
  );
  const [activeSlide, setActiveSlide] = useState<number>(0);

  function handleOnSubmit(search: string) {
    setSearchQuery(search);
    if (search === '') {
      setSearchResult(true);
    }
  }

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search my Collection'}
        onSubmit={(search) => handleOnSubmit(search)}
      />
      {!collection && (
        <div className={styles.loadingContainer}>
          <img src={Loading} className={styles.loading} />
          <p>Loading</p>
          <p>my Collection ...</p>
        </div>
      )}
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
      <NavBar activeLink={'home'} />
    </div>
  );
}
