import React from "react";

class TheatreCreationModal extends React.Component {
  state = {
    input: ""
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div className="modal">
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

export default TheatreCreationModal;
