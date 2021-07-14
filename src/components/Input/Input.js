import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByLevel, filterByStroke, filterByMaterial, resetList } from "../../slices/exercisesSlice";
import { copy_filter_select_warmupExercises } from '../../slices/warmupSlice';
import { copy_filter_select_techniqueExercises } from '../../slices/techniqueSlice';
import { copy_filter_select_mainExercises } from '../../slices/mainSlice';
import { copy_filter_select_cooldownExercises } from '../../slices/cooldownSlice';
import exercisesList from "../../lists/exercisesList";
import * as _ from 'ramda'


const Input = () => {
  
  const strokes = [];
  const materials = [];
  const muscles = [];
  const dispatch = useDispatch();
  const [level, setLevel] = useState(1);

  function thunkActionCreator() {
    return (dispatch, getState) => {
      // console.log('middleware working')
      console.log(getState().exercises, 'before filters', level, strokes, materials);
      dispatch(filterByLevel({level}));
      dispatch(filterByStroke({strokesTargeted: strokes}));
      dispatch(filterByMaterial({material: materials}));
      let filteredList = getState().exercises;
      console.log(filteredList, 'after filters')
      dispatch(copy_filter_select_warmupExercises({
        filteredExercises: filteredList, 
        material: ['kickboard', 'snorkel', 'paddles', 'fins', 'pullbuoy'], 
        muscle: []
      }));
      const warmup = getState().warmup;
      // remove exercises that are already in warmup --> use _.difference function
      filteredList=_.difference(filteredList, warmup);
      // check if we have removed the generated warmup exercises from the list
      // console.log(filteredList);
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
    
    
    // dispatch(calling thunk action creator) in order to dispatch dependent to each other state updates 
    dispatch(thunkActionCreator());
  }

  function handleSubmit(e) {
    // alert if any fields are not as expected
    e.preventDefault();
    filterExercises();
  }

  function resetForm() {
    // document.getElementById('training-form').reset();
    // document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    dispatch(resetList({reset: exercisesList}));
  }

  function handleStrokes(e) {
    if(e.target.checked){
      strokes.push(e.target.value)
    } else {
      let index = strokes.indexOf(e.target.value);
      strokes.splice(index,1)
    }
  }

  function handleMaterials(e) {
    if(e.target.checked){
      materials.push(e.target.value)
    } else {
      let index = materials.indexOf(e.target.value);
      materials.splice(index,1)
    }
  }

  function handleMuscles(e) {
    if(e.target.checked){
      muscles.push(e.target.value)
    } else {
      let index = muscles.indexOf(e.target.value);
      muscles.splice(index,1)
    }
  }

  return <div>
    {/* {
      list.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    } */}
    
    <form onSubmit={handleSubmit} id='training-form'>
      <label htmlFor="levels">
        <h3>Your level:</h3>
      </label>
      <ul>
        <li>
          <input type="radio" id="1" name="1" value="1" onChange={(e)=>setLevel(e.target.value)}/>
          <label htmlFor="1">1</label>
        </li>
        <li>
          <input type="radio" id="2" name="2" value="2" onChange={(e)=>setLevel(e.target.value)}/>
          <label htmlFor="2">2</label>
        </li>
        <li>
          <input type="radio" id="3" name="3" value="3" onChange={(e)=>setLevel(e.target.value)}/>
          <label htmlFor="3">3</label>
        </li>
        <li>
          <input type="radio" id="4" name="4" value="4" onChange={(e)=>setLevel(e.target.value)}/>
          <label htmlFor="4">4</label>
        </li>
        <li>
          <input type="radio" id="5" name="5" value="5" onChange={(e)=>setLevel(e.target.value)}/>
          <label htmlFor="5">5</label>
        </li>
      </ul>
      <br/>
      <div>
        Here will go meters and pace range sliders
      </div>
      <h3>Strokes for this workout:</h3>
      <div>
        <input type="checkbox" id="freestyle" name="freestyle" value="freestyle" onChange={handleStrokes}/>
        <label htmlFor="freestyle">Freestyle</label><br/>
        <input type="checkbox" id="backstroke" name="backstroke" value="backstroke" onChange={handleStrokes}/>
        <label htmlFor="backstroke">Backstroke</label><br/>
        <input type="checkbox" id="breaststroke" name="breaststroke" value="breaststroke" onChange={handleStrokes}/>
        <label htmlFor="breaststroke">Breaststroke</label><br/>
        <input type="checkbox" id="butterfly" name="butterfly" value="butterfly" onChange={handleStrokes}/>
        <label htmlFor="butterfly">Butterfly</label><br/>
      </div>

      <h3>Materials you are using: (toggle tokens)</h3>
      <div>
        <input type="checkbox" id="kickboard" name="kickboard" value="kickboard" onChange={handleMaterials}/>
        <label htmlFor="kickboard">Kickboard</label><br/>
        <input type="checkbox" id="pullbuoy" name="pullbuoy" value="pullbuoy" onChange={handleMaterials}/>
        <label htmlFor="pullbuoy">Pull-buoy</label><br/>
        <input type="checkbox" id="fins" name="fins" value="fins" onChange={handleMaterials}/>
        <label htmlFor="fins">Fins</label><br/>
        <input type="checkbox" id="paddles" name="paddles" value="paddles" onChange={handleMaterials}/>
        <label htmlFor="paddles">Paddles</label><br/>
        <input type="checkbox" id="snorkel" name="snorkel" value="snorkel" onChange={handleMaterials}/>
        <label htmlFor="snorkel">Snorkel</label><br/>
      </div>

      <h3>Muscles you want to focus on: (toggle tokens)</h3>
      <div>
        {/* <input type="checkbox" id="all" name="all" value="all" onChange={handleMuscles}/>
        <label htmlFor="all">All</label><br/> */}
        <input type="checkbox" id="arms" name="arms" value="arms" onChange={handleMuscles}/>
        <label htmlFor="arms">Arms</label><br/>
        <input type="checkbox" id="pecs" name="pecs" value="pecs" onChange={handleMuscles}/>
        <label htmlFor="pecs">Pecs</label><br/>
        <input type="checkbox" id="abs" name="abs" value="abs" onChange={handleMuscles}/>
        <label htmlFor="abs">Abs</label><br/>
        <input type="checkbox" id="back" name="back" value="back" onChange={handleMuscles}/>
        <label htmlFor="back">Back</label><br/>
        <input type="checkbox" id="legs" name="legs" value="legs" onChange={handleMuscles}/>
        <label htmlFor="legs">Legs</label><br/>
      </div>

      <input type="submit" value="Generate your workout"/>
      
    </form>

    <button onClick={resetForm}>Reset Options</button>
    
    
    
  </div>;
};

export default Input;
