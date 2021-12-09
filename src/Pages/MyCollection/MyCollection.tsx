import styles from './MyCollection.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import useMyCollection from '../../utils/useMyCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import NoMatchingSearchResult from './MyCollectionAssets/NoMatchingSearchResult.svg';

export default function MyCollection(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const { collection, filteredCollection } = useMyCollection(
    searchQuery,
    () => {
      setSearchResult(false);
    }
  );
  const [activeSlide, setActiveSlide] = useState<number>(0);

  function handleOnSubmit(search: string) {
    setSearchQuery(search);
    if (search === '') {
      setSearchResult(true);
    }
  }

  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search my Collection'}
        onSubmit={(search) => handleOnSubmit(search)}
      />
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
      {filteredCollection && !searchResult && (
        <AlbumInfo collection={filteredCollection[activeSlide]} />
      )}
      <NavBar activeLink={'home'} />
    </div>
  );
}
