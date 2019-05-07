import React from "react";
import UserCard from "./UserCard";
import HourGlassIcon from "../icons/HourGlassIcon.gif";

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

  return (
    <div style={{ marginTop: 6 }} className="container">
      {users.length > 0 ? (
        users
      ) : (
        <img className="hour-glass" src={HourGlassIcon} alt="" />
      )}
    </div>
  );
};

export default UsersContainer;
