import { FormEvent } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  placeholder: string;
  searchLocation: string;
};

function SearchBar({
  placeholder,
  searchLocation,
}: SearchBarProps): JSX.Element {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await search(searchLocation);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.textInput}
        placeholder={placeholder}
      ></input>
      <label>
        <input type="submit" className={styles.defaultSubmit}></input>
        <img
          src="../../src/assets/SearchBarIcon.svg"
          className={styles.submitButton}
        />
      </label>
    </form>
  );
}

export default SearchBar;
