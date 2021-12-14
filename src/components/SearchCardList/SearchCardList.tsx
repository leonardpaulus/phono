import styles from './SearchCardList.module.css';
import { SearchCardListProps } from '../../lib/types';
import InCollection from '../../assets/InCollection';
import { useTransition, animated } from 'react-spring';

export default function SearchCardList({
  searchResults,
  showAlbum,
}: SearchCardListProps) {
  const searchCardListTransition = useTransition(searchResults, {
    from: { y: 800, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 800, opacity: 0 },
    trail: 30,
  });

  return (
    <div className={styles.searchCards}>
      {searchCardListTransition(
        (style, searchCard) =>
          searchCard && (
            <animated.article
              style={style}
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
                  alt={''}
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
            </animated.article>
          )
      )}
    </div>
  );
}
