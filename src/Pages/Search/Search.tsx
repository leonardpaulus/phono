import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Search.module.css';
import useSearchLibrary from '../../utils/useSearchLibrary';
import { useEffect, useState } from 'react';
import SearchCardList from '../../components/SearchCard/SearchCardList';
import Divider from '../../assets/Divider';
import useAlbumDetail from '../../utils/useAlbumDetail';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const { searchResult } = useSearchLibrary(searchQuery, searchCategory);
  const [albumId, setAlbumId] = useState<number | null>(null);
  const { albumInfo } = useAlbumDetail(albumId);

  useEffect(() => {
    console.log(albumInfo);
  }, [albumInfo]);

  return (
    <div className={styles.searchPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search the library'}
        onSubmit={(search) => setSearchQuery(search)}
      />
      <NavBar activeLink={'search'} />
      <div className={styles.toggleInput}>
        <span
          onClick={() => setSearchCategory('title')}
          className={
            searchCategory === 'title'
              ? styles.clickedCategory
              : styles.unclickedCategory
          }
        >
          Search for <br /> Title
        </span>
        <Divider />
        <span
          onClick={() => setSearchCategory('artist')}
          className={
            searchCategory === 'artist'
              ? styles.clickedCategory
              : styles.unclickedCategory
          }
        >
          Search for <br /> Artists
        </span>
      </div>
      <div className={styles.searchCards}>
        {searchResult ? (
          <SearchCardList
            searchResults={searchResult}
            showAlbum={(id) => setAlbumId(id)}
          />
        ) : (
          <p>nix</p>
        )}
      </div>
    </div>
  );
}
