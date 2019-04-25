import React from "react";
import ReactPlayer from "react-player";

class TheatreModal extends React.Component {
  render() {
    return (
      <div className="modal">
        <h1>Video:</h1>
        <ReactPlayer url={this.props.url} />
      </div>
    );
  }
}

export default TheatreModal;
