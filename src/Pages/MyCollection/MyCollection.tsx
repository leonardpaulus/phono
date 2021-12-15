import styles from './MyCollection.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import { useEffect, useState } from 'react';
import useCollection from '../../utils/useCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import Loading from '../../components/Loading/Loading';

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
    <div
      className={
        !collection
          ? `${styles.page} ${styles.emptypage}`
          : `${styles.page} ${styles.collectionpage}`
      }
    >
      <SearchBar
        placeholder={'Search my Collection'}
        onSubmit={(search) => handleOnSubmit(search)}
      />
      {!collection && <Loading />}
      {!searchResult && (
        <div className={styles.searchError}>
          <p>We&apos;re sorry!</p>
          <p>No Matching search Results found :(</p>
        </div>
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
    </div>
  );
}
