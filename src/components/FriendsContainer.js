import React from "react";
import UserCard from "./UserCard";

const FriendsContainer = props => {
  const users = props.friends.map(friendShip => {
    if (friendShip.friender_id === props.currentUser.id) {
      return (
        <UserCard
          key={friendShip.friendee.id}
          friendShip={friendShip}
          user={friendShip.friendee}
          currentUser={props.currentUser}
          isInFriends={props.isInFriends}
          handleDeleteFriend={props.handleDeleteFriend}
        />
      );
    }
  });

  return <div className="users-container">{users}</div>;
};

export default FriendsContainer;
