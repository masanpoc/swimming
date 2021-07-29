import React from "react";
import { useSelector } from "react-redux";

const Cooldown = () => {
  const cooldown = useSelector((state) => state.cooldown);
  const cooldownMeters = useSelector((state)=> state.sets.cooldown.total);
  const cooldownMetersEach = useSelector((state)=> state.sets.cooldown.each);
  return (
    <div>
      <h4>Cool down</h4>
      {cooldownMetersEach.map((el,i)=>{return(
        <h2 key={`cooldown-${el}-${i}`}>{el}</h2>
      )})}
      <h4>{cooldownMeters}</h4>
      {cooldown.map((ex) => {
        return (
          <h5 key={ex.id}>
            {ex.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Cooldown;
