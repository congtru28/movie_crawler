import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import GetByUrl from './components/GetByUrl';
import GetByFileUpload from './components/GetByFileUpload';
import ShowMovies from "./components/ShowMovies";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/url" className="navbar-brand">
          Movie crawler
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/url"} className="nav-link">
              Get by url
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/upload"} className="nav-link">
              Upload file
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/getAll"} className="nav-link">
              Get all
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/url" component={GetByUrl} />
          <Route path="/upload" component={GetByFileUpload} />
          <Route path="/getAll" component={ShowMovies} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
