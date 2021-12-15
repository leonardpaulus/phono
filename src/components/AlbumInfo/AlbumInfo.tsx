import React, { useEffect, useState } from 'react';
import styles from './AlbumInfo.module.css';
import { AlbumInfoProps } from '../../lib/types';
import useAddToCollection from '../../utils/useAddToCollection';
import AddToCollection from './AlbumInfoAssets/AddToCollection.svg';
import RemoveFromCollection from './AlbumInfoAssets/RemoveFromCollection.svg';
import useRemoveFromCollection from '../../utils/useRemoveFromCollection';
import { v4 as uuidv4 } from 'uuid';
import { useSpring, useTransition, animated, config } from 'react-spring';

export default function AlbumInfo({ collection }: AlbumInfoProps): JSX.Element {
  const [showTracklist, setShowTracklist] = useState<string>('View Tracklist');
  const [tracklist, setTracklist] = useState<null | JSX.Element>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [addAlbumId, setAddAlbumId] = useState(0);
  const [removeAlbumId, setRemoveAlbumId] = useState(0);
  useAddToCollection(addAlbumId);
  if (collection.instanceId && collection) {
    const instanceId = collection?.instanceId;
    useRemoveFromCollection(removeAlbumId, instanceId);
  }

  const albumInfoCard = useSpring({
    from: { y: 120, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.stiff,
  });

  const albumInfoText = useTransition(collection, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reset: !clicked,
    config: config.slow,
  });

  const newTracklist = (
    <div className={styles.tracklist} key={uuidv4()}>
      {collection.tracklist.map((track) => (
        <React.Fragment key={uuidv4()}>
          <p>{track.position}</p>
          <h4>{track.title}</h4>
          <p>{track.duration}</p>
        </React.Fragment>
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
      {albumInfoText(
        (fadeIn, collection) =>
          collection && (
            <>
              <animated.h1 style={fadeIn}>{collection.title}</animated.h1>
              <animated.h2 style={fadeIn}>{collection.artist}</animated.h2>

              <animated.span style={fadeIn} className={styles.value}>
                {collection.sales_history
                  ? `${collection.sales_history.median.value} €`
                  : null}
              </animated.span>
              <animated.div style={fadeIn} className={styles.infoText}>
                <animated.h3 style={fadeIn}>Label: </animated.h3>
                <animated.div key={uuidv4()}>
                  {collection.labels.map((label) => (
                    <animated.span
                      style={fadeIn}
                      key={uuidv4()}
                      className={styles.content}
                    >
                      {label.name}
                    </animated.span>
                  ))}
                </animated.div>
                <animated.h3 style={fadeIn}>Release:</animated.h3>
                <animated.span style={fadeIn} className={styles.content}>
                  {collection.release}
                </animated.span>
                <animated.h3 style={fadeIn}>Genre:</animated.h3>
                <animated.div key={uuidv4()}>
                  {collection.genres.map((genre, index) => (
                    <animated.span
                      style={fadeIn}
                      key={uuidv4()}
                      className={styles.content}
                    >
                      {genre}
                      {index + 1 < collection.genres.length && ', '}
                    </animated.span>
                  ))}
                </animated.div>
                {collection.styles && collection.styles.length > 0 ? (
                  <animated.h3 style={fadeIn}>Style:</animated.h3>
                ) : null}
                {collection.styles && collection.styles.length > 0 ? (
                  <animated.div key={uuidv4()}>
                    {collection.styles.map((style, index) => (
                      <animated.span
                        style={fadeIn}
                        key={uuidv4()}
                        className={styles.content}
                      >
                        {style}
                        {index + 1 < collection.styles.length && ', '}
                      </animated.span>
                    ))}
                  </animated.div>
                ) : null}
                {!collection.styles && null}
              </animated.div>
            </>
          )
      )}
      ;
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
