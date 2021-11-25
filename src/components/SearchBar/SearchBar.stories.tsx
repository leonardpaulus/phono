import SearchBar from './SearchBar';

export default {
  component: SearchBar,
  title: 'Components/SearchBar',
};

export const MyCollection = () => (
  <SearchBar
    placeholder={'Search my Collection'}
    searchLocation={'myCollection'}
  />
);

export const FriendsCollection = () => (
  <SearchBar
    placeholder={'Search Friends Collection'}
    searchLocation={'friendsCollection'}
  />
);

export const Users = () => (
  <SearchBar placeholder={'Search Users'} searchLocation={'users'} />
);

export const Library = () => (
  <SearchBar placeholder={'Search the library'} searchLocation={'library'} />
);
