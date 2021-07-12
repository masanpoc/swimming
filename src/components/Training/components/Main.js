import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const main = useSelector(state=>state.main)

  return <div>
    <h4>Main Block</h4>
    {
      main.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
  </div>;
};

export default Main;
