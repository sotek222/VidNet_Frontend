import React from "react";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { ActionCableConsumer } from "react-actioncable-provider";
import adapter from "../services/adapter";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Button, Window, WindowContent, Tooltip } from "react95";

import AddFriendsIcon from "../icons/AddFriendsIcon.png";
import maximize from "../icons/controller/maximize.png";

import Duration from "./Duration";
import ReactPlayer from "react-player";
import ModalTitle from "./ModalTitle";
import FriendsPanel from "./FriendsPanel";
import ChatBox from "./ChatBox";
import Controls from "./Controls";

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

  onSeekForward = () => {
    let currentTime = this.state.played + 5;
    let theatre = this.state.theatre;
    adapter.updateTheatreTime(theatre, currentTime);
  };

  onSeekBackward = () => {
    while (this.state.seeking) {}
    let currentTime = this.state.played - 5;
    let theatre = this.state.theatre;
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

  handleClose = () => {
    this.setState({ renderFriends: false });
  };

  updateScroll = () => {
    let chat = document.getElementById("chat-box");
    chat.scrollTop = chat.scrollHeight;
  };

  render() {
    let { id, elapsed_time, title } = this.state.theatre;
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window
            style={{
              width: 700,
              height: 675,
              position: "absolute",
              bottom: "4.5%",
              left: "24.5%"
            }}
          >
            <ModalTitle />
            <Button
              style={{ position: "absolute", top: ".3%", left: "90.5%" }}
              onClick={this.onClickFullscreen}
            >
              <img src={maximize} alt="" />
            </Button>
            <WindowContent>
              <h1>{title} Theatre</h1>
              <ActionCableConsumer
                channel={{
                  channel: "TheatreChannel",
                  theatre_id: id
                }}
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
              <br />
              <input
                name="seek"
                type="range"
                className="not-draggable"
                min={0}
                max={this.state.duration}
                step="any"
                value={this.state.played}
                onMouseDown={this.onSeekMouseDown}
                onChange={this.onSeekChange}
                onMouseUp={this.onSeekMouseUp}
              />
              <Controls
                theatre={this.state.theatre}
                onSeekBackward={this.onSeekBackward}
                handlePlayClick={this.handlePlayClick}
                handleMuteClick={this.handleMuteClick}
                onSeekForward={this.onSeekForward}
                volume={this.state.volume}
                handleSliderChange={this.handleSliderChange}
              />
              <div className="link">
                <h3>Sharable Link:</h3>
                <input
                  readOnly
                  ref={textarea => (this.textArea = textarea)}
                  value={window.location.href}
                />
                <Button
                  style={{ position: "absolute", top: "50%", left: "103%" }}
                  onClick={this.copyToClipboard}
                >
                  {this.state.copied ? "Copied!" : "copy"}
                </Button>
              </div>
              {this.props.loggedIn ? (
                <div style={{ position: "absolute", top: "89%", right: "13%" }}>
                  <Tooltip text="Invite Friends">
                    <img
                      src={AddFriendsIcon}
                      alt=""
                      onClick={() =>
                        this.setState({
                          renderFriends: !this.state.renderFriends
                        })
                      }
                    />
                  </Tooltip>
                </div>
              ) : null}
              {this.state.renderFriends ? (
                <FriendsPanel
                  currentUser={this.props.user}
                  loggedIn={this.props.loggedIn}
                  friends={this.props.user.friendees}
                  handleClose={this.handleClose}
                />
              ) : null}
              {this.state.theatre.text_chat && this.props.loggedIn ? (
                <ChatBox
                  updateScroll={this.updateScroll}
                  chat={this.state.theatre.chat}
                  user={this.props.user}
                />
              ) : null}
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}
export default TheatreModal;
