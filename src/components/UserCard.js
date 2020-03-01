import React from "react";
import adapter from "../services/adapter";
import { Button, Divider, WindowHeader } from "react95";

class UserCard extends React.Component {
  state = {
    friend: false,
    added: false
  };

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
    // const foundFriendship = this.props.currentUser.friend_ships.find(fs => {
    //   return fs.friendee_id === this.props.user.id
    // })
    
    this.props.handleDeleteFriend(this.props.user.id);

    // this.props.adapter.deleteFriendship(foundFriendship.id)
    // .then(friendship => {
    //   this.successSound.load();
    //   this.successSound.play();
    //   this.props.handleDeleteFriend(friendship.friendee_id);
    // });
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

// onClick={
//   this.props.isInFriends
//       ? () => this.props.handleDeleteFriend(this.props.user.id)
//       : this.handleAddClick
//     }