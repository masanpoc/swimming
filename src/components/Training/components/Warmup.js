import React from "react";
import { useSelector } from "react-redux";

const Warmup = () => {
  const warmup = useSelector((state) => state.warmup);
  const warmupMeters = useSelector((state)=> state.sets.warmup.total);

  return (
    <div>
      <h4>Warm up</h4>
      <h4>{warmupMeters}</h4>
      {warmup.map((ex) => {
        return (
          <h5 key={ex.id}>
            {ex.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Warmup;
