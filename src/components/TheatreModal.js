import React from "react";
import ReactPlayer from "react-player";
import adapter from "../services/adapter";

class TheatreModal extends React.Component {
  state = {
    theatre: {},
    playing: false
  };

  componentDidMount() {
    let theatre_id = window.location.href.split("/").pop();
    adapter.getTheatre(theatre_id).then(theatre => this.setState({ theatre }));
  }

  handlePlayClick = () => {
    this.setState({ playing: !this.state.playing });
  };

  render() {
    return (
      <div className="modal">
        <h1>Video:</h1>
        <ReactPlayer
          playing={this.state.playing}
          url={this.state.theatre.src}
        />
        <button onClick={this.handlePlayClick}>Play/Pause</button>
      </div>
    );
  }
}

export default TheatreModal;
