import React from "react";
import { withRouter } from "react-router-dom";
import adapter from "../services/adapter";

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
      <div className="modal">
        <ModalTitle />
        <h1>Friends:</h1>
        <SearchBar handleSearch={this.handleSearch} />
        <UsersContainer
          currentUser={this.props.user}
          users={this.state.filteredUsers}
        />
      </div>
    );
  }
}

export default withRouter(UserSearchModal);
