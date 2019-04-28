import React from "react";
import { Tab } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";

class SignupLoginAboutModal extends React.Component {
  state = {};

  handleChange = (e, data) => this.setState(data);

  render() {
    const panes = [
      {
        menuItem: "Login",
        render: () => (
          <Tab.Pane>
            <Login handleLoginSubmit={this.props.handleLoginSubmit} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Signup",
        render: () => (
          <Tab.Pane>
            <Signup />
          </Tab.Pane>
        )
      },
      {
        menuItem: "About",
        render: () => (
          <Tab.Pane>
            <About />
          </Tab.Pane>
        )
      }
    ];

    const TabExampleDefaultActiveIndex = () => (
      <Tab panes={panes} defaultActiveIndex={0} />
    );

    return (
      <div>
        <h1>welcome</h1>
        <Tab panes={panes} onTabChange={this.handleChange} />
      </div>
    );
  }
}

export default SignupLoginAboutModal;
