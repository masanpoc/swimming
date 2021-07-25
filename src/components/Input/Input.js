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
import { displayHide } from "../../slices/displaySlice";
import exercisesList from "../../lists/exercisesList";
import * as _ from "ramda";
import { useSelector } from 'react-redux'

function formatPace(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds =
    (duration % 60).toString().length > 1 ? duration % 60 : `0${duration % 60}`;
  return `${minutes}:${seconds}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Input = () => {
  const [strokes, setStrokes] = useState(['freestyle']);
  const [materials, setMaterials] = useState(['kickboard', 'pullbuoy']);
  const [muscles, setMuscles] = useState([]);
  const dispatch = useDispatch();
  const [level, setLevel] = useState(3);
  const [meters, setMeters] = useState(2200);
  const [pace, setPace] = useState(100);
  const [selected, setSelected] = useState({1: false, 2: false, 3: true, 4: false, 5: false});
  const [showMessage, setShowMessage] = useState(false);
  const display = useSelector((state) => state.display);
  let paceTime = formatPace(pace);

  const listToMap = {
    levels: [1, 2, 3, 4, 5],
    strokes: ['freestyle', 'backstroke', 'breaststroke', 'butterfly'],
    materials: ['kickboard', 'pullbuoy', 'fins', 'paddles', 'snorkel'],
    muscles: ['arms', 'pecs', 'abs', 'back', 'legs']
  }

  useEffect(() => {
    paceTime = formatPace(pace);
  }, [pace]);

  useEffect(() => {
    setSelected({1: false, 2: false, 3: false, 4: false, 5: false, [level]: true})
  }, [level])


  function thunkActionCreator() {
    return (dispatch, getState) => {
      console.log('middleware working')
      console.log(
        getState().exercises,
        "before filters",
        level,
        strokes,
        materials,
        muscles,
        meters,
        pace
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
    if(strokes.length<1){
      setShowMessage(true)
    } else {
      setShowMessage(false)
      dispatch(displayHide({form: false, training: true, buttons: true}))
      filterExercises();
    }
  }

  function resetForm() {
    // document.getElementById('training-form').reset();
    setLevel(3);
    setMeters(2200);
    setPace(100);
    setStrokes(['freestyle']);
    setMaterials(['kickboard', 'pullbuoy']);
    setMuscles([]);
    setShowMessage(false);
    dispatch(resetList({ reset: exercisesList }));
    dispatch(displayHide({form: true, training: false, buttons: false}))
  }

  function handleStrokes(e) {
    if (e.target.checked) {
      setStrokes([...strokes, e.target.value]);
    } else {
      setStrokes(strokes.filter(el=>el!=e.target.value));
    }
  }

  function handleMaterials(e) {
    if (e.target.checked) {
      setMaterials([...materials, e.target.value]);
    } else {
      setMaterials(materials.filter(el=>el!=e.target.value));
    }
  }

  function handleMuscles(e) {
    if (e.target.checked) {
      setMuscles([...muscles, e.target.value]);
    } else {
      setMuscles(muscles.filter(el=>el!=e.target.value));
    }
  }

  return (
    <div>
      

      <form
        onSubmit={handleSubmit}
        id="training-form"
        className={`my-52 mx-12 border-2 flex flex-col items-start justify-center space-y-7 border-red-500 ${display.form ? '' : 'hidden'}`}
      >
        <div className="flex flex-col space-y-4 border-2 border-green-800 w-full">
          <h3 className="text-left bg-yellow-500">Your level:</h3>
          <ul className="flex flex-row h-8">
            {
              listToMap.levels.map(level=> {return (
                <li className='relative w-9' key={level+'_level'}>
                  <input
                    type="radio"
                    id={level}
                    name="levels"
                    value={level}
                    className='opacity-0'
                    onChange={(e) => setLevel(e.target.value)}
                  />
                  <label htmlFor={level} className={`absolute flex flex-col justify-center inset-0 ${selected[level] ? 'bg-purple-600' : ''}`}>{level}</label>
                </li>
              )})
            }
          </ul>
        </div>
        
        <div className="flex flex-col space-y-16 w-full  bg-yellow-400">
          <h3 className='text-left bg-red-200'>Set your meters goal:</h3>
          <div className='relative bg-yellow-200 w-full flex flex-col justify-center'>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={meters}
              id="meterSlider"
              name='meters'
              className="w-full bg-pink-400 h-2"
              style={
                {
                  "appearance": "none"
                }
              }
              onChange={(e) => setMeters(e.target.value)}
            />
            <output htmlFor='meters' 
            className={`bg-green-50 w-3/12 text-sm py-1 rounded-md absolute bottom-5`}
            style={{"left": `${_.divide(_.subtract(meters, 407.89), 36.84)}%`, "transform": "translate(-50%, 0)"}}
            >
              {meters} m
            </output>
              {/* {_.divide(_.subtract(meters, 407.89), 36.84)} */}
            
          </div>
          
        </div>
        <div className="flex flex-col space-y-16 w-full bg-yellow-600">
          <h3 className='text-left bg-red-200'>Set your 100m freestyle pace:</h3>
          <div className='relative bg-yellow-200 w-full flex flex-col justify-center'>
            
          <input
            type="range"
            min="70"
            max="150"
            step="5"
            value={pace}
            id="paceSlider"
            name='pace'
            className="w-full bg-pink-400 h-2"
              style={
                {
                  "appearance": "none"
                }
              }
            onChange={(e) => setPace(e.target.value)}
          />
          <output htmlFor='pace' 
            className={`bg-green-50 text-sm px-3 py-1 rounded-md absolute bottom-5`}            
            style={{"left": `${_.divide(_.subtract(pace, 67.8947),  0.8421)}%`, "transform": "translate(-50%, 0)"}}
            >
               {paceTime}
            </output>
         
          
          </div>
        </div>
        <div className='flex flex-col w-full space-y-4 bg-yellow-600'>
          <h3 className='text-left bg-purple-400'>Strokes for this workout:</h3>
          <ul className='flex flex-col bg-purple-500 space-y-2 items-start'>
            {listToMap.strokes.map(stroke=>{return (
              <li className='flex w-full flex-row items-baseline space-x-2 py-1' key={stroke}>
                <input
                  type="checkbox"
                  id={stroke}
                  name={stroke}
                  value={stroke}
                  className=' bg-pink-500'
                  style={{transform: 'scale(1.2)'}}
                  checked={strokes.includes(stroke)}
                  onChange={handleStrokes}
                  
                />
                <label htmlFor={stroke} className='text-left w-full'>{capitalizeFirstLetter(stroke)}</label>
                
              </li>
            )})}
          </ul>
        </div>

        <div className='flex flex-col items-start space-y-4 w-full bg-yellow-600'>
          <h3 className='text-left w-full bg-purple-400'>Materials you are using:</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            {listToMap.materials.map(material=>{return(
              <li className={`relative rounded-3xl ${materials.includes(material) ? 'bg-blue-600' : 'bg-blue-100'}`} key={material}>
              <input
                type="checkbox"
                id={material}
                name={material}
                value={material}
                className='opacity-0'
                checked={materials.includes(material)}
                onChange={handleMaterials}
              />
              <label className='absolute flex flex-col justify-center text-sm inset-0' htmlFor={material}>{capitalizeFirstLetter(material)}</label>
            </li>
            )})}
          </ul>
        </div>

        <div className='flex flex-col items-start space-y-4 w-full bg-yellow-600'>
          <h3  className='text-left w-full bg-purple-400'>Muscles targeted (optional)</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            {listToMap.muscles.map(muscle=>{return(
              <li className={`relative rounded-3xl ${muscles.includes(muscle) ? 'bg-blue-600' : 'bg-blue-100'}`} key={muscle}>
              <input
                type="checkbox"
                id={muscle}
                name={muscle}
                value={muscle}
                className='opacity-0'
                checked={muscles.includes(muscle)}
                onChange={handleMuscles}
              />
              <label htmlFor={muscle} className='absolute flex flex-col justify-center text-sm inset-0'>{capitalizeFirstLetter(muscle)}</label>
              
              </li>
            )})}
          </ul>
        </div>

        <input type="submit" value="Generate your workout" 
          className=' bg-green-500 rounded-md px-3 py-1'
        
          style={{"marginTop": "40px"}}
        />
      </form>
      
      <h1 className={`${showMessage ? '' : 'hidden'}`}>Please select at least one stroke</h1>

      <h1>{`${_.values(display)}`}</h1>

      <div className={`${display.buttons ? '' : 'hidden'}`}>
        <h2>You don&#39;t like your training ?</h2>
        <p>Keep your preferences and generate a new training or go back to the form and set new options</p>
        <div>
        <button onClick={filterExercises}>Generate your workout again</button>
        <button onClick={resetForm}>Reset Options</button>
        </div>
      </div>
      
    </div>
  );
};

export default Input;
