import React from "react";
import { useSelector } from "react-redux";
import generateTimes from "../../../functions/generateTimes";

const Main = () => {
  const main = useSelector((state) => state.main);
  const mainTotal = useSelector((state)=> state.sets.main.total);
  const mainEach = useSelector((state)=> state.sets.main.each);
  const mainSets = useSelector((state)=> state.sets.main.sets);
  const pace = useSelector((state)=>state.pace)

  let eachSetMetersList = {1: [], 2: []};
  // console.log(mainEach)
  // console.log(mainTotal)
  // console.log(mainSets)
  return (
    <div>
      <h4  className='text-left pl-6'><b>Main Block</b></h4>
      {/* <h2>{mainTotal}</h2>
      <h3 className='flex justify-center space-x-2 w-full bg-blue-ocean'>{mainEach.map((el, i)=>{return(
        <span key={i}>{String(el)}</span>
      )})}</h3> */}
      {mainSets.every(el=>typeof(el)=='string') 
        ?  <div className='flex flex-col pt-4 space-y-2'>
            {main.map((ex, i) => {
              return (
                <div className='flex justify-between px-6 ' key={ex.id}>
                  <h3 className='flex justify-end ' style={{"width": "20%"}}>{mainSets[i]}</h3>
                  <h3 className='text-left ' style={{"width": "75%"}}>{ex.name} {generateTimes(pace, Number(mainSets[i].split('x')[1]), ex.stroke)}</h3> 
                </div>
              );
            })}
        </div>
        : <div className='flex flex-col space-y-3'>



          {mainSets.map((blockSet,index)=>{
            
            return (
            <div className='flex w-full pt-4 px-6 justify-between' key={`${blockSet}-${index}`}>
              <div className='flex space-x-1 pt-1'  style={{"width": "20%"}}>
                <span className='flex flex-col justify-center'>{blockSet.sets}</span>
                <div className='h-full w-0.5 bg-black'></div>
                <div className='h-full w-full flex flex-col space-y-12 ' >
                {blockSet.eachSet.map((singleSet, i)=>{
                  eachSetMetersList[index+1].push(singleSet.split('x')[1])
                  return (
                  <h2 key={singleSet+i} className='w-full text-sm' >{singleSet}</h2>
                )})}
                </div>
              </div>
              <div className='flex flex-col space-y-2' style={{"width": "75%"}}>
                {
                  eachSetMetersList[index+1].map((val, index2)=>{
                    if(index==0){
                      {/* console.log(main, 'main')
                      console.log(index2, 'index2')
                      console.log(main[index2], 'main[index2]') */}
                      return(
                        <h3 className='text-left' key={main[index2].id}>
                          {main[index2].name} {generateTimes(pace, Number(eachSetMetersList[index+1][index2]), main[index2].stroke)}
                        </h3>
                      )
                    }
                    if(index==1){
                      return(
                        <h3 className='text-left' key={main[index2+2].id}>
                          {main[index2+2].name} {generateTimes(pace, Number(eachSetMetersList[index+1][index2]), main[index2+2].stroke)}
                        </h3>
                      )
                    }
                  })
                }
                {/* {main.map((ex, i)=> {
                  console.log(eachSetMetersList[i], 'next value')
                  return (
                    <h3 className='text-left' key={ex.id}>
                      {ex.name} {generateTimes(pace, Number(eachSetMetersList[i]), ex.stroke)}
                    </h3>
                  )
                })} */}
              </div>
            </div>
          )})}



          
        </div>
      }
    </div>
  );
};

export default Main;
