import React from "react";
import { withRouter } from "react-router-dom";
import adapter from "../services/adapter";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

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
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window style={{ width: 500, height: 550, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>Friends Lookup:</h1>
              <Divider />
              <SearchBar handleSearch={this.handleSearch} />
              <FriendsContainer
                handleDeleteFriend={this.handleDeleteFriend}
                currentUser={this.props.user}
                friends={this.state.filteredFriends}
                isInFriends={true}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(FriendsModal);
