import React from "react";
import { withRouter } from "react-router-dom";
import { TableRow, TableDataCell } from "react95";

const TheatreCard = ({ theatre, history }) => {
  return (
    <TableRow onClick={() => history.push(`/theatre/${theatre.id}`)}>
      <TableDataCell>
        <h1>{theatre.title}</h1>
        <h4>The host:</h4>
        <h5>{theatre.host.username}</h5>
        <img className="icon" src={theatre.host.image} alt="" />
        <h4>Link:</h4>
        <h5>{`http://localhost:3000/theatre/${theatre.id}`}</h5>
      </TableDataCell>
    </TableRow>
  );
};

export default withRouter(TheatreCard);
