import React from "react";
import { TextField } from "react95";

class SearchBar extends React.Component {
  state = {
    input: ""
  };

  handleChange = e => {
    this.setState(
      { input: e.target.value },
      this.props.handleSearch(this.state.input)
    );
  };

  render() {
    return (
      <div>
        <h3>Search by Username:</h3>
        <TextField
          style={{ marginTop: -6 }}
          className="not-draggable"
          shadow={false}
          onChange={this.handleChange}
          type="text"
          value={this.state.input}
        />
      </div>
    );
  }
}

export default SearchBar;
