import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { AppContext } from "./context/AppContext";
import Alert from "@reach/alert";

const Home = lazy(() => import('./view-components/Home'));
const Todos = lazy(() => import('./view-components/todos/Todos'));
const Todoz = lazy(() => import('./view-components/todos/Todoz'));
const LoadingMessage = () => `loading...`;

import Logo from "./partial-components/Logo";
import SideNav from "./partial-components/Sidenav";
import TopNav from "./partial-components/Topnav";
import Foot from "./partial-components/Foot";

const Main = () => {
  const context = useContext(AppContext);
  let breakpoint = useMediaPredicate("(min-width: 600px)") ? "medium" : "small";
  let themeMode = context.themeMode === "light" ? "light" : "dark";

  return (
    <BrowserRouter>
      <div className={`app-container ${breakpoint} ${themeMode}`}>
        <main>
          <header>
            <Logo />
            <TopNav />
          </header>
          <section>
            <Switch>
              <Suspense fallback={<LoadingMessage />}>
                <Route exact path="/" component={Home} />
                <Route exact path="/todos" component={Todos} />
                <Route exact path="/todoz" component={Todoz} />
              </Suspense>
              <Route render={() => <h2>404 Page Not Found</h2>} />
            </Switch>
          </section>
          <footer>
            <Foot />
          </footer>
        </main>
        <SideNav />
      </div>
      <Alert>{context.screenReaderAnnoncement}</Alert>
    </BrowserRouter>
  );
};

export default Main;
