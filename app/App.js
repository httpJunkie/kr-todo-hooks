import React from 'react';


import './App.scss';
import '@progress/kendo-theme-material/dist/all.css';
import '@progress/kendo-react-intl';

import { AppProvider } from "./AppContext";

import Main from './Main';

const App = () => {

  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

export default App;