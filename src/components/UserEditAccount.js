import React from "react";
import adapter from "../services/adapter";
import { withRouter } from "react-router-dom";
import ModalTitle from "./ModalTitle";

class UserEditAccount extends React.Component {
  state = {
    image: "",
    email: ""
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    } else {
      let { image, email } = this.props.user;
      this.setState({ image, email });
    }
  }

  handleSubmit = e => {
    //need to add validations on the front
    e.preventDefault();
    let userId = this.props.user.id;
    let userInfo = this.state;
    adapter.updateUser(userId, userInfo).then(data => {
      this.props.handleUserUpdate(data.user);
    });
  };

  handleDeleteClick = () => {
    let userId = this.props.user.id;
    adapter.deleteUser(userId).then(this.props.history.push("/signin"));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Edit Account:</h1>
        <form>
          <h3>Image Url:</h3>
          <input
            onChange={this.handleChange}
            type="text"
            name="image"
            value={this.state.image}
          />
          <h3>Email:</h3>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
          />
          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
        </form>
        <button onClick={this.handleDeleteClick}>Delete Account</button>
        <button onClick={() => this.props.history.push("/user")}>Exit</button>
      </div>
    );
  }
}

export default withRouter(UserEditAccount);
