import { FormEvent } from 'react';
import styles from './SearchBar.module.css';
import SearchBarIcon from './searchAssets/SearchBarIcon.svg';

type SearchBarProps = {
  placeholder: string;
  searchLocation: string;
};

function SearchBar({
  placeholder,
  searchLocation,
}: SearchBarProps): JSX.Element {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchLocation); //Add a search function later
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
        <img src={SearchBarIcon} className={styles.submitButton} />
      </label>
    </form>
  );
}

export default SearchBar;
