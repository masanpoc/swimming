import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByLevel, filterByStroke, filterByMaterial } from "../../slices/exercisesSlice";
import { copy_filter_select_warmupExercises } from '../../slices/warmupSlice';
import { copy_filter_select_techniqueExercises } from '../../slices/techniqueSlice';
import { copy_filter_select_mainExercises } from '../../slices/mainSlice';
import { copy_filter_select_cooldownExercises } from '../../slices/cooldownSlice';
import * as _ from 'ramda'


const Input = () => {
  const list = useSelector(state=>state.exercises)
  const dispatch = useDispatch();
  const warmup = useSelector(state=>state.warmup)
  const technique = useSelector(state=>state.technique);
  const main = useSelector(state=>state.main)
  const cooldown = useSelector(state=>state.cooldown)

  function thunkActionCreator() {
    return (dispatch, getState) => {
      console.log('middleware working')
      let filteredList = list;
      console.log(filteredList);
      dispatch(copy_filter_select_warmupExercises({
        filteredExercises: filteredList, 
        material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], 
        muscle: []
      }));
      const warmup = getState().warmup;
      // remove exercises that are already in warmup --> use _.difference function
      filteredList=_.difference(filteredList, warmup);
      console.log(filteredList);
      dispatch(copy_filter_select_techniqueExercises({
        filteredExercises: filteredList, 
        material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'],
        muscle: []
      }));
      const technique = getState().technique;
      // remove exercises that are already in technique --> use _.difference function
      filteredList=_.difference(filteredList, technique);
      dispatch(copy_filter_select_mainExercises({
        filteredExercises: filteredList, 
        material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], 
        muscle: []
      }));
      const main = getState().main;
      // remove exercises that are already in main --> use _.difference function
      filteredList=_.difference(filteredList, main);
      dispatch(copy_filter_select_cooldownExercises({
        filteredExercises: filteredList, 
        material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], 
        muscle: []
      }));
    }
  }

  function filterExercises() {
    // dispatch(filterByLevel({level: 5}));
    // // dispatch(filterByStroke({strokesTargeted: ['breaststroke']}));
    // // dispatch(filterByMaterial({material: ['kickboard']}));
    
    // // once filtered all exs => copy to each block and filter by block in each block
    // dispatch(copy_filter_select_warmupExercises({filteredExercises: list, material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], muscle: []}));
    // dispatch(copy_filter_select_techniqueExercises({
    //   filteredExercises: list, material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'],
    //   muscle: [],
    //   warmup: warmup
    // }));
    // dispatch(copy_filter_select_mainExercises({filteredExercises: list, material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], muscle: []}));
    // dispatch(copy_filter_select_cooldownExercises({filteredExercises: list, material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], muscle: []}));
    
    // dispatch(calling thunk action creator) in order to dispatch dependent to each other state updates 
    dispatch(thunkActionCreator());
    

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
    <h4>Warmup</h4>
    {
      warmup.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
    <h4>Technique</h4>
    {
      technique.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
    <h4>Main</h4>
    {
      main.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    }
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

export default Input;
