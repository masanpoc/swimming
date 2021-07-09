import React from "react";
import { useSelector } from "react-redux";

const Warmup = () => {
  const warmup = useSelector(state=>state.warmup)

  return <div>
    <h4>Warmup</h4>
    {
      warmup.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
  </div>;
};

export default Warmup;
