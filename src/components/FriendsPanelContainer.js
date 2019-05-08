import React from "react";
import { Table, TableBody } from "react95";
import UserCard from "./UserCard";
import HourGlassIcon from "../icons/HourGlassIcon.gif";

class FriendsPanelContainer extends React.Component {
  render() {
    const friends = this.props.friends.map(friend => {
      return (
        <UserCard
          key={friend.id}
          currentUser={this.props.currentUser}
          loggedIn={this.props.loggedIn}
          isInPanel={true}
          user={friend}
        />
      );
    });

    return (
      <div style={{ marginTop: 6 }} className="panel">
        {friends.length > 0 ? (
          <Table style={{ marginTop: 6 }}>
            <TableBody>{friends}</TableBody>
          </Table>
        ) : (
          <img className="hour-glass" src={HourGlassIcon} alt="" />
        )}
      </div>
    );
  }
}

export default FriendsPanelContainer;
