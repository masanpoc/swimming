import React from "react";
import { useSelector } from "react-redux";
import generateTimes from "../../../functions/generateTimes";

const Main = () => {
  const main = useSelector((state) => state.main);
  const mainSets = useSelector((state)=> state.sets.main.sets);
  const pace = useSelector((state)=>state.pace)

  function makeSetsIterator(sets) {
      const length = sets.length;
      let counterBlock = 0;
      let counterSet = 0;
      const setsIterator = {
            next: function() {
                let result;
                // looping over blocks
                  // number of sets in first block
                    let numberSets = sets[counterBlock].sets;
                    // looping over each set
                    if(counterSet<numberSets && counterBlock < length){
                      result = { value: sets[counterBlock].eachSet[counterSet], done: false}
                      counterSet++;
                      console.log(result.value, 'result next')
                      return result
                    }
                    counterBlock++;
                    numberSets = sets[counterBlock].sets;
                    if(counterSet<numberSets && counterBlock < length){
                      result = { value: sets[counterBlock].eachSet[counterSet], done: false}
                      counterSet++;
                      console.log(result.value, 'result next')
                      return result
                    }
                
                return { done: true }
            }
          };
      return setsIterator;
  }
  const it = makeSetsIterator(mainSets);

  return (
    <div>
      <h4  className='text-left pl-6'><b>Main Block</b></h4>
      {mainSets.every(el=>typeof(el)=='string') 
        ?  <div className='flex flex-col pt-3 space-y-2'>
            {main.map((ex, i) => {
              return (
                <div className='flex justify-between px-6 ' key={ex.id}>
                  <h3 className='flex justify-end ' style={{"width": "20%"}}>{mainSets[i]}</h3>
                  <h3 className='text-left ' style={{"width": "75%"}}>{ex.name} {generateTimes(pace, Number(mainSets[i].split('x')[1]), ex.stroke)}</h3> 
                </div>
              );
            })}
        </div>
        : <div>
          {mainSets.map((blockSet,i)=>{return (
            <div className='flex w-full pt-3 px-6 justify-between' key={`${blockSet}-${i}`}>
              <div className='bg-blue-ocean flex justify-between'  style={{"width": "20%"}}>
                <span>{blockSet.sets}</span>
                <div className='h-4 w-0 bg-lighter-grey'></div>
                <div className='flex flex-col' >
                {blockSet.eachSet.map((singleSet, i)=>{return (
                  <h2 key={singleSet+i}>{singleSet}</h2>
                )})}
                </div>
              </div>
              <div className='flex flex-col bg-green-herb space-y-2' style={{"width": "75%"}}>
                {main.map((ex)=> {
                  return (
                    <h3 className='text-left' key={ex.id}>
                      {ex.name} {generateTimes(pace, Number(it.next().value.split('x')[1]), ex.stroke)}
                    </h3>
                  )
                })}
              </div>
            </div>
          )})}
        </div>
      }
    </div>
  );
};

export default Main;
