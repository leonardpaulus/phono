import styles from './Loading.module.css';
import LoadingImage from './LoadingImage.svg';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img
        src={LoadingImage}
        className={styles.loadingImage}
        alt={'spinning vinyl record'}
      />
      <p>Loading...</p>
    </div>
  );
}
