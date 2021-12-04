import { FormEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import SearchBarIcon from './searchAssets/SearchBarIcon.svg';

type SearchBarProps = {
  placeholder: string;
  searchQuery: (search: string) => void;
};

function SearchBar({ placeholder, searchQuery }: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (search != null) {
      searchQuery(search);
    } else {
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.textInput}
        placeholder={placeholder}
        onChange={(event) => setSearch(event.target.value)}
        required
      ></input>
      <label>
        <input type="submit" className={styles.defaultSubmit}></input>
        <img
          src={SearchBarIcon}
          className={styles.submitButton}
          alt={'magnifying glass'}
        />
      </label>
    </form>
  );
}

export default SearchBar;
