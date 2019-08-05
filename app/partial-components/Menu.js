import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "../AppContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './faImports';

const Menu = () => {
  const context = useContext(AppContext);
  return (
    <ul>
      <li className="link" tabindex="2"><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li className="link" tabindex="3"><NavLink activeClassName="active" to="/todos">Todos</NavLink></li>
      <li className="link" tabindex="4"><a href="https://github.com/httpJunkie/react-todo">Source Code</a></li>
      <li className="menu">
        <FontAwesomeIcon tabindex="1" icon="bars" className="hoverable" 
        onKeyPress={event => {
          if (event.key === 'Enter') {
            context.toggleSidenav(!context.navOpen)
          }
        }}
        onClick={() => {
          context.toggleSidenav(!context.navOpen)
        }} />
      </li>
    </ul>
  )
}

export default Menu;