import React from "react";
import { withRouter } from "react-router-dom";
import ModalTitle from "./ModalTitle";

class UserAccountModal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }
  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Your Account:</h1>
        <img className="user-icon" src={this.props.user.image} alt="" />
        <h3>Username:</h3>
        <h5>{this.props.user.username}</h5>
        <h3>Email:</h3>
        <h5>{this.props.user.email}</h5>
        <button onClick={() => this.props.history.push("/user/edit")}>
          Edit Account
        </button>
        <button onClick={() => this.props.history.push("/")}>Exit</button>
      </div>
    );
  }
}

export default withRouter(UserAccountModal);
