import React from "react";
import UserCard from "./UserCard";

class FriendsContainer extends React.Component {
  renderFriends = () => {
    const users = [];
    if (this.props.friends) {
      this.props.friends.forEach(friendShip => {
        if (friendShip.friender_id === this.props.currentUser.id) {
          users.push(
            <UserCard
              key={friendShip.friendee.id}
              friendShip={friendShip}
              user={friendShip.friendee}
              currentUser={this.props.currentUser}
              isInFriends={this.props.isInFriends}
              handleDeleteFriend={this.props.handleDeleteFriend}
            />
          );
        }
      });
    }
    return users;
  };

  render() {
    return (
      <div style={{ marginTop: 6 }} className="container">
        {this.renderFriends()}
      </div>
    );
  }
}

export default FriendsContainer;
