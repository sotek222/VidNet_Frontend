import React from "react";
import Draggable from "react-draggable";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  themes,
  Button,
  Window,
  WindowContent,
  Divider,
  TextField
} from "react95";

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
      const { image, email } = this.props.user;
      this.setState({ image, email });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user.id;
    this.props.adapter.updateUser(userId, this.state)
    .then(data => this.props.handleUserUpdate(data.user));
  };

  handleDeleteClick = () => {
    const userId = this.props.user.id;
    this.props.adapter.deleteUser(userId).then(this.props.history.push("/signin"));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window style={{ width: 500, height: 500, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>Edit Account Information:</h1>
              <Divider />
              <form>
                <h3>Image Url:</h3>
                <TextField
                  className="not-draggable"
                  shadow={false}
                  onChange={this.handleChange}
                  type="text"
                  name="image"
                  value={this.state.image}
                />
                <h3>Email:</h3>
                <TextField
                  className="not-draggable"
                  shadow={false}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={this.state.email}
                />
                <Button
                  style={{ marginTop: 20 }}
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
              <Divider style={{ marginTop: 35 }} />
              <div style={{ marginTop: 45 }}>
                <Button onClick={this.handleDeleteClick}>Delete Account</Button>
                <Button onClick={() => this.props.history.push("/user")}>
                  Exit
                </Button>
              </div>
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(UserEditAccount);
