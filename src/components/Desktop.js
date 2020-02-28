import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ActionCableConsumer } from "react-actioncable-provider";

import startSound from "../sounds/StartUp.mp3";
import downSound from "../sounds/Shutdown.mp3";
import mailSound from "../sounds/youGotmail.mp3";

import StartBar from "./StartBar";
import IconsContainer from "./IconsContainer";
import TheatreCreationModal from "./TheatreCreationModal";
import TheatreModal from "./TheatreModal";
import UserAccountModal from "./UserAccountModal";
import UserEditAccount from "./UserEditAccount";
import SignupLoginAboutModal from "./SignupLoginAboutModal";
import UserSearchModal from "./UserSearchModal";
import FriendsModal from "./FriendsModal";
import MailModal from "./MailModal";
import TheatreBrowseModal from "./TheatreBrowseModal";

class Desktop extends React.Component {

  state = {
    user: {},
    logged_in: false,
    newMessage: false
  };

  startUp = new Audio(startSound);
  shutDown = new Audio(downSound);
  youGotMail = new Audio(mailSound);

  componentDidMount() {
    this.props.adapter.getUser().then(data => {
      if (data.message) {
        console.log("I CANT LOG IN!");
        return;
      } else {
        this.setState({ user: data.user, logged_in: true });
      }
    });
  }

  handleVideoSubmit = theatreInfo => {
    const userId = this.state.user.id;
    this.props.adapter.createTheatre(theatreInfo, userId)
    .then(theatre => {
      debugger;
      this.props.history.push(`/theatre/${theatre.id}`);
    }).catch(error => {
      console.error("Something went wrong:", error);  
    })
  };

  handleLoginSubmit = user => {
    this.props.adapter.loginUser(user).then(data => {
      if (data.message) {
        alert(data.message);
        this.props.history.push("/signin");
      } else {
        this.setState({ user: data.user, logged_in: true });
        localStorage.setItem("user_token", data.jwt);
        this.props.history.push("/");
        this.startUp.play();
      }
    });
  };

  handleSignUpSubmit = userInfo => {
    this.props.adapter.createUser(userInfo).then(data => {
      if (data.message) {
        alert(data.message);
        this.props.history.push("/signin");
      } else {
        this.setState({ user: data.user, logged_in: true });
        localStorage.setItem("user_token", data.jwt);
        this.props.history.push("/");
        this.startUp.play();
      }
    });
  };

  handleLogout = () => {
    localStorage.removeItem("user_token");
    this.setState({ user: {}, logged_in: false }, () => {
      this.props.history.push("/signin");
      this.shutDown.play();
    });
  };

  handleUserUpdate = user => {
    this.setState({ user: user }, () => this.props.history.push("/user"));
  };

  render() {
    return (
      <div className="desktop">
        <ActionCableConsumer
          channel={{ channel: "InboxChannel", inbox_id: this.state.user.id }}
          onReceived={message => {
            this.youGotMail.play();
          }}
        />
        <Switch>
          <Route
            path="/signin"
            render={
              this.state.logged_in
                ? null
                : () => (
                    <SignupLoginAboutModal
                      handleLoginSubmit={this.handleLoginSubmit}
                      handleSignUpSubmit={this.handleSignUpSubmit}
                    />
                  )
            }
          />
          <Route path="/theatre/search" render={() => <TheatreBrowseModal />} />
          <Route
            path="/theatre/:id"
            render={() => (
              <TheatreModal
                user={this.state.user}
                loggedIn={this.state.logged_in}
                adapter={this.props.adapter}
              />
            )}
          />
          <Route
            path="/theatre"
            render={() => (
              <TheatreCreationModal
                loggedIn={this.state.logged_in}
                user={this.state.user}
                handleVideoSubmit={this.handleVideoSubmit}
              />
            )}
          />
          <Route
            path="/user/inbox/:id"
            render={() => (
              <MailModal
                user={this.state.user}
                loggedIn={this.state.logged_in}
              />
            )}
          />
          <Route
            path="/user/edit"
            render={() => (
              <UserEditAccount
                handleUserUpdate={this.handleUserUpdate}
                loggedIn={this.state.logged_in}
                user={this.state.user}
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
          <Route
            path="/search"
            render={() => (
              <UserSearchModal
                loggedIn={this.state.logged_in}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/friends"
            render={() => (
              <FriendsModal
                loggedIn={this.state.logged_in}
                user={this.state.user}
                adapter={this.props.adapter}
              />
            )}
          />
        </Switch>
        <IconsContainer
          loggedIn={this.state.logged_in}
          user={this.state.user}
        />
        <StartBar
          loggedIn={this.state.logged_in}
          handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

export default withRouter(Desktop);
