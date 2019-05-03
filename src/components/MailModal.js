import React from "react";
import { withRouter } from "react-router-dom";
import ModalTitle from "./ModalTitle";
import MailContainer from "./MailContainer";

class MailModal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  render() {
    console.log(
      "HAVE I RECEIVED ANY MAIL?:",
      this.props.user,
      this.props.user.received_messages
    );
    const messages = this.props.user.received_messages;
    return (
      <div className="modal">
        <ModalTitle />
        <h1>MAIL:</h1>
        <MailContainer messages={messages} />
      </div>
    );
  }
}

export default withRouter(MailModal);
