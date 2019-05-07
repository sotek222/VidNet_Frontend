import React from "react";
import adapter from "../services/adapter";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Divider } from "react95";

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
      <ThemeProvider theme={themes.default}>
        <Draggable>
          <Window style={{ width: 500, height: 550, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>Browse Public Theatre's:</h1>
              <TheatreContainer theatres={this.state.filteredTheatres} />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default TheatreBrowseModal;
