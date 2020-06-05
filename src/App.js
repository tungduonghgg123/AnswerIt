import React from 'react';
import { color } from './styles/index'
import { connect } from 'react-redux';
import * as actions from './redux/actions'
import Home from './components/Pages/Home/Home'
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
          {/* <Route path="/landing"> 
            <Landing/>
          </Route> */}
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>

    );
  }
}
