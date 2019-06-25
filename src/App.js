import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Timeline from "./components/Timeline";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <ToastContainer />
        <Timeline />
      {/*}  <Switch>
          <Route path="/logout" component={Logout} />
          <Route
            path="/login"
            render={props => {
              return <LoginForm {...props} user={user} />;
            }}
          />
          <Route path="/timeline" component={Timeline} />
          <Route path="/main" component={MainPage} />;
          <Route
            path="/"
            exact
            render={props => {
              if (!user) return <Redirect to="/login" />;
              return <MainPage {...props} />;
            }}
          />
          <Redirect to="/not-found" component={NotFound} />
          </Switch>*/}
      </div>
    );
  }
}

export default App;
