import SearchBar from './SearchBar';

export default {
  component: SearchBar,
  title: 'Components/SearchBar',
};

export const MyCollection = () => (
  <SearchBar placeholder={'Search my Collection'} onSubmit={console.log} />
);

export const FriendsCollection = () => (
  <SearchBar placeholder={'Search Friends Collection'} onSubmit={console.log} />
);

export const Users = () => (
  <SearchBar placeholder={'Search Users'} onSubmit={console.log} />
);

export const Library = () => (
  <SearchBar placeholder={'Search the library'} onSubmit={console.log} />
);
