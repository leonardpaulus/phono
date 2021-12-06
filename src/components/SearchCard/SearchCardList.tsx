import styles from './SearchCardList.module.css';
import { SearchCardProps } from '../../lib/types';

export default function SearchCard({ searchResults }: SearchCardProps) {
  return (
    <>
      {searchResults.map((searchCard) => (
        <article className={styles.searchCard} key={searchCard.id}>
          <img className={styles.albumCover} src={searchCard.cover} />
          <div className={styles.albumInfo}>
            <h2 className={styles.title}>{searchCard.title}</h2>
            <p className={styles.inCollection}>
              {searchCard.in_collection ? 'In Collection' : 'Not in Collection'}
            </p>
          </div>
        </article>
      ))}
    </>
  );
}
