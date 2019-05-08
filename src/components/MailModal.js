import React from "react";
import adapter from "../services/adapter";
import { ActionCableConsumer } from "react-actioncable-provider";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent } from "react95";

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
      adapter.getUser().then(data => {
        this.setState({ messages: data.user.received_messages });
      });
    }
  }

  deleteMessage = messageId => {
    adapter.deleteMessage(messageId).then(message => {
      const messages = this.state.messages.filter(messageObj => {
        return messageObj.id !== message.id;
      });
      this.setState({ messages });
    });
  };

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
              <MailContainer
                messages={this.state.messages}
                deleteMessage={this.deleteMessage}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(MailModal);
