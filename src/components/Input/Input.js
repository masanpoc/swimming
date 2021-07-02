import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterNames } from "../../slices/exercisesSlice";

const Input = () => {
  const list = useSelector(state=>state.exercises)
  const dispatch = useDispatch();

  return <div>
    {
      list.map(el=>{
        return (
          <h5 key={el.id}>name: {el.name} level:{el.level}</h5>
        )
      })
    }
    <button onClick={()=>dispatch(filterNames({regex: 'i'}))}>Add</button>
  </div>;
};

export default Input;
