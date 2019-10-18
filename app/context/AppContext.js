import React, { useState, useEffect, createContext } from 'react';
import { useMediaPredicate } from "react-media-hook";

const AppContext = createContext();

const AppProvider = props => {
  const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const [appData, setApp] = useState({

    navOpen: false,
    toggleSidenav: value => setApp(data => (
      { ...data, navOpen: value }
    )),

    themeMode: localStorage.getItem('kr-todo-theme') || preferredTheme,
    changeTheme: mode => setApp(data => (
      {...data, themeMode: mode }
    )),

    screenAnnoncement: null,
    setScreenAnnoncement: (message, action) => {
      setApp(data => ({...data, screenReaderAnnoncement: message }));
      console.log(message);
    }

  });
  
  useEffect(() => {
    localStorage.setItem('kr-todo-theme', appData.themeMode)
    }, [appData.themeMode]
  );
  
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };