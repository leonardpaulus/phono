import { FormEvent, useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import SearchBarIcon from './searchAssets/SearchBarIcon.svg';
import DeleteIcon from './searchAssets/DeleteIcon.svg';
import { SearchBarProps } from '../../lib/types';

function SearchBar({ placeholder, onSubmit }: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState<string>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (search != null) {
      onSubmit(search);
    }
  };

  useEffect(() => {
    setSearch('');
  }, [placeholder]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {search && (
        <label>
          <input type="reset" className={styles.defaultReset} />
          <img
            className={styles.deleteButton}
            src={DeleteIcon}
            alt={'cross'}
            onClick={() => onSubmit('')}
          />
        </label>
      )}
      <input
        type="text"
        className={styles.textInput}
        placeholder={placeholder}
        onChange={(event) => setSearch(event.target.value)}
        value={search}
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
