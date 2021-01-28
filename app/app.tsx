import * as React from 'react';
import { StartPage } from "./Slap/Generator/StartPage";
import { SlapPage } from './Slap/Slap/Page';
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
} from "react-router-dom";
import { Components } from './Slap/Common/Components';

export const App = () => {
  return <Router>
    <Route path="/slap/:id" component={SlapPage} exact />
    <Route path="/generator" component={StartPage} exact />
    <Route path='/components' component={Components} exact />
    {/* <Redirect from="/" to="/generator" exact /> */}
  </Router>;
}