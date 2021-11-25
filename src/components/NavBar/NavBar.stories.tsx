import NavBar from './NavBar';

export default {
  component: NavBar,
  title: 'Components/NavBar',
};

export const Home = () => <NavBar activeLink="home" />;
export const Friends = () => <NavBar activeLink="friends" />;
export const Search = () => <NavBar activeLink="search" />;
