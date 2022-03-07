import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { createTeleporter } from 'react-teleporter';

import { getServerAsync } from './api';
import Drawer from './components/Drawer';
import IndexPage from './pages';
import ServerPage from './pages/server';
import ServerSetupPage from './pages/server/setup';
import TerminalPage from './pages/terminal';
import { useAppDispatch, useAppSelector } from './store';
import { setMenuOpen } from './store/slices/screen';
import { setData } from './store/slices/server';

export const NavbarItems = createTeleporter();

function App() {
  const dispatch = useAppDispatch();
  const {title} = useAppSelector(state => state.screen);

  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const i = setInterval(() => setDate(dayjs().set('ms', 0)), 200);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    getServerAsync().then(data => dispatch(setData(data)));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Cockpit` : 'Cockpit'}</title>
      </Helmet>
      <Drawer />
      <div className="navbar bg-panel shadow-4 pl-1">
        <button className="btn flat mr-2" onClick={() => dispatch(setMenuOpen(true))}>
          <i className="fas fa-bars fa-fw" />
        </button>
        <h1 className="navbar-title mr-2">{title || 'Cockpit'}</h1>
        <NavbarItems.Target />
        <div className="ml-auto text-center text-75 ge-tablet" >
          <time dateTime={date.toISOString()}>
            {date.format('YYYY/MM/DD')}<br/>
            {date.format(`HH:mm:ss`)}
          </time>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/console" element={<TerminalPage />} />
          <Route path="/server" element={<ServerPage />} />
          <Route path="/server/setup" element={<ServerSetupPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
