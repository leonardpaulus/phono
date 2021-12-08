import styles from './MyCollection.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import useMyCollection from '../../utils/useMyCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';

export default function MyCollection(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const { collection, filteredCollection } = useMyCollection(searchQuery);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search my Collection'}
        onSubmit={(search) => setSearchQuery(search)}
      />
      {collection && !filteredCollection && (
        <CoverSwiper
          collection={collection}
          changeActiveSlide={(activeSlideIndex) =>
            setActiveSlide(activeSlideIndex)
          }
        />
      )}
      {filteredCollection && (
        <CoverSwiper
          collection={filteredCollection}
          changeActiveSlide={(activeSlideIndex) =>
            setActiveSlide(activeSlideIndex)
          }
        />
      )}
      {collection && !filteredCollection && (
        <AlbumInfo collection={collection[activeSlide]} />
      )}
      {filteredCollection && (
        <AlbumInfo collection={filteredCollection[activeSlide]} />
      )}
      <NavBar activeLink={'home'} />
    </div>
  );
}
