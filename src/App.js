import React from 'react';
import { color } from './styles/index'
import { connect } from 'react-redux';
import * as actions from './redux/actions'
import Home from './components/Pages/Home/Home'
import Login from './components/Pages/Authen/Login/Login'
// import Register from './components/Pages/Authen/Register/Register'
import Register from './components/Pages/Authen/Register/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
          <Login/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>

    );
  }
}
