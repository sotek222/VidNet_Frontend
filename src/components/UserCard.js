import React from "react";
import adapter from "../services/adapter";
import error from "../sounds/Error.mp3";
import success from "../sounds/Success.mp3";
import { TableRow, TableDataCell, Button } from "react95";

class UserCard extends React.Component {
  state = {
    friend: false,
    added: false
  };

  errorSound = new Audio(error);
  successSound = new Audio(success);

  checkIfFriends = user => {
    return user.friendees.find(friend => {
      return friend.id === this.props.user.id;
    });
  };

  handleAddClick = () => {
    adapter.getUser().then(data => {
      if (this.checkIfFriends(data.user)) {
        this.setState({ friend: true }, () => {
          this.errorSound.load();
          this.errorSound.play();
          setTimeout(() => {
            this.setState({ friend: false });
          }, 5000);
        });
      } else {
        adapter
          .addFriend(this.props.currentUser.id, this.props.user.id)
          .then(data => {
            this.setState({ added: true }, () => {
              this.successSound.load();
              this.successSound.play();
              setTimeout(() => {
                this.setState({ added: false });
              }, 5000);
            });
          });
      }
    });
  };

  handleRemoveClick = () => {
    adapter.deleteFriendship(this.props.friendShip.id).then(user => {
      this.successSound.load();
      this.successSound.play();
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
    return (
      <TableRow>
        <TableDataCell>
          <div>
            {this.state.friend ? (
              <h3
                className="blink_me"
                style={{
                  position: "absolute",
                  color: "red",
                  margin: "16%",
                  zIndex: 1,
                  "font-size": "3em"
                }}
              >
                Already Friends
              </h3>
            ) : null}
            {this.state.added ? (
              <h3
                className="blink_me"
                style={{
                  position: "absolute",
                  color: "lightgreen",
                  marginTop: "17%",
                  marginLeft: "35%",
                  zIndex: 1,
                  "font-size": "3em"
                }}
              >
                Added
              </h3>
            ) : null}
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
