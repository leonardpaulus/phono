import { useEffect, useState } from 'react';
import { AlbumProps } from '../CoverSwiper/CoverSwiper';
import styles from './AlbumInfo.module.css';

type AlbumInfoProps = {
  collection: AlbumProps;
};

export default function AlbumInfo({ collection }: AlbumInfoProps): JSX.Element {
  const [showTracklist, setShowTracklist] = useState<string>('View Tracklist');
  const [tracklist, setTracklist] = useState<null | JSX.Element>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const newTracklist = (
    <div className={styles.tracklist}>
      {collection.tracklist.map((track) => (
        <>
          <p>{track.position}</p>
          <h4>{track.title}</h4>
          <p>{track.duration}</p>
        </>
      ))}
    </div>
  );

  function handleOnclick() {
    setShowTracklist('Tracklist:');
    setTracklist(newTracklist);
    setClicked(true);
  }

  useEffect(() => {
    setShowTracklist('View Tracklist');
    setTracklist(null);
    setClicked(false);
  }, [collection]);

  return (
    <article className={styles.albumcard}>
      <h1>{collection.title}</h1>
      <h2>{collection.artist}</h2>
      <span className={styles.value}>
        {collection.sales_history.median.value}€
      </span>
      <div className={styles.infoText}>
        <h3>Label: </h3>
        <div>
          {collection.labels.map((label, index) => (
            <span key={index} className={styles.content}>
              {label.name}
            </span>
          ))}
        </div>
        <h3>Release:</h3>
        <span className={styles.content}>{collection.release}</span>
        <h3>Genre:</h3>
        <div>
          {collection.genres.map((genre, index) => (
            <span key={index} className={styles.content}>
              {genre}
              {index + 1 < collection.genres.length && ', '}
            </span>
          ))}
        </div>
        {collection.styles.length > 0 ? <h3>Style:</h3> : null}
        {collection.styles.length > 0 ? (
          <div>
            {collection.styles.map((style, index) => (
              <span key={index} className={styles.content}>
                {style}
                {index + 1 < collection.styles.length && ', '}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <span
          className={!clicked ? styles.cta : styles.cta__clicked}
          onClick={() => {
            !clicked ? handleOnclick() : null;
          }}
        >
          {showTracklist}
        </span>
        {tracklist}
      </div>
    </article>
  );
}
