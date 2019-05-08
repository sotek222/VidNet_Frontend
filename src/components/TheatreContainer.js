import React from "react";
import TheatreCard from "./TheatreCard";
import { Table, TableBody } from "react95";

const TheatreContainer = props => {
  const theatres = props.theatres.map(theatreObj => {
    return <TheatreCard key={theatreObj.id} theatre={theatreObj} />;
  });

  return (
    <div className="container" style={{ marginLeft: -6 }}>
      <Table style={{ marginTop: 6 }}>
        <TableBody>{theatres}</TableBody>
      </Table>
    </div>
  );
};

export default TheatreContainer;
