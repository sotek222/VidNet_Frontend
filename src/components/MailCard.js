import React from "react";
import { withRouter } from "react-router-dom";

class MailCard extends React.Component {
  render() {
    let movieId = this.props.message.link.split("/").pop();
    return (
      <div
        onClick={() => this.props.history.push(`/theatre/${movieId}`)}
        className="mail-card"
      >
        <h2>Message:</h2>
        <p>{this.props.message.content}</p>
        <h3>Link:</h3>
        <a href={this.props.message.link}>{this.props.message.link}</a>
      </div>
    );
  }
}

export default withRouter(MailCard);
