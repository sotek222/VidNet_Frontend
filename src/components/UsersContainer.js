import React from "react";
import UserCard from "./UserCard";

const UsersContainer = props => {
  const users = props.users.map(userObj => {
    return (
      <UserCard
        key={userObj.id}
        user={userObj}
        currentUser={props.currentUser}
        isInFriends={props.isInFriends}
      />
    );
  });

  return <div className="users-container">{users}</div>;
};

export default UsersContainer;
