import React from "react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import { themes, Window, WindowContent, Tab, Tabs, TabBody } from "react95";

import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import ModalTitle from "./ModalTitle";

class SignupLoginAboutModal extends React.Component {
  state = {
    activeTab: 0
  };

  handleChange = value => this.setState({ activeTab: value });

  render() {
    const { activeTab } = this.state;

    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".not-draggable">
          <Window style={{ width: 500, height: 500, position: "absolute" }}>
            <ModalTitle />
            <WindowContent>
              <h1>VidNet</h1>
              <Tabs value={activeTab} onChange={this.handleChange}>
                <Tab value={0}>Login</Tab>
                <Tab value={1}>Signup</Tab>
                <Tab value={2}>About</Tab>
              </Tabs>
              <div style={{ height: 350 }}>
                {activeTab === 0 && (
                  <TabBody>
                    <Login handleLoginSubmit={this.props.handleLoginSubmit} />
                  </TabBody>
                )}
                {activeTab === 1 && (
                  <TabBody>
                    <Signup
                      handleSignUpSubmit={this.props.handleSignUpSubmit}
                    />
                  </TabBody>
                )}
                {activeTab === 2 && (
                  <TabBody>
                    <About />
                  </TabBody>
                )}
              </div>
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default withRouter(SignupLoginAboutModal);
