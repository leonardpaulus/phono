import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyCollection from './Pages/MyCollection/MyCollection';
import Login from './Pages/Login/Login';
import Search from './Pages/Search/Search';
import Friends from './Pages/Friends/Friends';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<MyCollection />} />
          <Route index element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
