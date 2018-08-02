import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Question from './pages/Question';
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard";
import GlobalPage from './pages/Global/Global';

const App = () => (
  <Router>
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/question" component={Question} />
        <Route exact path="/global" component={GlobalPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Wrapper>
  </Router> 
);

export default App;
