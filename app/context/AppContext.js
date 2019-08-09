import React, { useState, useEffect, createContext } from 'react';
const theme_key = 'kr_todo_theme';

const AppContext = createContext();
const AppProvider = (props) => {
  const defaultState = {
    navOpen: false,
    // Step #0 check to see if we have a theme setting in local storage
    // if so, use it, otherwise let the app use 'light' mode.
    themeMode: localStorage.getItem(theme_key) || 'light',
    toggleSidenav: (value) => {
      setApp((data) => ({ ...data, navOpen: value }));
    },
    // Step #1 (updating the themeMode) we set the themeMode value first
    changeTheme: (mode) => {
      setApp((data) => ({...data, themeMode: mode }));
    }
  }

  // setup blobal app state before referring to it in the useEffect
  const [appData, setApp] = useState(defaultState);

  // Step #2 if appData.themeMode has changed, run a side effect
  useEffect(() => {
    // Step #3 update local storage so that if the app is closed and reopened
    // We will know what the previous value was left at
    localStorage.setItem(theme_key, appData.themeMode);
  }, [appData.themeMode]);

  return (
    <AppContext.Provider value={appData}>
      {props.children}
    </AppContext.Provider>
  )
}
export { AppContext, AppProvider };