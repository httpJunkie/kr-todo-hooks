import React from 'react';

/* Import all main styles for the entire application */
import 'normalize.css';
import '@progress/kendo-theme-material/dist/all.css';
import './App.scss';

/* Import Global App State and Provide to entire Application */
import { AppProvider } from "./context/AppContext";
import Frame from './Frame';

const App = () => {

  return (
    <AppProvider>
      <Frame />
    </AppProvider>
  )
}

export default App;