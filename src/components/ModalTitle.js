import React from "react";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themes, WindowHeader, Button } from "react95";

const ModalTitle = props => {
  return (
    <ThemeProvider theme={themes.default}>
      <WindowHeader>
        VidNet.exe
        <Button
          square
          style={{ float: "right", marginRight: -14 }}
          onClick={() => props.history.push("/")}
        >
          x
        </Button>
      </WindowHeader>
    </ThemeProvider>
  );
};

export default withRouter(ModalTitle);
