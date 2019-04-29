import React from "react";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    image: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSignUpSubmit(this.state);
  };

  render() {
    return (
      <div>
        <h1>VidNet Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
          />
          <label htmlFor="image">Profile Image Url</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="image"
            value={this.state.image}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
