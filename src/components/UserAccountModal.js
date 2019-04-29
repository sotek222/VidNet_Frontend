import React from "react";
import adapter from "../services/adapter";
import { withRouter } from "react-router-dom";

class UserAccountModal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }
  render() {
    return (
      <div className="modal">
        <div>
          <button onClick={() => this.props.history.push("/")}>X</button>
        </div>
        <h1>Your Account:</h1>
        <img src={this.props.user.image} alt="" />
        <h3>Username:</h3>
        <h5>{this.props.user.username}</h5>
        <h3>Email:</h3>
        <h5>{this.props.user.email}</h5>
        <h3>Location:</h3>
        <h5>{this.props.user.location}</h5>
        <button onClick={() => this.props.history.push("/user/edit")}>
          Edit Account
        </button>
      </div>
    );
  }
}

export default withRouter(UserAccountModal);
