import styles from './MyCollection.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import CoverSwiper from '../../components/CoverSwiper/CoverSwiper';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import NavBar from '../../components/NavBar/NavBar';

export default function MyCollection() {
  return (
    <div className={styles.myCollectionPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search my Collection'}
        searchLocation={'myCollection'}
      />
      <CoverSwiper />
      <AlbumInfo />
      <div className={styles.navBar}>
        <NavBar activeLink={'home'} />
      </div>
    </div>
  );
}
