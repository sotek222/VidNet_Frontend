import React from "react";
import adapter from "../services/adapter";

class UserCard extends React.Component {
  handleAddClick = () => {
    adapter.addFriend(this.props.currentUser.id, this.props.user.id);
  };

  handleRemoveClick = () => {
    adapter.deleteFriendship(this.props.friendShip.id).then(user => {
      this.props.handleDeleteFriend();
    });
  };

  handleInviteClick = () => {
    let inboxId = this.props.user.id;
    let senderId = this.props.currentUser.id;
    let link = window.location.href;
    adapter.createMessage(inboxId, senderId, link);
  };

  render() {
    return (
      <div>
        <img
          className="user-icon"
          src={this.props.user.image}
          alt="user icon"
        />
        <h4>{this.props.user.username}</h4>
        {this.props.isInPanel && this.props.loggedIn ? (
          <button onClick={this.handleInviteClick}>send invitation</button>
        ) : (
          <button
            onClick={
              this.props.isInFriends
                ? this.handleRemoveClick
                : this.handleAddClick
            }
          >
            {this.props.isInFriends ? "Remove Friend" : "Add Friend"}
          </button>
        )}
      </div>
    );
  }
}

export default UserCard;
