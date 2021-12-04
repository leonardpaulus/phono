export type ReleaseProps = {
  artists_sort: string;
  title: string;
  labels: [];
  genres: [];
  styles: [];
  tracklist: [];
  released_formatted: string;
  id: number;
  sales_history: object;
  huge_thumb: string;
};

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

export type SearchResultProps = {
  title: string;
  id: number;
  cover_image: string;
  user_data: UserDataProps;
};

type UserDataProps = {
  in_collection: boolean;
};
