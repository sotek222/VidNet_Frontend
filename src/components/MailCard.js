import React from "react";
import { withRouter } from "react-router-dom";
import { Button, WindowHeader } from "react95";

class MailCard extends React.Component {
  render() {
    let movieId = this.props.message.link.split("/").pop();
    return (
      <div className="mail-card">
        <WindowHeader>
          <Button
            onClick={() => this.props.deleteMessage(this.props.message.id)}
            style={{ position: "absolute", right: "1%" }}
          >
            x
          </Button>
        </WindowHeader>

        <div onClick={() => this.props.history.push(`/theatre/${movieId}`)}>
          <h2>Message:</h2>
          <p>{this.props.message.content}</p>
          <h3>Link:</h3>
          <a href={this.props.message.link}>{this.props.message.link}</a>
        </div>
      </div>
    );
  }
}

export default withRouter(MailCard);
