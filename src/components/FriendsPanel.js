import React from "react";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Button, Window, WindowContent, WindowHeader } from "react95";

import FriendsPanelContainer from "./FriendsPanelContainer";

class FriendsPanel extends React.Component {

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable>
          <Window
            className="not-draggable"
            style={{
              width: 275,
              height: 325,
              position: "absolute",
              top: "0%",
              left: "101%"
            }}
          >
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
                onClick={this.props.handleClose}
              >
                x
              </Button>
            </WindowHeader>
            <WindowContent>
              <h1>Friends Panel:</h1>
              <FriendsPanelContainer
                currentUser={this.props.currentUser}
                loggedIn={this.props.loggedIn}
                friends={this.props.friends}
              />
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default FriendsPanel;
