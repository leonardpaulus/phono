type AlbumProps = {
  title: string;
  artist: string;
  labels: LabelProps[];
  genres: [];
  styles: [];
  tracklist: TracklistProps[];
  release: string;
  id: number;
  sales_history: SalesHistoryProps;
  cover: string;
};

export type AlbumInfoProps = {
  collection: AlbumProps;
};

type SalesHistoryProps = {
  median: SalesValueProps;
};

type SalesValueProps = {
  value: object;
};

export type CoverSwiperProps = {
  collection: AlbumProps[];
  changeActiveSlide: (index: number) => void;
};

type TracklistProps = {
  position: string;
  title: string;
  duration: string;
};

type LabelProps = {
  name: string;
};
