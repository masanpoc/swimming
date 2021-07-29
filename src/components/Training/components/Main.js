import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const main = useSelector((state) => state.main);
  const mainMeters = useSelector((state)=> state.sets.main.total);
  return (
    <div>
      <h4>Main Block</h4>
      <h4>{mainMeters}</h4>
      {main.map((ex) => {
        return (
          <h5 key={ex.id}>
            {ex.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Main;
