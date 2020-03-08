import React from "react";
import { TextField } from "react95";

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <h3>Search by Username:</h3>
        <TextField
          style={{ marginTop: -6 }}
          className="not-draggable"
          shadow={false}
          onChange={this.props.handleChange}
          type="text"
          value={this.props.searchInput}
        />
      </div>
    );
  }
}

export default SearchBar;
