import React, { useContext } from 'react';
import { AppContext } from "./AppContext";

const Theme = () => {
  const context = useContext(AppContext);

if(context.themeMode === 'light') {
  console.log('light mode');
  require('./sass/blue-pink-light/variables.scss');
  require('./sass/blue-pink-light/all.css');
  require('./app-light.scss');
}

if(context.themeMode === 'dark') {
  console.log('dark mode');
  require('./sass/cyan-amber-dark/variables.scss');
  require('./sass/cyan-amber-dark/all.css');
  require('./app-dark.scss');
}

  return null;
}

export default Theme;