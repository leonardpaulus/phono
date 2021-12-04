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

  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar placeholder={'Search my Collection'} />
      {collection && (
        <CoverSwiper
          collection={collection}
          changeActiveSlide={(activeSlideIndex) =>
            setActiveSlide(activeSlideIndex)
          }
        />
      )}
      {collection && <AlbumInfo collection={collection[activeSlide]} />}
      <NavBar activeLink={'home'} />
    </div>
  );
}
