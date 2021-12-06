import { FormEvent, useState } from 'react';
import styles from './SearchBar.module.css';
import SearchBarIcon from './searchAssets/SearchBarIcon.svg';
import DeleteIcon from './searchAssets/DeleteIcon.svg';
import { SearchBarProps } from '../../lib/types';

function SearchBar({ placeholder, onSubmit }: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (search != null) {
      onSubmit(search);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <input type="reset" className={styles.defaultReset} />
        <img className={styles.deleteButton} src={DeleteIcon} alt={'cross'} />
      </label>
      <input
        type="text"
        className={styles.textInput}
        placeholder={placeholder}
        onChange={(event) => setSearch(event.target.value)}
        required
      />
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
