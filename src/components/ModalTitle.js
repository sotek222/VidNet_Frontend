import React from "react";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themes, WindowHeader, Button } from "react95";

const ModalTitle = props => {
  return (
    <ThemeProvider theme={themes.default}>
      <WindowHeader>
        <h3
          style={{
            float: "left",
            display: "inline",
            marginTop: 5,
            marginLeft: -10
          }}
        >
          VidNet.exe
        </h3>
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
