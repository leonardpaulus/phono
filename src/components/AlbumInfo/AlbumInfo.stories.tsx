import AlbumInfo from './AlbumInfo';

export default {
  component: AlbumInfo,
  title: 'Components/AlbumInfo',
};

export const Default = () => (
  <AlbumInfo
    album={{
      title: 'title',
      artist: 'artist',
      labels: [],
      genres: [],
      styles: [],
      tracklist: [],
      release: 'release',
      id: 242,
      sales_history: { median: { value: {} } },
      cover: 'cover',
      in_collection: true,
      instanceId: 1,
    }}
  />
);
