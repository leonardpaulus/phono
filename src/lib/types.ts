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

export type SearchBarProps = {
  placeholder: string;
  onSubmit: (search: string) => void;
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

type FilteredSearchResultProps = {
  title: string;
  id: number;
  cover: string;
  in_collection: boolean;
};

export type SearchCardProps = {
  searchResults: FilteredSearchResultProps[];
  showAlbum: (id: number) => void;
};

export type SingleAlbumInfoProps = {
  albumInfo: {
    cover: string;
    title: string;
    artist: string;
    labels: [];
    genres: [];
    styles: [];
    tracklist: [];
    release: string;
    id: number;
  } | null;
};
