import { useState } from 'react';
import styles from './AlbumInfo.module.css';

export default function AlbumInfo(): JSX.Element {
  const [showTracklist, setShowTracklist] = useState<string>('View Tracklist');
  const [tracklist, setTracklist] = useState<null | JSX.Element>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  const newTracklist = (
    <div className={styles.tracklist}>
      <p>A1</p>
      <h4>Intro</h4>
      <p>0:37</p>
      <p>A2</p>
      <h4>Ciao Ciao</h4>
      <p>2:33</p>
      <p>A3</p>
      <h4>Palmen Aus Plastik</h4>
      <p>3:05</p>
      <p>A4</p>
      <h4>Mörder</h4>
      <p>3:34</p>
      <p>B1</p>
      <h4>Ohne Mein Team</h4>
      <p>3:08</p>
      <p>B2</p>
      <h4>Erblindet</h4>
      <p>3:10</p>
      <p>B3</p>
      <h4>Evil</h4>
      <p>5:42</p>
      <p>B4</p>
      <h4>Attackieren</h4>
      <p>4:01</p>
      <p>C1</p>
      <h4>Killa</h4>
      <p>2:36</p>
      <p>C2</p>
      <h4>Ruhe Nach Dem Sturm</h4>
      <p>3:14</p>
      <p>C3</p>
      <h4>Vaporizer</h4>
      <p>3:52</p>
      <p>C4</p>
      <h4>Dankbarkeit</h4>
      <p>3:29</p>
      <p>D1</p>
      <h4>Skimaske</h4>
      <p>2:27</p>
      <p>D2</p>
      <h4>Cabriolet</h4>
      <p>3:33</p>
      <p>D3</p>
      <h4>Daneben</h4>
      <p>3:44</p>
    </div>
  );

  function handleOnclick() {
    setShowTracklist('Tracklist:');
    setTracklist(newTracklist);
    setClicked(!clicked);
  }

  return (
    <article className={styles.albumcard}>
      <h1>Palmen aus Plastik</h1>
      <h2>Bonez MC & RAF Camora</h2>
      <p className={styles.value}>83,62€</p>
      <div className={styles.infoText}>
        <h3>Label: </h3>
        <p>AUF!KEINEN!FALL!, Universal Music Group</p>
        <h3>Release:</h3>
        <p>23. Sept. 2016</p>
        <h3>Genre:</h3>
        <p>Hip Hop, Reggae</p>
        <h3>Style:</h3>
        <p>Dancehall</p>
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
