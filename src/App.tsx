import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyCollection from './Pages/MyCollection/MyCollection';
import Login from './Pages/Login/Login';
import Search from './Pages/Search/Search';
import Friends from './Pages/Friends/Friends';
import NavBar from './components/NavBar/NavBar';
import Phono_Logo from './assets/Phono_Logo';

function App() {
  const [activeLink, setActiveLink] = useState<string>();
  const current = useLocation();
  useEffect(() => {
    return setActiveLink(current.pathname);
  }, [current]);

  return (
    <>
      <Phono_Logo />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<MyCollection />} />
        <Route path="search" element={<Search />} />
        <Route path="friends" element={<Friends />} />
      </Routes>

      {activeLink !== '/' && <NavBar activeLink={activeLink} />}
    </>
  );
}

export default App;
