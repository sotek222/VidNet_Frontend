import React from "react";

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
        <h1>Search for a user by Username:</h1>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.input}
        />
      </div>
    );
  }
}

export default SearchBar;
