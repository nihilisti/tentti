import React from 'react';
import './App.css';
import Nav from './TenttiNav';
// import uuid from 'react-uuid';
import Welcome from './Welcome';
import Exams from './Exams';
import Drop from './Drop';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/exams">
          <Exams />
        </Route>
        <Route path="/drop">
          <Drop />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;