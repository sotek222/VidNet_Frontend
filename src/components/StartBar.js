import React from "react";
import { ThemeProvider } from "styled-components";
import { themes, AppBar, Toolbar } from "react95";
import Menu from "./Menu";

class StartBar extends React.Component {
  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <AppBar style={{ top: 675 }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Menu
              loggedIn={this.props.loggedIn}
              handleLogout={this.props.handleLogout}
            />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default StartBar;
