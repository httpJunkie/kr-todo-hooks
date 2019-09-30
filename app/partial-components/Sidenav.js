import React, { useContext } from 'react';
import './Sidenav.scss';

import Menu from './Menu';

/* We need context in this component to show/hide sidenav */
import { AppContext } from "../context/AppContext";

const Sidenav = () => {
  const context = useContext(AppContext);
  return (
    <div className={`sidenav ${context.navOpen ? 'show' : 'hide'}`}>
      <Menu />
    </div>
  )
}

export default Sidenav;