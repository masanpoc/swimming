import React from "react";
import { useSelector } from "react-redux";

const Technique = () => {
  const technique = useSelector((state) => state.technique);

  return (
    <div>
      <h4>Technique</h4>
      {technique.map((ex) => {
        return (
          <h5 key={ex.id}>
            name: {ex.name} level:{ex.level} materials:{ex.material}
          </h5>
        );
      })}
    </div>
  );
};

export default Technique;
