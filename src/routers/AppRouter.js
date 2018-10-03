import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import MyAccountPage from '../components/MyAccountPage';
import AddDealPage from '../components/AddDealPage';
import EditDealPage from '../components/EditDealPage';
import NotFoundPage from '../components/NotFoundPage';
import DealPage from '../components/DealPage';
import DealMapPage from '../components/DealMapPage';
import Admin from '../components/Admin';
import PrivateRoute from './PrivateRoute';



export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
    <Header history={history} />

      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/deal/:title" component={DealPage}  />
        <PrivateRoute path="/create" component={AddDealPage} />
        <PrivateRoute path="/myaccount" component={MyAccountPage} />
        <PrivateRoute path="/edit/:title" component={EditDealPage} />
        <Route path="/admin" component={Admin} />
        <Route path="/deal-map" component={DealMapPage}  />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
