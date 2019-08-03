import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';

import './App.scss';
import '@progress/kendo-theme-material/dist/all.css';
import '@progress/kendo-react-intl';

import { AppProvider } from "./AppContext";

import Home from './view-components/Home';
import Todos from './view-components/todos/Todos';
import Todoz from './view-components/todos/Todoz';

import SideNav from './partial-components/Sidenav';
import TopNav from './partial-components/Topnav';
import Footer from './Footer';

import Theme from './Theme';

const App = () => {
  let isMediumPlus = useMediaPredicate("(min-width: 600px)") ? false : true;

  return (
    <AppProvider>
      <Theme />
      <BrowserRouter>
        <div className={`app-container ${!isMediumPlus ? 'medium' : 'small'} `}>
          <main>

            <header>
              <div className="logo">
                <span className="k-icon k-i-check"></span> the-todo.co
              </div>
              <TopNav />
            </header>

            <section>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/todos" component={Todos} />
                <Route exact path="/todoz" component={Todoz} />
                <Route render={() => <h2 className="four-o-four">404 Page Not Found</h2>} />
              </Switch>
            </section>

            <footer>
              <Footer />
            </footer>

          </main>
          <SideNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App;