import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { AppContext } from "./AppContext";

import Home from "./view-components/Home";
import Todos from "./view-components/todos/Todos";
import Todoz from "./view-components/todos/Todoz";

import SideNav from "./partial-components/Sidenav";
import TopNav from "./partial-components/Topnav";
import Footer from "./Footer";

const Main = () => {
  const context = useContext(AppContext);
  let isMediumPlus = useMediaPredicate("(min-width: 600px)") ? false : true;

  return (
    <>
      <BrowserRouter>
        <div
          className={`app-container ${!isMediumPlus ? "medium" : "small"} ${context.themeMode === "light" ? "light" : "dark"}`}>
          <main>
            <header>
              <div className="logo">
                <span className="k-icon k-i-check" /> the-todo.co
              </div>
              <TopNav />
            </header>

            <section>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/todos" component={Todos} />
                <Route exact path="/todoz" component={Todoz} />
                <Route
                  render={() => (
                    <h2 className="four-o-four">404 Page Not Found</h2>
                  )}
                />
              </Switch>
            </section>

            <footer>
              <Footer />
            </footer>
          </main>
          <SideNav />
        </div>
      </BrowserRouter>
    </>
  );
};

export default Main;
