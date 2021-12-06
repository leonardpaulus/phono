import SearchCardList from './SearchCardList';

export default {
  component: SearchCardList,
  title: 'Components/SearchCard',
};

export const Card = () => <SearchCardList searchResults={[]} />;
