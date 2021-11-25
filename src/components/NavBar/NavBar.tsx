import styles from './Navbar.module.css';
import Home from './NavigationAssets/Home';
import Friends from './NavigationAssets/Friends';
import Search from './NavigationAssets/Search';

type NavBarProps = {
  activeLink?: 'search' | 'home' | 'friends';
};

function NavBar({ activeLink }: NavBarProps): JSX.Element {
  return (
    <div className={styles.navigation}>
      <Search
        fill={
          activeLink === 'search'
            ? 'var(--color-secondary)'
            : 'var(--color-text)'
        }
      />
      <Home
        fill={
          activeLink === 'home' ? 'var(--color-secondary)' : 'var(--color-text)'
        }
      />
      <Friends
        fill={
          activeLink === 'friends'
            ? 'var(--color-secondary)'
            : 'var(--color-text)'
        }
      />
    </div>
  );
}

export default NavBar;
