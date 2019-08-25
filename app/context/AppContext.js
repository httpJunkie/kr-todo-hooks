import React, { useState, useEffect, createContext } from 'react';
const theme_key = 'kr_todo_theme';

const AppContext = createContext();
const AppProvider = props => {
  const [appData, setApp] = useState({

    navOpen: false,
    toggleSidenav: value => setApp(data => (
      { ...data, navOpen: value }
    )),

    themeMode: localStorage.getItem(theme_key) || 'light',
    changeTheme: mode => setApp(data => (
      {...data, themeMode: mode }
    )),

    screenAnnoncement: null,
    setScreenAnnoncement: (message, action) => {
      setApp(data => ({...data, screenReaderAnnoncement: message }));
      console.log(message);
    },
  });
  
  useEffect(() => {
    localStorage.setItem(theme_key, appData.themeMode)
    }, [appData.themeMode]
  );
  
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };