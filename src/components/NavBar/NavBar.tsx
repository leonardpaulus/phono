import styles from './Navbar.module.css';
import Home from './NavigationAssets/Home';
import Friends from './NavigationAssets/Friends';
import Search from './NavigationAssets/Search';

type NavBarProps = {
  activeLink?: 'search' | 'home' | 'friends';
};

function NavBar({ activeLink }: NavBarProps): JSX.Element {
  const active = 'var(--color-secondary)';
  const inactive = 'var(--color-text)';

  return (
    <div className={styles.navigation}>
      <Search fill={activeLink === 'search' ? active : inactive} />
      <Home fill={activeLink === 'home' ? active : inactive} />
      <Friends fill={activeLink === 'friends' ? active : inactive} />
    </div>
  );
}

export default NavBar;
