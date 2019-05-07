import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

import ModalTitle from "./ModalTitle";
import MailContainer from "./MailContainer";

class MailModal extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    } else {
      this.setState(
        { messages: this.props.user.received_messages },
        () => this.props.handleNewMessage
      );
    }
  }

  render() {
    let inboxId = window.location.href.split("/").pop();

    return (
      <ThemeProvider theme={themes.default}>
        <Draggable>
          <Window style={{ width: 500, height: 550, position: "absolute" }}>
            <ActionCableConsumer
              channel={{ channel: "InboxChannel", inbox_id: inboxId }}
              onReceived={message => {
                this.setState({ messages: [...this.state.messages, message] });
              }}
            />
            <ModalTitle />
            <WindowContent>
              <h1>MAIL:</h1>
              <MailContainer messages={this.state.messages} />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(MailModal);
