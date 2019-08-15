import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './faImports';

const Menu = () => {
  const context = useContext(AppContext);
  return (
    <ul>
      <li className="link">
        <NavLink tabIndex="2" exact activeClassName="active" to="/">Home</NavLink>
      </li>
      <li className="link">
        <NavLink tabIndex="3" activeClassName="active" to="/todos">To Do's</NavLink>
      </li>
      <li className="link">
        <a tabIndex="4" href="https://github.com/httpJunkie/react-todo">Source Code <span className="k-icon k-i-hyperlink-open-sm"></span></a>
      </li>
      <li className="menu">
        <FontAwesomeIcon tabIndex="1" icon="bars" 
          onKeyPress={event => {
            if (event.key === 'Enter') {
              context.toggleSidenav(!context.navOpen)
            }
          }}
          onClick={() => {
            context.toggleSidenav(!context.navOpen)
          }}
      />
      </li>
    </ul>
  )
}

export default Menu;