import React from "react";
import { withRouter } from "react-router-dom";

const ModalTitle = props => {
  return (
    <div className="modal-title">
      <h5 className="title">VidNet</h5>
      <button className="modal-exit" onClick={() => props.history.push("/")}>
        X
      </button>
    </div>
  );
};

export default withRouter(ModalTitle);
