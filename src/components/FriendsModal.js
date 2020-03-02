import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

import SearchBar from "./SearchBar";
import FriendsContainer from "./FriendsContainer";
import ModalTitle from "./ModalTitle";

class FriendsModal extends React.Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  handleSearch = term => {
    const filteredFriends = this.state.friends.filter(friend => {
      return friend.friendee.username
        .toLowerCase()
        .includes(term.toLowerCase());
    });
    this.setState({ filteredFriends });
  };

  handleChange = e => {
    this.setState({ input: e.target.value }, () =>
      this.handleSearch(this.state.input)
    );
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
              <SearchBar handleChange={this.handleChange} />
              <FriendsContainer
                currentUser={this.props.user}
                friends={this.props.friends}
                isInFriends={true}
                adapter={this.props.adapter}
                handleDeleteFriend={this.props.handleDeleteFriend}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(FriendsModal);
