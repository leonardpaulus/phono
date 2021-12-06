import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Search.module.css';
import useSearchLibrary from '../../utils/useSearchLibrary';
import { useState } from 'react';
import SearchCard from '../../components/SearchCard/SearchCard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const { searchResult } = useSearchLibrary(searchQuery, searchCategory);

  return (
    <div className={styles.searchPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search the library'}
        searchQuery={(search) => setSearchQuery(search)}
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
        <div className={styles.divider}></div>
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
          <SearchCard searchResults={searchResult} />
        ) : (
          <p>nix</p>
        )}
      </div>
    </div>
  );
}
