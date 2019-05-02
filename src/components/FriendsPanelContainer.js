import React from "react";
import UserCard from "./UserCard";
import HourGlassIcon from "../icons/HourGlassIcon.gif";

class FriendsPanelContainer extends React.Component {
  render() {
    const friends = this.props.friends.map(friend => {
      return <UserCard isInPanel={true} user={friend} />;
    });

    return (
      <div className="users-container">
        {friends.length > 0 ? (
          friends
        ) : (
          <img className="hour-glass" src={HourGlassIcon} alt="" />
        )}
      </div>
    );
  }
}

export default FriendsPanelContainer;
