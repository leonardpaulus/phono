import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Search.module.css';
import useSearchLibrary from '../../utils/useSearchLibrary';
import { useState } from 'react';
import SearchCardList from '../../components/SearchCardList/SearchCardList';
import Divider from '../../assets/Divider';
import useAlbumDetail from '../../utils/useAlbumDetail';
import AlbumInfo from '../../components/AlbumInfo/AlbumInfo';
import BackButton from '../../components/BackButton/BackButton';
import SearchRecords from './SearchAssets/SearchRecords.svg';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const { searchResult, setSearchResult } = useSearchLibrary(
    searchQuery,
    searchCategory
  );
  const [albumId, setAlbumId] = useState<number | null>(null);
  const { albumInfo, setAlbumInfo } = useAlbumDetail(albumId);

  let searchPageContent;

  function handleSearch(category: string) {
    setSearchResult(null);
    setSearchCategory(category);
  }

  if (albumInfo) {
    searchPageContent = (
      <>
        <BackButton goBack={() => setAlbumInfo(null)} />
        <img src={albumInfo.cover} className={styles.cover} alt={''} />
        <AlbumInfo collection={albumInfo} />
      </>
    );
  } else {
    searchPageContent = (
      <>
        <div className={styles.toggleInput}>
          <div
            onClick={() => handleSearch('title')}
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
            onClick={() => handleSearch('artist')}
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
        {searchResult ? (
          <SearchCardList
            searchResults={searchResult}
            showAlbum={(id) => setAlbumId(id)}
          />
        ) : (
          <img
            className={styles.searchRecordsIcon}
            src={SearchRecords}
            alt={''}
          />
        )}
      </>
    );
  }

  return (
    <div
      className={
        !albumInfo
          ? `${styles.page} ${styles.emptypage}`
          : `${styles.page} ${styles.collectionpage}`
      }
    >
      <SearchBar
        placeholder={'Search the library'}
        onSubmit={(search) => setSearchQuery(search)}
      />

      {searchPageContent}
    </div>
  );
}
