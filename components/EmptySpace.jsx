import React from "react";

const EmptySpace = ({ lines = 2 }) => {
  return (
    <div>
      {new Array(lines).fill(0).map((_, i) => {
        return <br key={i} />;
      })}
    </div>
  );
};

export default EmptySpace;
