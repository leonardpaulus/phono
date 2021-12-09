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

export type AlbumProps = {
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
  in_collection: boolean;
  instanceId: number;
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

export type SearchCardListProps = {
  searchResults: FilteredSearchResultProps[];
  showAlbum: (id: number) => void;
};

export type AlbumInfoProps = {
  collection: AlbumProps;
};

export type BackButtonProps = {
  goBack: (back: string) => void;
};

export type FuseSearchProps = {
  result: AlbumProps[];
};
