import React from "react";

const Text = props => {
  return (
    <div>
      <h5 style={{ display: "inline" }}>{props.sender.username}</h5>:
      <br />
      <p style={{ display: "inline" }}>{props.text.content}</p>
    </div>
  );
};

export default Text;
