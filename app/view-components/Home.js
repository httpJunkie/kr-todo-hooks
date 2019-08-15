import React from 'react';
import Counter from './Counter';

const Home = () => {
  document.title = `Todo App Home`;
  return (
    <div className="view-home">
      <h1>State Management  and React Hooks Demo</h1>
      <p>
        This application has responsive menus, working counter component, light and dark themed CSS and contains  
        a working example of the <a href="/todos">todos</a> from Eric's presentation. To view or fork the code, visit <a href="https://github.com/httpJunkie/kr-todo-hooks">this application's repo</a>  on GitHub.
      </p>
      <h2>The Counter Component</h2>
      <Counter></Counter>
    </div>
  )
}

export default Home;