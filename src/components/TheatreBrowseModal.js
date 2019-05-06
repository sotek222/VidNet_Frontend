import React from "react";
import adapter from "../services/adapter";
import Draggable from "react-draggable";

import ModalTitle from "./ModalTitle";
import TheatreContainer from "./TheatreContainer";

class TheatreBrowseModal extends React.Component {
  state = {
    filteredTheatres: []
  };

  componentDidMount() {
    adapter.getFilteredTheatres().then(filteredTheatres => {
      this.setState({ filteredTheatres });
    });
  }

  render() {
    return (
      <Draggable>
        <div className="modal">
          <ModalTitle />
          <h1>Browse Public Theatre's:</h1>
          <TheatreContainer theatres={this.state.filteredTheatres} />
        </div>
      </Draggable>
    );
  }
}

export default TheatreBrowseModal;
