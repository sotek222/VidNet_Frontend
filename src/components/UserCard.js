import React from "react";
import adapter from "../services/adapter";
import { Button, Divider, WindowHeader } from "react95";

class UserCard extends React.Component {
  state = {
    friend: false,
    added: false
  };

  handleInviteClick = () => {
    let inboxId = this.props.user.id;
    let senderId = this.props.currentUser.id;
    let link = window.location.href;
    adapter.createMessage(inboxId, senderId, link);
  };

  render() {
    return (
      <tr>
        <td className="user-card">
          <div>
            <WindowHeader>{this.props.user.username}.exe</WindowHeader>
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
              className={this.props.isInPanel ? "panel-user-icon" : "user-icon"}
              src={this.props.user.image}
              alt="user icon"
            />
            <h2>{this.props.user.username}</h2>
            <Divider />
            {this.props.isInPanel && this.props.loggedIn ? (
              <Button fullWidth onClick={this.handleInviteClick}>
                send invitation
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={() => this.props.handleClick(this.props.user.id)}
                >
                {this.props.isInFriends ? "Remove Friend" : "Add Friend"}
              </Button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default UserCard;
