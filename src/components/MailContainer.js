import React from "react";
import MailCard from "./MailCard";
import { Table, TableBody } from "react95";

class MailContainer extends React.Component {
  renderMessages = () => {
    const messages = [];
    if (this.props.messages) {
      this.props.messages.forEach(message => {
        messages.push(
          <MailCard
            key={message.id}
            message={message}
            deleteMessage={this.props.deleteMessage}
          />
        );
      });
    }
    return messages;
  };

  render() {
    return (
      <div className="container" style={{ marginLeft: -6 }}>
        <Table style={{ marginTop: 6 }}>
          <TableBody>{this.renderMessages()}</TableBody>
        </Table>
      </div>
    );
  }
}

export default MailContainer;
