import React from "react";
import adapter from "../services/adapter";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleLoginSubmit(this.state);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <div>
        <h1>Welcome Please Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            autoComplete="password"
            value={this.state.password}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
