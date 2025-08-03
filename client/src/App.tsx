import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Pets as PetsIcon } from '@mui/icons-material';

import Dashboard from './components/Dashboard.tsx';

import classes from './App.module.css';

const App = () => {
  /**
   * During development we can still access the base path at `/`
   * And this hook will make sure that we land on the base `/app`
   * path which will mount our App as usual.
   * In production, Phoenix makes sure that the `/app` route is
   * always mounted within the first request.
   * */
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  return (
    <BrowserRouter basename="app">
      <div className={classes.nav}>
        <Link to="/"><PetsIcon fontSize='medium' /></Link>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;