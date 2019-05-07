import React from "react";
import { withRouter } from "react-router-dom";
import adapter from "../services/adapter";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

import SearchBar from "./SearchBar";
import ModalTitle from "./ModalTitle";
import UsersContainer from "./UsersContainer";

class UserSearchModal extends React.Component {
  state = {
    users: [],
    filteredUsers: []
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      adapter.getUsers().then(users => {
        this.setState({ users: users, filteredUsers: users });
      });
    } else {
      this.props.history.push("/signin");
    }
  }

  handleSearch = term => {
    const filteredUsers = this.state.users.filter(user => {
      return user.username.toLowerCase().includes(term.toLowerCase());
    });
    this.setState({ filteredUsers });
  };

  handleUserClick = () => {};

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window style={{ width: 500, height: 550, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>User Lookup:</h1>
              <Divider />
              <SearchBar handleSearch={this.handleSearch} />
              <UsersContainer
                currentUser={this.props.user}
                users={this.state.filteredUsers}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(UserSearchModal);
