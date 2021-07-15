import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByLevel,
  filterByStroke,
  filterByMaterial,
  resetList,
} from "../../slices/exercisesSlice";
import { copy_filter_select_warmupExercises } from "../../slices/warmupSlice";
import { copy_filter_select_techniqueExercises } from "../../slices/techniqueSlice";
import { copy_filter_select_mainExercises } from "../../slices/mainSlice";
import { copy_filter_select_cooldownExercises } from "../../slices/cooldownSlice";
import exercisesList from "../../lists/exercisesList";
import * as _ from "ramda";

function formatPace(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds =
    (duration % 60).toString().length > 1 ? duration % 60 : `0${duration % 60}`;
  return `${minutes}:${seconds}`;
}

const Input = () => {
  const strokes = [];
  const materials = [];
  const muscles = [];
  const dispatch = useDispatch();
  const [level, setLevel] = useState(1);
  const [meters, setMeters] = useState(2000);
  const [pace, setPace] = useState(100);
  let paceTime = formatPace(pace);

  useEffect(() => {
    paceTime = formatPace(pace);
  }, [pace]);

  function thunkActionCreator() {
    return (dispatch, getState) => {
      // console.log('middleware working')
      console.log(
        getState().exercises,
        "before filters",
        level,
        strokes,
        materials
      );
      dispatch(filterByLevel({ level }));
      dispatch(filterByStroke({ strokesTargeted: strokes }));
      dispatch(filterByMaterial({ material: materials }));
      let filteredList = getState().exercises;
      console.log(filteredList, "after filters");
      dispatch(
        copy_filter_select_warmupExercises({
          filteredExercises: filteredList,
          material: ["kickboard", "snorkel", "paddles", "fins", "pullbuoy"],
          muscle: [],
        })
      );
      const warmup = getState().warmup;
      // remove exercises that are already in warmup --> use _.difference function
      filteredList = _.difference(filteredList, warmup);
      // check if we have removed the generated warmup exercises from the list
      // console.log(filteredList);
      dispatch(
        copy_filter_select_techniqueExercises({
          filteredExercises: filteredList,
          material: ["kickboard", "snorkel", "paddles", "fins", "pullbuoy"],
          muscle: [],
        })
      );
      const technique = getState().technique;
      // remove exercises that are already in technique --> use _.difference function
      filteredList = _.difference(filteredList, technique);
      dispatch(
        copy_filter_select_mainExercises({
          filteredExercises: filteredList,
          material: ["kickboard", "snorkel", "paddles", "fins", "pullbuoy"],
          muscle: [],
        })
      );
      const main = getState().main;
      // remove exercises that are already in main --> use _.difference function
      filteredList = _.difference(filteredList, main);
      dispatch(
        copy_filter_select_cooldownExercises({
          filteredExercises: filteredList,
          material: ["kickboard", "snorkel", "paddles", "fins", "pullbuoy"],
          muscle: [],
        })
      );
    };
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
    dispatch(resetList({ reset: exercisesList }));
  }

  function handleStrokes(e) {
    if (e.target.checked) {
      strokes.push(e.target.value);
    } else {
      let index = strokes.indexOf(e.target.value);
      strokes.splice(index, 1);
    }
  }

  function handleMaterials(e) {
    if (e.target.checked) {
      materials.push(e.target.value);
    } else {
      let index = materials.indexOf(e.target.value);
      materials.splice(index, 1);
    }
  }

  function handleMuscles(e) {
    if (e.target.checked) {
      muscles.push(e.target.value);
    } else {
      let index = muscles.indexOf(e.target.value);
      muscles.splice(index, 1);
    }
  }

  return (
    <div>
      {/* {
      list.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    } */}

      <form
        onSubmit={handleSubmit}
        id="training-form"
        className="my-52 mx-12 border-2 flex flex-col items-start justify-center space-y-7 border-red-500"
      >
        <div className="flex flex-col space-y-4 border-2 border-green-800 w-full">
          <h3 className="text-left bg-yellow-500">Your level:</h3>
          <ul className="flex flex-row h-8">
            <li className='relative w-9'>
              <input
                type="radio"
                id="1"
                name="levels"
                value="1"
                className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="1" className='absolute inset-0'>1</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="2"
                name="levels"
                value="2"
                className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="2" className='absolute inset-0'>2</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="3"
                name="levels"
                value="3"
                className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="3" className='absolute inset-0'>3</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="4"
                name="levels"
                value="4"
                // className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="4" className='absolute inset-0'>4</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="5"
                name="levels"
                value="5"
                // className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="5" className='absolute inset-0'>5</label>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-11 w-full  bg-yellow-400">
          <h3 className='text-left bg-red-200'>Set your meters goal:</h3>
          <div className='relative bg-yellow-200 w-full'>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={meters}
              id="meterSlider"
              name='meters'
              className="w-full "
              style={
                {
                  "appearance": "none"
                }
              }
              onChange={(e) => setMeters(e.target.value)}
            />
            <output htmlFor='meters' 
            className={`bg-green-50 w-3/12 text-sm px-2 py-1 rounded-md absolute bottom-6`}
            style={{"left": `${_.divide(_.subtract(meters, 407.89), 36.84)}%`, "transform": "translate(-50%, 0)"}}
            >
              {meters} m
            </output>
              {/* {_.divide(_.subtract(meters, 407.89), 36.84)} */}
            
          </div>
          
        </div>
        <div className="flex flex-col space-y-11 w-full bg-yellow-600">
          <h3 className='text-left bg-red-200'>Set your 100m freestyle pace:</h3>
          <div className='relative bg-yellow-200 w-full'>
            
          <input
            type="range"
            min="70"
            max="150"
            step="5"
            value={pace}
            id="paceSlider"
            name='pace'
            className="w-full "
              style={
                {
                  "appearance": "none"
                }
              }
            onChange={(e) => setPace(e.target.value)}
          />
          <output htmlFor='pace' 
            className={`bg-green-50 w-3/12 text-sm px-2 py-1 rounded-md absolute bottom-6`}            
            style={{"left": `${_.divide(_.subtract(pace, 67.8947),  0.8421)}%`, "transform": "translate(-50%, 0)"}}
            >
               {paceTime}
            </output>
         
          
          </div>
        </div>
        <div className='flex flex-col bg-yellow-600'>
          <h3>Strokes for this workout:</h3>
          <ul className='flex flex-col pl-4 items-start'>
            <li>
              <input
                type="checkbox"
                id="freestyle"
                name="freestyle"
                value="freestyle"
                onChange={handleStrokes}
              />
              <label htmlFor="freestyle">Freestyle</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="backstroke"
                name="backstroke"
                value="backstroke"
                onChange={handleStrokes}
              />
              <label htmlFor="backstroke">Backstroke</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="breaststroke"
                name="breaststroke"
                value="breaststroke"
                onChange={handleStrokes}
              />
              <label htmlFor="breaststroke">Breaststroke</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="butterfly"
                name="butterfly"
                value="butterfly"
                onChange={handleStrokes}
              />
              <label htmlFor="butterfly">Butterfly</label>
              
            </li>
          </ul>
        </div>

        <div className='flex flex-col items-start bg-yellow-600'>
          <h3>Materials you are using:</h3>
          <ul className="grid grid-cols-3 border-2 border-green-600">
            <li>
              <input
                type="checkbox"
                id="kickboard"
                name="kickboard"
                value="kickboard"
                onChange={handleMaterials}
              />
              <label htmlFor="kickboard">Kickboard</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="pullbuoy"
                name="pullbuoy"
                value="pullbuoy"
                onChange={handleMaterials}
              />
              <label htmlFor="pullbuoy">Pull-buoy</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="fins"
                name="fins"
                value="fins"
                onChange={handleMaterials}
              />
              <label htmlFor="fins">Fins</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="paddles"
                name="paddles"
                value="paddles"
                onChange={handleMaterials}
              />
              <label htmlFor="paddles">Paddles</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="snorkel"
                name="snorkel"
                value="snorkel"
                onChange={handleMaterials}
              />
              <label htmlFor="snorkel">Snorkel</label>
              
            </li>
          </ul>
        </div>

        <div className='bg-yellow-600'>
          <h3>Muscles you want to focus on:</h3>
          <ul className="grid grid-cols-3 border-2 border-green-600">
            <li>
              <input
                type="checkbox"
                id="arms"
                name="arms"
                value="arms"
                onChange={handleMuscles}
              />
              <label htmlFor="arms">Arms</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="pecs"
                name="pecs"
                value="pecs"
                onChange={handleMuscles}
              />
              <label htmlFor="pecs">Pecs</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="abs"
                name="abs"
                value="abs"
                onChange={handleMuscles}
              />
              <label htmlFor="abs">Abs</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="back"
                name="back"
                value="back"
                onChange={handleMuscles}
              />
              <label htmlFor="back">Back</label>
              
            </li>
            <li>
              <input
                type="checkbox"
                id="legs"
                name="legs"
                value="legs"
                onChange={handleMuscles}
              />
              <label htmlFor="legs">Legs</label>
              
            </li>
          </ul>
        </div>

        <input type="submit" value="Generate your workout" />
      </form>

      <button onClick={resetForm}>Reset Options</button>
    </div>
  );
};

export default Input;
