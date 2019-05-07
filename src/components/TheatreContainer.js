import React from "react";
import TheatreCard from "./TheatreCard";

const TheatreContainer = props => {
  const theatres = props.theatres.map(theatreObj => {
    return <TheatreCard key={theatreObj.id} theatre={theatreObj} />;
  });

  return (
    <div className="container" style={{ marginLeft: -6 }}>
      {theatres}
    </div>
  );
};

export default TheatreContainer;
