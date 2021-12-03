import styles from './MyCollection.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import useMyCollection from '../../utils/useMyCollection';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';

export default function MyCollection(): JSX.Element {
  const { getMyCollection, collection } = useMyCollection();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    getMyCollection();
  }, []);

  if (collection) {
    console.log(collection[activeSlide]);
  }

  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search my Collection'}
        searchLocation={'myCollection'}
      />
      {collection && (
        <CoverSwiper
          collection={collection}
          changeActiveSlide={(activeSlideIndex) =>
            setActiveSlide(activeSlideIndex)
          }
        />
      )}
      {collection && <AlbumInfo />}
      <div className={styles.navBar}>
        <NavBar activeLink={'home'} />
      </div>
    </div>
  );
}
