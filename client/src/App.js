import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./styles.scss";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path ="/bubbles" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
