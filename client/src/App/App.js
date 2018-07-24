import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../core/Navbar';
import Home from '../Home';
import Listing from '../Listing';
import Settings from '../Settings';
import User from '../User';
import auth from '../services/auth';

// NOTE: EVERY ROUTE AND REDIRECT CHANGE RERENDERS

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // All login/logout backend logic to be here
  // handleLoggedIn = (value) => {
  //   this.setState({ loggedIn: value });
  // };

  // Route will ONLY render if the route matches
  // React.Fragment mitigates unnecessary containing <div> tags
  // TODO: Handle logged in status from external source
  // TODO: Make protected routes and redirect if not logged in
  // TODO: Persist state on refresh and from loading page using URL bar
  render() {
    return (
      <React.Fragment>
        <h2> user: {auth.isAuthenticated() ? 'logged in' : 'logged out'} </h2>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route
            path="/listing"
            render={() =>
              auth.isAuthenticated() ? <Listing /> : <Redirect to="/" />
            }
          />
          <Route
            path="/settings"
            render={() =>
              auth.isAuthenticated ? <Settings /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/(login|register)/"
            render={() =>
              auth.isAuthenticated ? <Redirect to="/" /> : <User />
            }
          />
          <Redirect from="/Listing/*" to="/Listing" />
          <Redirect from="/Settings/*" to="/Settings" />
          <Redirect from="/login/*" to="/login" />
          <Redirect from="/register/*" to="/register" />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
