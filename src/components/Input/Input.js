import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByLevel, filterByStroke, filterByMaterial } from "../../slices/exercisesSlice";

const Input = () => {
  const list = useSelector(state=>state.exercises)
  const dispatch = useDispatch();

  function filterExercises() {
    // dispatch(filterByLevel({level: 2}));
    // dispatch(filterByStroke({strokesTargeted: ['breaststroke']}));
    dispatch(filterByMaterial({material: ['kickboard']}));
  }

  return <div>
    {
      list.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
    <button onClick={filterExercises}>Add</button>
  </div>;
};

export default Input;
