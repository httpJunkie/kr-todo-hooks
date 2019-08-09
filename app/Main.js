import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { AppContext } from "./context/AppContext";

const Home = lazy(() => import('./view-components/Home'));
const Todos = lazy(() => import('./view-components/todos/Todos'));
const Todoz = lazy(() => import('./view-components/todos/Todoz'));
const LoadingMessage = () => `loading...`;

import SideNav from "./partial-components/Sidenav";
import TopNav from "./partial-components/Topnav";
import Footer from "./partial-components/Footer";

const Main = () => {
  const context = useContext(AppContext);
  let breakpoint = useMediaPredicate("(min-width: 600px)") ? "small" : "medium";
  let themeMode = context.themeMode === "light" ? "light" : "dark";

  return (
    <BrowserRouter>
      <div className={`app-container ${breakpoint} ${themeMode}`}>
        <main>
          <header>
            <div className="logo">
              <span className="k-icon k-i-check"></span> <span>the-todo.co</span>
            </div>
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
            <Footer />
          </footer>
        </main>
        <SideNav />
      </div>
    </BrowserRouter>
  );
};

export default Main;
