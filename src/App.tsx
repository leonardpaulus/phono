import { Routes, Route, useLocation } from 'react-router-dom';
import MyCollection from './Pages/MyCollection/MyCollection';
import Login from './Pages/Login/Login';
import Search from './Pages/Search/Search';
import Friends from './Pages/Friends/Friends';
import NavBar from './components/NavBar/NavBar';
import PhonoLogo from './assets/PhonoLogo';
import styles from './App.module.css';

function App() {
  const current = useLocation();

  return (
    <div className={styles.app}>
      {current.pathname != '/' && <PhonoLogo />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<MyCollection />} />
        <Route path="search" element={<Search />} />
        <Route path="friends" element={<Friends />} />
      </Routes>

      {current.pathname != '/' && <NavBar activeLink={current.pathname} />}
    </div>
  );
}

export default App;
