import React from "react";
import { useSelector } from "react-redux";

const Technique = () => {
  const technique = useSelector((state) => state.technique);
  const techniqueMeters = useSelector((state)=> state.sets.technique.total);
  return (
    <div>
      <h4>Technique</h4>
      <h4>{techniqueMeters}</h4>
      {technique.map((ex) => {
        return (
          <h5 key={ex.id}>
            {ex.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Technique;
