import Phono_Logo from '../../assets/Phono_Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Search.module.css';

export default function Search() {
  return (
    <div className={styles.searchPage}>
      <Phono_Logo />
      <SearchBar placeholder={'Search the library'} searchQuery={console.log} />
      <NavBar activeLink={'search'} />
    </div>
  );
}
