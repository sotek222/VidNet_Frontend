import React from "react";
import { withRouter } from "react-router-dom";
import adapter from "../services/adapter";
import Draggable from "react-draggable";

import SearchBar from "./SearchBar";
import FriendsContainer from "./FriendsContainer";
import ModalTitle from "./ModalTitle";

class FriendsModal extends React.Component {
  state = {
    friends: [],
    filteredFriends: []
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      adapter.getFriends().then(friendsArr => {
        this.setState({ friends: friendsArr, filteredFriends: friendsArr });
      });
    } else {
      this.props.history.push("/signin");
    }
  }

  handleDeleteFriend = () => {
    adapter.getFriends().then(friendsArr => {
      this.setState({ friends: friendsArr });
    });
  };

  handleSearch = term => {
    const filteredFriends = this.state.friends.filter(friend => {
      return friend.friendee.username
        .toLowerCase()
        .includes(term.toLowerCase());
    });
    this.setState({ filteredFriends });
  };

  render() {
    return (
      <Draggable cancel=".not-draggable">
        <div className="modal">
          <ModalTitle />
          <h1>Friends:</h1>
          <SearchBar handleSearch={this.handleSearch} />
          <FriendsContainer
            handleDeleteFriend={this.handleDeleteFriend}
            currentUser={this.props.user}
            friends={this.state.filteredFriends}
            isInFriends={true}
          />
        </div>
      </Draggable>
    );
  }
}

export default withRouter(FriendsModal);
