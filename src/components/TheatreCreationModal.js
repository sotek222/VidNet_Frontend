import React from "react";
import { withRouter } from "react-router-dom";
import ModalTitle from "./ModalTitle";

class TheatreCreationModal extends React.Component {
  state = {
    input: ""
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div className="modal">
        <ModalTitle />
        <h1>Paste a Video link below:</h1>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.input}
        />
        <button onClick={() => this.props.handleVideoSubmit(this.state.input)}>
          Start a new session
        </button>
      </div>
    );
  }
}

export default withRouter(TheatreCreationModal);
