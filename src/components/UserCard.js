import React from "react";

const UserCard = props => {
  return (
    <div>
      <img className="user-icon" src={props.user.image} />
      <h4>{props.user.username}</h4>
    </div>
  );
};

export default UserCard;
