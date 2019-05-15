import React from "react";
import { Fieldset, Button } from "react95";
import play from "../icons/controller/play.png";
import pause from "../icons/controller/pause.png";
import unmute from "../icons/controller/unmute.png";
import mute from "../icons/controller/mute.png";
import volume from "../icons/controller/volume.png";
import forwardSeek from "../icons/controller/forwardseek.png";
import backSeek from "../icons/controller/backseek.png";

const Controls = props => {
  return (
    <Fieldset>
      <div className="controls">
        <Button
          style={{ display: "inline-grid" }}
          onClick={props.onSeekBackward}
        >
          <img src={backSeek} alt="" />
        </Button>
        <Button
          style={{ display: "inline-grid" }}
          onClick={props.handlePlayClick}
        >
          {props.theatre.playing ? (
            <img src={pause} alt="" />
          ) : (
            <img src={play} alt="" />
          )}
        </Button>
        <Button
          style={{ display: "inline-grid" }}
          onClick={props.handleMuteClick}
        >
          {props.theatre.muted ? (
            <img src={mute} alt="" />
          ) : (
            <img src={unmute} alt="" />
          )}
        </Button>
        <Button
          style={{ display: "inline-grid" }}
          onClick={props.onSeekForward}
        >
          <img src={forwardSeek} alt="" />
        </Button>
        <img src={volume} alt="" />
        <input
          name="volume"
          className="not-draggable"
          type="range"
          min="0"
          max="100"
          value={props.volume * 100}
          onChange={props.handleSliderChange}
        />
      </div>
    </Fieldset>
  );
};

export default Controls;
