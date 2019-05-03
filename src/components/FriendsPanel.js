import React from "react";
import adapter from "../services/adapter";

import ModalTitle from "./ModalTitle";
import FriendsPanelContainer from "./FriendsPanelContainer";

class FriendsPanel extends React.Component {
  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Friends Panel:</h1>
        <FriendsPanelContainer
          currentUser={this.props.currentUser}
          loggedIn={this.props.loggedIn}
          friends={this.props.friends}
        />
      </div>
    );
  }
}

export default FriendsPanel;