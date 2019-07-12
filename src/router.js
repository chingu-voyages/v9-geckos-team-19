import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Landing from "./views/landing";
import App from "./App";

class Routes extends React.Component {
  state = {
    city: ""
  };
  getCity = city => {
    this.setState({
      city: city
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Landing getCity={this.getCity} />}
          />
          <Route
            exact
            path="/citypage"
            render={() => <App landingCity={this.state.city} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
