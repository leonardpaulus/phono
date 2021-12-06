import styles from './SearchCardList.module.css';
import { SearchCardProps } from '../../lib/types';
import InCollection from '../../assets/InCollection';

export default function SearchCard({
  searchResults,
  showAlbum,
}: SearchCardProps) {
  return (
    <>
      {searchResults.map((searchCard) => (
        <article
          className={styles.searchCard}
          key={searchCard.id}
          onClick={() => showAlbum(searchCard.id)}
        >
          <div className={styles.albumCover__container}>
            <img
              className={
                searchCard.in_collection
                  ? `${styles.coverGreyscale} ${styles.albumCover}`
                  : `${styles.albumCover}`
              }
              src={searchCard.cover}
            />
            {searchCard.in_collection && (
              <div className={styles.inCollection}>
                <InCollection />
              </div>
            )}
          </div>
          <div className={styles.albumInfo}>
            <h2 className={styles.title}>{searchCard.title}</h2>
          </div>
        </article>
      ))}
    </>
  );
}
