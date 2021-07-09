import React from "react";
import { useSelector } from "react-redux";

const Cooldown = () => {
  const cooldown = useSelector(state=>state.cooldown)

  return <div>
  
  
  <h4>Cooldown</h4>
    {
      cooldown.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
  </div>;
};

export default Cooldown;
