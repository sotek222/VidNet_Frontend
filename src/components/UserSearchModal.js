import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

import SearchBar from "./SearchBar";
import ModalTitle from "./ModalTitle";
import UsersContainer from "./UsersContainer";

class UserSearchModal extends React.Component {
  state = {
    users: [],
    filteredUsers: [],
    searchInput: ""
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.adapter.getUsers().then(users => {
        const usersFilteredArr = users.filter(userObj => {
          return userObj.id !== this.props.user.id;
        });
        this.setState({
          users: usersFilteredArr,
          filteredUsers: usersFilteredArr
        });
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

  handleChange = e => {
    this.setState({ searchInput: e.target.value }, () =>
      this.handleSearch(this.state.searchInput)
    );
  };

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window
            style={{
              width: 500,
              height: 550,
              position: "absolute"
            }}
          >
            <ModalTitle />
            <WindowContent>
              <h1>User Lookup:</h1>
              <Divider />
              <SearchBar
                handleChange={this.handleChange}
                searchInput={this.state.searchInput}
              />
              <UsersContainer
                currentUser={this.props.user}
                users={this.state.filteredUsers}
                handleAddFriend={this.props.handleAddFriend}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(UserSearchModal);
