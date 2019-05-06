import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import {
  themes,
  Button,
  Window,
  WindowContent,
  Divider,
  Fieldset
} from "react95";

import ModalTitle from "./ModalTitle";

class UserAccountModal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }
  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable>
          <Window style={{ width: 500, height: 500, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>Your Account:</h1>
              <Divider style={{ marginBottom: 5 }} />
              <img className="user-icon" src={this.props.user.image} alt="" />
              <br />
              <Fieldset label="Username:">{this.props.user.username}</Fieldset>
              <br />
              <Fieldset label="Email:">{this.props.user.email}</Fieldset>
              <Divider style={{ marginTop: 75 }} />
              <div style={{ marginTop: 25 }}>
                <Button onClick={() => this.props.history.push("/user/edit")}>
                  Edit Account
                </Button>
                <Button onClick={() => this.props.history.push("/")}>
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

export default withRouter(UserAccountModal);
