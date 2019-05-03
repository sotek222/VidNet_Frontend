import React from "react";
import { withRouter } from "react-router-dom";
import ModalTitle from "./ModalTitle";

class TheatreCreationModal extends React.Component {
  state = {
    url: "",
    chatChecked: false
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  handleChange = e => {
    this.setState({ url: e.target.value });
  };

  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Paste a Video link below:</h1>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.url}
        />
        <h3>Add Chat:</h3>
        <input
          onChange={() =>
            this.setState({ chatChecked: !this.state.chatChecked })
          }
          type="checkbox"
          checked={this.state.chatChecked}
        />
        <br />
        <button onClick={() => this.props.handleVideoSubmit(this.state)}>
          Create a new theatre
        </button>
      </div>
    );
  }
}

export default withRouter(TheatreCreationModal);
