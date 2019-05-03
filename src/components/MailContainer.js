import React from "react";
import MailCard from "./MailCard";

class MailContainer extends React.Component {
  renderMessages = () => {
    const messages = [];
    if (this.props.messages) {
      this.props.messages.forEach(message => {
        messages.push(<MailCard key={message.id} message={message} />);
      });
    }
    return messages;
  };

  render() {
    return <div>{this.renderMessages()}</div>;
  }
}

export default MailContainer;
