import React from "react";
import { useSelector } from "react-redux";
import generateTimes from "../../../functions/generateTimes";

const Main = () => {
  const main = useSelector((state) => state.main);
  const mainSets = useSelector((state)=> state.sets.main.sets);
  const mainEach = useSelector((state)=> state.sets.main.each);
  return (
    <div>
      <h4  className='text-left pl-6'><b>Main Block {mainSets.length}</b></h4>
      {mainSets.every(el=>typeof(el)=='string') 
        ?  <div className='flex flex-col pt-3 space-y-2'>
            {main.map((ex, i) => {
              return (
                <div className='flex justify-between px-6 ' key={ex.id}>
                  <h3 className='flex justify-end ' style={{"width": "20%"}}>{mainSets[i]}</h3>
                  <h3 className='text-left ' style={{"width": "75%"}}>{ex.name}</h3> 
                </div>
              );
            })}
        </div>
        : <div>d</div>
      }
    </div>
  );
};

export default Main;
