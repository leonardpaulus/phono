import styles from './Navbar.module.css';
import Home from './NavigationAssets/Home';
import Friends from './NavigationAssets/Friends';
import Search from './NavigationAssets/Search';
import { Link } from 'react-router-dom';

type NavBarProps = {
  activeLink?: 'search' | 'home' | 'friends';
};

function NavBar({ activeLink }: NavBarProps): JSX.Element {
  const active = 'var(--color-secondary)';
  const inactive = 'var(--color-text)';

  return (
    <div className={styles.navigation}>
      <Link to="/search">
        <Search fill={activeLink === 'search' ? active : inactive} />
      </Link>
      <Link to="/home">
        <Home fill={activeLink === 'home' ? active : inactive} />
      </Link>
      <Link to="/friends">
        <Friends fill={activeLink === 'friends' ? active : inactive} />
      </Link>
    </div>
  );
}

export default NavBar;
