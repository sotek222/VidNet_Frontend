import React from "react";
import ReactPlayer from "react-player";
import adapter from "../services/adapter";
import { ActionCableConsumer } from "react-actioncable-provider";

class TheatreModal extends React.Component {
  state = {
    theatre: {}
  };

  componentDidMount() {
    let theatre_id = window.location.href.split("/").pop();
    adapter.getTheatre(theatre_id).then(theatre => this.setState({ theatre }));
  }

  handlePlayClick = () => {
    let theatre = this.state.theatre;
    let playing = !this.state.theatre.playing;
    adapter.updateTheatrePlaying(theatre, playing);
  };

  handleConnected = () => {
    console.log("CONNECTED");
  };

  handleDisconnected = () => {
    console.log("DISCONNECTED");
  };

  render() {
    let id = this.state.theatre.id;
    let elapsed_time = this.state.theatre.elapsed_time;
    return (
      <div className="modal">
        <ActionCableConsumer
          channel={{
            channel: "TheatreChannel",
            theatre_id: id
          }}
          onConnected={this.handleConnected}
          onDisconnected={this.handleDisconnected}
          onReceived={theatre => {
            this.setState({ theatre });
          }}
        />
        <h1>Video:</h1>
        <ReactPlayer
          playing={this.state.theatre.playing}
          url={this.state.theatre.src}
          config={{
            youtube: {
              playerVars: { start: elapsed_time }
            }
          }}
        />
        <button onClick={this.handlePlayClick}>Play/Pause</button>
      </div>
    );
  }
}

export default TheatreModal;

// if we set the state of the theatre in the backend what do we have to keep in mind?
// 1. What we'll need to keep things synced, such as, if the video is paused,
// the timestamp of the video, the volume?
// 2. When the Component mounts we will get the video and the content in the react
// player should have acces to the information.
// 3. When we click a button, depending on which button we click, we will have to make
// a patch request to the database, I wonder if it will cause sync issues.

// To sync time:
// in order for us to sync the time, we need to keep track of the elapsed time somehow
// keeping the time stored in the model then whenever we come to the page it will grab the elapsed time.
// example: elapsed_time: 50
// every few moments (time in seconds i think, maybe another way) we send up
// the new time. DONT DO ANYTHING WITH THE RESPONSE.
// With this anytime the page is refreshed or a new user joins, they will be at the correct time.
