import React from "react";
import TheatreCreationModal from "./TheatreCreationModal";
import TheatreModal from "./TheatreModal";
import UserAccountModal from "./UserAccountModal";

class Desktop extends React.Component {
  state = {
    currentModal: "",
    url: ""
  };

  renderModal = () => {
    switch (this.state.currentModal) {
      case "CreateTheatre":
        return (
          <TheatreCreationModal handleVideoSubmit={this.handleVideoSubmit} />
        );
        break;
      case "Theatre":
        return <TheatreModal url={this.state.url} />;
        break;
      case "User Account":
        return <UserAccountModal />;
        break;
      default:
        return null;
    }
  };

  handleVideoSubmit = url => {
    this.setState({ currentModal: "Theatre", url: url });
  };

  render() {
    return (
      <div>
        <h1>VidNet</h1>
        <button
          onClick={() => this.setState({ currentModal: "CreateTheatre" })}
        >
          Add a Theatre
        </button>
        <button onClick={() => this.setState({ currentModal: "User Account" })}>
          View Account
        </button>
        {this.renderModal()}
      </div>
    );
  }
}

export default Desktop;
