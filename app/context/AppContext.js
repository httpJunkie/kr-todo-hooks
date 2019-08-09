import React, { useState, useEffect, createContext } from 'react';
const theme_key = 'kr_todo_theme';

const AppContext = createContext();
const AppProvider = props => {
  const [appData, setApp] = useState({
    navOpen: false,
    themeMode: localStorage.getItem(theme_key) || 'light',
    toggleSidenav: value => setApp(data => ({ ...data, navOpen: value })),
    changeTheme: mode => setApp(data => ({...data, themeMode: mode }))
  });
  useEffect(() => localStorage.setItem(theme_key, appData.themeMode), [appData.themeMode]);
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };