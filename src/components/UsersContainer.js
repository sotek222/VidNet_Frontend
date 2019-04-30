import React from "react";
import UserCard from "./UserCard";

const UsersContainer = props => {
  const users = props.users.map(userObj => {
    return <UserCard user={userObj} />;
  });

  return <div className="users-container">{users}</div>;
};

export default UsersContainer;
