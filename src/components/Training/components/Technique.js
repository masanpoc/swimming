import React from "react";
import { useSelector } from "react-redux";

const Technique = () => {
  const technique = useSelector((state) => state.technique);
  const techniqueSets = useSelector((state)=> state.sets.technique.sets);
  return (
    <div>
      <h4 className='text-left pl-6'><b>Technique</b></h4>
      <div className='flex flex-col pt-4 space-y-2'>
      {technique.map((ex, i) => {
        return (
          <div className='flex justify-between px-6 ' key={ex.id}>
            <h3 className='flex justify-end ' style={{"width": "20%"}}>{techniqueSets[i]}</h3>
            <h3 className='text-left ' style={{"width": "75%"}}>{ex.name}</h3> 
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Technique;
