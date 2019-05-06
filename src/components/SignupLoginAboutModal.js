import React from "react";
import { Tab } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Draggable from "react-draggable";

import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import ModalTitle from "./ModalTitle";

class SignupLoginAboutModal extends React.Component {
  state = {};

  handleChange = (e, data) => this.setState(data);

  render() {
    const panes = [
      {
        menuItem: "Login",
        render: () => (
          <Tab.Pane id="tab-modal">
            <Login handleLoginSubmit={this.props.handleLoginSubmit} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Signup",
        render: () => (
          <Tab.Pane id="tab-modal">
            <Signup handleSignUpSubmit={this.props.handleSignUpSubmit} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "About",
        render: () => (
          <Tab.Pane id="tab-modal">
            <About />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Draggable>
        <div className="modal">
          <ModalTitle />
          <h1>Welcome</h1>
          <Tab id="tabs" panes={panes} onTabChange={this.handleChange} />
        </div>
      </Draggable>
    );
  }
}

export default withRouter(SignupLoginAboutModal);
