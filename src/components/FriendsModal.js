import React from "react";
import { withRouter } from "react-router-dom";
import adapter from "../services/adapter";
import SearchBar from "./SearchBar";
import FriendsContainer from "./FriendsContainer";
import ModalTitle from "./ModalTitle";

class FriendsModal extends React.Component {
  state = {
    friends: []
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      adapter.getFriends().then(friendsArr => {
        this.setState({ friends: friendsArr });
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

  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Friends:</h1>
        <SearchBar />
        <FriendsContainer
          handleDeleteFriend={this.handleDeleteFriend}
          currentUser={this.props.user}
          friends={this.state.friends}
          isInFriends={true}
        />
      </div>
    );
  }
}

export default withRouter(FriendsModal);
