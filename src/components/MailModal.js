import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";

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
      <Draggable>
        <div className="modal">
          <ActionCableConsumer
            channel={{ channel: "InboxChannel", inbox_id: inboxId }}
            onReceived={message => {
              this.setState({ messages: [...this.state.messages, message] });
            }}
          />
          <ModalTitle />
          <h1>MAIL:</h1>
          <MailContainer messages={this.state.messages} />
        </div>
      </Draggable>
    );
  }
}

export default withRouter(MailModal);
