import React, { useEffect, useState } from 'react';
import styles from './AlbumInfo.module.css';
import { AlbumInfoProps } from '../../lib/types';
import useAddToCollection from '../../utils/useAddToCollection';
import AddToCollection from './AlbumInfoAssets/AddToCollection.svg';
import RemoveFromCollection from './AlbumInfoAssets/RemoveFromCollection.svg';
import useRemoveFromCollection from '../../utils/useRemoveFromCollection';
import { v4 as uuidv4 } from 'uuid';
import { useSpring, animated, config } from 'react-spring';

export default function AlbumInfo({ collection }: AlbumInfoProps): JSX.Element {
  const [showTracklist, setShowTracklist] = useState<string>('View Tracklist');
  const [tracklist, setTracklist] = useState<null | JSX.Element>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [addAlbumId, setAddAlbumId] = useState(0);
  const [removeAlbumId, setRemoveAlbumId] = useState(0);
  useAddToCollection(addAlbumId);
  if (collection.instanceId && collection) {
    const instanceId = collection.instanceId;
    useRemoveFromCollection(removeAlbumId, instanceId);
  }

  const albumInfoCard = useSpring({
    from: { y: 120, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.stiff,
  });

  const tracklistTransition = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.stiff,
  });

  const newTracklist = (
    <animated.div
      style={tracklistTransition}
      className={styles.tracklist}
      key={uuidv4()}
    >
      {collection.tracklist.map((track) => (
        <React.Fragment key={uuidv4()}>
          <p>{track.position}</p>
          <h4>{track.title}</h4>
          <p>{track.duration}</p>
        </React.Fragment>
      ))}
    </animated.div>
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

  const handleAddToCollection = () => {
    collection.in_collection = !collection.in_collection;
    setAddAlbumId(collection.id);
  };

  const handleRemoveFromCollection = () => {
    collection.in_collection = !collection.in_collection;
    setRemoveAlbumId(collection.id);
  };

  return (
    <animated.article
      style={albumInfoCard}
      className={styles.albumcard}
      key={uuidv4()}
    >
      {!collection.in_collection && (
        <img
          src={AddToCollection}
          className={styles.toggleCollectionButton}
          onClick={() => handleAddToCollection()}
        />
      )}
      {collection.in_collection && (
        <img
          src={RemoveFromCollection}
          className={styles.toggleCollectionButton}
          onClick={() => handleRemoveFromCollection()}
        />
      )}
      <h1>{collection.title}</h1>
      <h2>{collection.artist}</h2>
      <span className={styles.value}>
        {collection.sales_history
          ? `${collection.sales_history.median.value} €`
          : null}
      </span>
      <div className={styles.infoText}>
        <h3>Label: </h3>
        <div key={uuidv4()}>
          {collection.labels.map((label) => (
            <span key={uuidv4()} className={styles.content}>
              {label.name}
            </span>
          ))}
        </div>
        <h3>Release:</h3>
        <span className={styles.content}>{collection.release}</span>
        <h3>Genre:</h3>
        <div key={uuidv4()}>
          {collection.genres.map((genre, index) => (
            <span key={uuidv4()} className={styles.content}>
              {genre}
              {index + 1 < collection.genres.length && ', '}
            </span>
          ))}
        </div>
        {collection.styles && collection.styles.length > 0 ? (
          <h3>Style:</h3>
        ) : null}
        {collection.styles && collection.styles.length > 0 ? (
          <div key={uuidv4()}>
            {collection.styles.map((style, index) => (
              <span key={uuidv4()} className={styles.content}>
                {style}
                {index + 1 < collection.styles.length && ', '}
              </span>
            ))}
          </div>
        ) : null}
        {!collection.styles && null}
      </div>
      <div key={uuidv4()}>
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
    </animated.article>
  );
}
