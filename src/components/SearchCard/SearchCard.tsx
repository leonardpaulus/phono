import styles from './SearchCard.module.css';

export default function SearchCard() {
  return (
    <article className={styles.searchCard}>
      <img
        className={styles.albumCover}
        src={
          'https://img.discogs.com/VsUV3UioUol_Su2ID2ZZ8djv8oc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-667271-1602005647-6694.jpeg.jpg'
        }
      />
      <div className={styles.albumInfo}>
        <h1>...But Seriously</h1>
        <h2>Phil Collins</h2>
      </div>
    </article>
  );
}
