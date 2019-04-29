import React from "react";
import ReactPlayer from "react-player";
import adapter from "../services/adapter";
import { ActionCableConsumer } from "react-actioncable-provider";

class TheatreModal extends React.Component {
  state = {
    theatre: {},
    volume: 1,
    played: 0,
    duration: 0
  };

  componentDidMount() {
    let theatre_id = window.location.href.split("/").pop();
    adapter.getTheatre(theatre_id).then(theatre =>
      this.setState({ theatre }, () => {
        this.player.seekTo(this.state.theatre.elapsed_time);
      })
    );
  }

  ref = player => {
    this.player = player;
  };

  handlePlayClick = () => {
    let theatre = this.state.theatre;
    let playing = !this.state.theatre.playing;
    adapter.updateTheatrePlaying(theatre, playing);
  };

  handleMuteClick = () => {
    let theatre = this.state.theatre;
    let muted = !this.state.theatre.muted;
    adapter.updateTheatreMute(theatre, muted);
  };

  handleSliderChange = e => {
    let volume = e.target.value / 100;
    this.setState({ volume });
  };

  handleTimeChange = time => {
    let theatre = this.state.theatre;
    let currentTime = Math.ceil(time.playedSeconds);
    adapter.updateTheatreTime(theatre, currentTime);
  };

  handleFullscreenClick = () => {};

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = e => {
    let currentTime = this.state.duration * this.state.played;
    let theatre = this.state.theatre;

    this.setState({ seeking: false });

    this.player.seekTo(parseFloat(e.target.value));
    adapter.updateTheatreTime(theatre, currentTime);
  };

  onDuration = duration => {
    this.setState({ duration });
  };

  render() {
    let { id, elapsed_time } = this.state.theatre;

    return (
      <div className="modal">
        <ActionCableConsumer
          channel={{
            channel: "TheatreChannel",
            theatre_id: id
          }}
          onConnected={() => console.log("%c CONNECTED", "color: green")}
          onDisconnected={() => console.log("%c DISCONNECTED", "color: red")}
          onReceived={theatre => {
            this.setState({ theatre });
          }}
        />
        <h1>Video:</h1>
        <ReactPlayer
          ref={this.ref}
          url={this.state.theatre.src}
          playing={this.state.theatre.playing}
          volume={this.state.volume}
          muted={this.state.theatre.muted}
          onDuration={this.onDuration}
          config={{
            youtube: {
              playerVars: { start: elapsed_time }
            }
          }}
        />
        <div className="controls">
          <input
            type="range"
            max={this.state.duration}
            value={this.state.played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={this.state.volume * 100}
            onChange={this.handleSliderChange}
          />
          <button onClick={this.handlePlayClick}>
            {this.state.theatre.playing ? "Pause" : "Play"}
          </button>
          <button onClick={this.handleFullscreenClick}>Fullscreen</button>
          <button onClick={this.handleMuteClick}>
            {this.state.theatre.muted ? "Unmute" : "Mute"}
          </button>
        </div>
        <h3>Sharable Link</h3>
        <input readOnly value={window.location.href} />
      </div>
    );
  }
}
export default TheatreModal;

// progress={500}
// onProgress={
//   this.state.theatre.host_id === this.props.user.id
//     ? this.handleTimeChange
//     : null
// }
