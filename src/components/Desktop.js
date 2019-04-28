import React from "react";
import AccountIcon from "../icons/AccountIcon.png";
import LogoutIcon from "../icons/LogoutIcon.png";
import VideoRoomIcon from "../icons/VideoRoomIcon.png";
import TheatreCreationModal from "./TheatreCreationModal";
import TheatreModal from "./TheatreModal";
import UserAccountModal from "./UserAccountModal";
import SignupLoginAboutModal from "./SignupLoginAboutModal";
import adapter from "../services/adapter";
import { Route, Switch, withRouter } from "react-router-dom";

class Desktop extends React.Component {
  state = {
    user: {},
    logged_in: false
  };

  componentDidMount() {
    adapter.getUser().then(data => {
      if (data.message) {
        return;
      } else {
        this.setState({ user: data.user, logged_in: true });
      }
    });
  }

  handleVideoSubmit = url => {
    adapter.createTheatre(url).then(theatre => {
      this.props.history.push(`/theatre/${theatre.id}`);
    });
  };

  handleLoginSubmit = user => {
    adapter.loginUser(user.username, user.password).then(data => {
      if (data.message) {
        alert(data.message);
        this.props.history.push("/signin");
      } else {
        this.setState({ user: data.user, logged_in: true });
        localStorage.setItem("user_token", data.jwt);
        this.props.history.push("/");
      }
    });
  };

  handleLogout = () => {
    localStorage.removeItem("user_token");
    this.setState({ user: {}, logged_in: false }, () => {
      this.props.history.push("/signin");
    });
  };

  render() {
    console.log(
      "%c THE USER: ",
      "background: #000; border: inset grey 1px; color: white",
      this.state.user
    );
    console.log(
      "%c LOGGED IN?",
      "background: #000; border: dotted green 1px; color: red; ",
      this.state.logged_in
    );

    return (
      <div>
        <h1>V I D - N E T</h1>
        <img
          onClick={() => this.props.history.push("/theatre")}
          src={VideoRoomIcon}
          alt=""
        />
        <img
          onClick={() => this.props.history.push("/user")}
          src={AccountIcon}
          alt=""
        />
        {this.state.logged_in ? (
          <img onClick={this.handleLogout} src={LogoutIcon} alt="" />
        ) : null}
        <Switch>
          <Route
            path="/signin"
            render={
              this.state.logged_in
                ? null
                : () => (
                    <SignupLoginAboutModal
                      handleLoginSubmit={this.handleLoginSubmit}
                    />
                  )
            }
          />
          <Route path="/theatre/:id" render={() => <TheatreModal />} />
          <Route
            path="/theatre"
            render={() => (
              <TheatreCreationModal
                handleVideoSubmit={this.handleVideoSubmit}
              />
            )}
          />
          <Route
            path="/user"
            render={() => (
              <UserAccountModal
                loggedIn={this.state.logged_in}
                user={this.state.user}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Desktop);
