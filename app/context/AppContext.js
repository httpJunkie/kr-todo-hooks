import React, { useState, useEffect, createContext } from 'react';
const ls_theme_key = 'kr_todo_theme'; // local storage key for theme

const AppContext = createContext();
const AppProvider = (props) => {
  const defaultState = {
    navOpen: false,
    themeMode: localStorage.getItem(ls_theme_key) || 'light',
    toggleSidenav: (value) => {
      setApp((data) => ({ ...data, navOpen: value }));
    },
    changeTheme: (mode) => {
      setApp((data) => ({...data, themeMode: mode }));
    }
  }

  const [appData, setApp] = useState(defaultState);
  useEffect(() => {
    localStorage.setItem(ls_theme_key, appData.themeMode);
  }, [appData.themeMode]);
  
  return (
    <AppContext.Provider value={appData}>
      {props.children}
    </AppContext.Provider>
  )
}
export { AppContext, AppProvider };