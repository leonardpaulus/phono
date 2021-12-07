import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Search.module.css';
import useSearchLibrary from '../../utils/useSearchLibrary';
import { useState } from 'react';
import SearchCardList from '../../components/SearchCard/SearchCardList';
import Divider from '../../assets/Divider';
import useAlbumDetail from '../../utils/useAlbumDetail';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import BackButton from '../../components/BackButton/BackButton';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const { searchResult } = useSearchLibrary(searchQuery, searchCategory);
  const [albumId, setAlbumId] = useState<number | null | string>(null);
  const { albumInfo } = useAlbumDetail(albumId);

  let searchPageContent;

  if (albumInfo) {
    searchPageContent = (
      <>
        <BackButton goBack={(back) => setAlbumId(back)} />
        <img src={albumInfo.cover} className={styles.cover} />
        <AlbumInfo collection={albumInfo} />
      </>
    );
  } else {
    searchPageContent = (
      <>
        <div className={styles.toggleInput}>
          <div
            onClick={() => setSearchCategory('title')}
            className={
              searchCategory === 'title'
                ? styles.clickedCategory
                : styles.unclickedCategory
            }
          >
            <p>Search</p>
            <p>for Title</p>
          </div>
          <Divider />
          <div
            onClick={() => setSearchCategory('artist')}
            className={
              searchCategory === 'artist'
                ? styles.clickedCategory
                : styles.unclickedCategory
            }
          >
            <p>Search for</p>
            <p>Artists</p>
          </div>
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
      </>
    );
  }

  return (
    <div className={styles.searchPage}>
      <Phono_Logo />
      <SearchBar
        placeholder={'Search the library'}
        onSubmit={(search) => setSearchQuery(search)}
      />

      {searchPageContent}
      <NavBar activeLink={'search'} />
    </div>
  );
}
