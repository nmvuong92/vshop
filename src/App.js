import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AsyncHooks from './AsyncHooks';
import TodoList from './components/TodoList';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import ContentLoader, { Facebook } from 'react-content-loader';
import Posts from './Posts';
const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    {/* Only SVG shapes */}    
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)
function App() {
  return (
    <Router>
        <div>
          <ul>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faCoffee} />Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/AsyncHooks">Async Hooks</Link>
            </li>
            <li>
              <Link to="/to-do-list">Todo List</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/AsyncHooks">
            <AsyncHooks />
          </Route>
          <Route path="/to-do-list">
            <TodoList />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
        </Switch>
    </Router>
  );
}
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
export default App;
