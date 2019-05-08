import React from "react";
import adapter from "../services/adapter";
import { TableRow, TableDataCell, Button } from "react95";

class UserCard extends React.Component {
  handleAddClick = () => {
    adapter.addFriend(this.props.currentUser.id, this.props.user.id);
  };

  handleRemoveClick = () => {
    adapter.deleteFriendship(this.props.friendShip.id).then(user => {
      this.props.handleDeleteFriend(user.id);
    });
  };

  handleInviteClick = () => {
    let inboxId = this.props.user.id;
    let senderId = this.props.currentUser.id;
    let link = window.location.href;
    adapter.createMessage(inboxId, senderId, link);
  };

  render() {
    console.log("THE FRIENDS ID", this.props.user.id);
    return (
      <TableRow>
        <TableDataCell>
          <div>
            <img
              className="user-icon"
              src={this.props.user.image}
              alt="user icon"
            />
            <h2>{this.props.user.username}</h2>
            {this.props.isInPanel && this.props.loggedIn ? (
              <Button onClick={this.handleInviteClick}>send invitation</Button>
            ) : (
              <Button
                onClick={
                  this.props.isInFriends
                    ? this.handleRemoveClick
                    : this.handleAddClick
                }
              >
                {this.props.isInFriends ? "Remove Friend" : "Add Friend"}
              </Button>
            )}
          </div>
        </TableDataCell>
      </TableRow>
    );
  }
}

export default UserCard;
