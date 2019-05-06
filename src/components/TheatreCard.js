import React from "react";
import { withRouter } from "react-router-dom";

class TheatreCard extends React.Component {
  render() {
    console.log(this.props.theatre);
    return (
      <div
        onClick={() =>
          this.props.history.push(`/theatre/${this.props.theatre.id}`)
        }
      >
        <h1>{this.props.theatre.title}</h1>
        <h4>The host:</h4>
        <h5>{this.props.theatre.host.username}</h5>
        <img className="icon" src={this.props.theatre.host.image} alt="" />
        <h4>Link:</h4>
        <h5>http://localhost:3000/theatre/{this.props.theatre.id}</h5>
      </div>
    );
  }
}

export default withRouter(TheatreCard);
