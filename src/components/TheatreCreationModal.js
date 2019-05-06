import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";

import ModalTitle from "./ModalTitle";

class TheatreCreationModal extends React.Component {
  state = {
    title: "",
    url: "",
    chatChecked: false,
    public: false
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/signin");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Draggable cancel=".not-draggable">
        <div className="modal">
          <ModalTitle />
          <h1>Name your theatre:</h1>
          <input
            className="not-draggable"
            onChange={this.handleChange}
            name="title"
            type="text"
            value={this.state.title}
          />
          <h1>Paste a Video link below:</h1>
          <input
            className="not-draggable"
            onChange={this.handleChange}
            name="url"
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
          <h3>Make Public?</h3>
          <input
            onChange={() => this.setState({ public: !this.state.public })}
            type="checkbox"
            checked={this.state.public}
          />
          <br />
          <button onClick={() => this.props.handleVideoSubmit(this.state)}>
            Create a new theatre
          </button>
        </div>
      </Draggable>
    );
  }
}

export default withRouter(TheatreCreationModal);
