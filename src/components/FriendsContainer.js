import React from "react";
import UserCard from "./UserCard";
import { Table, TableBody } from "react95";

class FriendsContainer extends React.Component {
  renderFriends = () => {
      return this.props.friends.map(friend => {
          return (<UserCard
            key={friend.id}
            user={friend}
            currentUser={this.props.currentUser}
            isInFriends={this.props.isInFriends}
            handleClick={this.props.handleDeleteFriend}
            adapter={this.props.adapter}
            />)
          });
        };
        
        render() {
          return (
            <div style={{ marginTop: 6 }} className="container">
        <Table style={{ marginTop: 6 }}>
          <TableBody>{this.renderFriends()}</TableBody>
        </Table>
      </div>
    );
  }
}

export default FriendsContainer;