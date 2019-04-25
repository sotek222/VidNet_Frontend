import React from "react";
import TheatreCreationModal from "./TheatreCreationModal";
import TheatreModal from "./TheatreModal";
import UserAccountModal from "./UserAccountModal";
import SignupLoginAboutModal from "./SignupLoginAboutModal";
import adapter from "../services/adapter";
import { Route, Switch, withRouter } from "react-router-dom";

class Desktop extends React.Component {
  // state = {};
  // componentDidMount() {}

  handleVideoSubmit = url => {
    adapter.createTheatre(url).then(theatre => {
      this.setState(this.props.history.push(`/theatre/${theatre.id}`));
    });
  };

  render() {
    return (
      <div>
        <h1>VidNet</h1>
        <button onClick={() => this.props.history.push("/theatre")}>
          Create a theatre
        </button>

        <Switch>
          <Route path="/signin" render={() => <SignupLoginAboutModal />} />
          <Route path="/theatre/:id" render={() => <TheatreModal />} />
          <Route
            path="/theatre"
            render={() => (
              <TheatreCreationModal
                handleVideoSubmit={this.handleVideoSubmit}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Desktop);
