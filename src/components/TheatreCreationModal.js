import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import ChatIcon from "../icons/ChatIcon.png";
import PublicIcon from "../icons/PublicIcon.png";
import { ThemeProvider } from "styled-components";
import {
  themes,
  Button,
  Window,
  WindowContent,
  Divider,
  TextField,
  Fieldset,
  Checkbox,
  Tooltip
} from "react95";

import ModalTitle from "./ModalTitle";

class TheatreCreationModal extends React.Component {
  state = {
    title: "",
    url: "",
    chatChecked: false,
    public: false
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window style={{ width: 500, height: 550, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>Create a Theatre:</h1>
              <Divider />
              <h3>Name your theatre:</h3>
              <TextField
                className="not-draggable"
                shadow={false}
                onChange={this.handleChange}
                name="title"
                type="text"
                value={this.state.title}
              />
              <h3>Paste a Video link below:</h3>
              <TextField
                className="not-draggable"
                shadow={false}
                onChange={this.handleChange}
                name="url"
                value={this.state.url}
              />
              <Fieldset label="Theatre Options" style={{ marginTop: 20 }}>
                <span style={{ marginRight: 100 }}>
                  <Tooltip text="Enable Text Chat">
                    <img src={ChatIcon} alt="" />
                  </Tooltip>
                  <Checkbox
                    onChange={() =>
                      this.setState({ chatChecked: !this.state.chatChecked })
                    }
                    checked={this.state.chatChecked}
                  />
                </span>
                <span>
                  <Tooltip text="Make Theatre Public">
                    <img src={PublicIcon} alt="" />
                  </Tooltip>
                  <Checkbox
                    onChange={() =>
                      this.setState({ public: !this.state.public })
                    }
                    checked={this.state.public}
                  />
                </span>
              </Fieldset>
              <Divider style={{ marginTop: 20 }} />
              <Button
                style={{ marginTop: 35 }}
                onClick={() => this.props.handleVideoSubmit(this.state)}
              >
                Create a new theatre
              </Button>
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(TheatreCreationModal);
