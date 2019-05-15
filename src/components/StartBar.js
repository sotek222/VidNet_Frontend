import React from "react";
import { ThemeProvider } from "styled-components";
import { themes, AppBar, Toolbar, Cutout } from "react95";
import Menu from "./Menu";

class StartBar extends React.Component {
  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <AppBar style={{ top: "96%" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Menu
              loggedIn={this.props.loggedIn}
              handleLogout={this.props.handleLogout}
            />
            <Cutout style={{ absolute: "absolute", marginRight: "1%" }}>
              <p>Vid-Net.exe</p>
            </Cutout>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default StartBar;
