import React from "react";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { ActionCableConsumer } from "react-actioncable-provider";
import adapter from "../services/adapter";

import AddFriendsIcon from "../icons/AddFriendsIcon.png";

import Duration from "./Duration";
import ReactPlayer from "react-player";
import ModalTitle from "./ModalTitle";
import FriendsPanel from "./FriendsPanel";
import ChatBox from "./ChatBox";

class TheatreModal extends React.Component {
  state = {
    theatre: {},
    volume: 1,
    played: 0,
    duration: 0,
    copied: false,
    renderFriends: false
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

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = e => {
    let currentTime = e.target.value;
    let theatre = this.state.theatre;

    this.setState({ seeking: false, played: parseFloat(e.target.value) });

    this.player.seekTo(parseFloat(e.target.value));
    adapter.updateTheatreTime(theatre, currentTime);
  };

  onDuration = duration => {
    this.setState({ duration });
  };

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    this.textArea.focus();
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    });
  };

  render() {
    let { id, elapsed_time, title } = this.state.theatre;
    return (
      <div className="modal">
        <ModalTitle />
        <h1>{title} Theatre</h1>
        <ActionCableConsumer
          channel={{
            channel: "TheatreChannel",
            theatre_id: id
          }}
          onConnected={() => console.log("%cCONNECTED", "color: green")}
          onDisconnected={() => console.log("%cDISCONNECTED", "color: red")}
          onReceived={theatre => {
            if (theatre.time) {
              this.player.seekTo(theatre.time);
            } else {
              this.setState({ theatre });
            }
          }}
        />
        <ReactPlayer
          className="player"
          ref={this.ref}
          url={this.state.theatre.src}
          playing={this.state.theatre.playing}
          volume={this.state.volume}
          muted={this.state.theatre.muted}
          onDuration={this.onDuration}
          onProgress={time =>
            this.setState({ played: parseFloat(time.playedSeconds) })
          }
          config={{
            youtube: {
              playerVars: { start: elapsed_time }
            }
          }}
        />
        <br />
        <Duration seconds={this.state.played} />
        <progress max={this.state.duration} value={this.state.played} />
        <Duration seconds={this.state.duration} />
        <div className="controls">
          <label htmlFor="seek">Seek</label>
          <input
            name="seek"
            type="range"
            min={0}
            max={this.state.duration}
            step="any"
            value={this.state.played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
          <label htmlFor="volume">Volume</label>
          <input
            name="volume"
            type="range"
            min="0"
            max="100"
            value={this.state.volume * 100}
            onChange={this.handleSliderChange}
          />
          <button onClick={this.handlePlayClick}>
            {this.state.theatre.playing ? "Pause" : "Play"}
          </button>
          <button onClick={this.onClickFullscreen}>Fullscreen</button>
          <button onClick={this.handleMuteClick}>
            {this.state.theatre.muted ? "Unmute" : "Mute"}
          </button>
        </div>
        <h3>Sharable Link:</h3>
        <input
          readOnly
          ref={textarea => (this.textArea = textarea)}
          value={window.location.href}
        />
        <button onClick={this.copyToClipboard}>
          {this.state.copied ? "Copied!" : "copy"}
        </button>
        {this.props.loggedIn ? (
          <img
            src={AddFriendsIcon}
            alt=""
            onClick={() =>
              this.setState({ renderFriends: !this.state.renderFriends })
            }
          />
        ) : null}
        {this.state.renderFriends ? (
          <FriendsPanel
            currentUser={this.props.user}
            loggedIn={this.props.loggedIn}
            friends={this.props.user.friendees}
          />
        ) : null}
        {this.state.theatre.text_chat && this.props.loggedIn ? (
          <ChatBox chat={this.state.theatre.chat} user={this.props.user} />
        ) : null}
      </div>
    );
  }
}
export default TheatreModal;
