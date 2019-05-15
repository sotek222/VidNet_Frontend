import React from "react";
import { withRouter } from "react-router-dom";
import { WindowHeader } from "react95";

const TheatreCard = ({ theatre, history }) => {
  return (
    <tr onClick={() => history.push(`/theatre/${theatre.id}`)}>
      <td className="theatre-card">
        <WindowHeader>{theatre.title} Theatre</WindowHeader>
        <h4>Hosted By:</h4>
        <h5>{theatre.host.username}</h5>
        <img className="icon" src={theatre.host.image} alt="" />
        <h4>Link:</h4>
        <h5>{`http://localhost:3000/theatre/${theatre.id}`}</h5>
      </td>
    </tr>
  );
};

export default withRouter(TheatreCard);
