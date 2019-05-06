import React from "react";
import { withRouter } from "react-router-dom";

const TheatreCard = ({ theatre, history }) => {
  return (
    <div
      className="card"
      onClick={() => history.push(`/theatre/${theatre.id}`)}
    >
      <h1>{theatre.title}</h1>
      <h4>The host:</h4>
      <h5>{theatre.host.username}</h5>
      <img className="icon" src={theatre.host.image} alt="" />
      <h4>Link:</h4>
      <h5>http://localhost:3000/theatre/{theatre.id}</h5>
    </div>
  );
};

export default withRouter(TheatreCard);
