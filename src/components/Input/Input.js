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
  const [strokes, setStrokes] = useState(['freestyle']);
  const [materials, setMaterials] = useState(['kickboard', 'pullbuoy']);
  const [muscles, setMuscles] = useState([]);
  const dispatch = useDispatch();
  const [level, setLevel] = useState(3);
  const [meters, setMeters] = useState(2200);
  const [pace, setPace] = useState(100);
  const [selected, setSelected] = useState({1: false, 2: false, 3: true, 4: false, 5: false});
  let paceTime = formatPace(pace);

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
        muscles
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
              <label htmlFor="1" className={`absolute flex flex-col justify-center inset-0 ${selected[1] ? 'bg-purple-600' : ''}`}>1</label>
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
              <label htmlFor="2" className={`absolute flex flex-col justify-center inset-0 ${selected[2] ? 'bg-purple-600' : ''}`}>2</label>
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
              <label htmlFor="3" className={`absolute flex flex-col justify-center inset-0 ${selected[3] ? 'bg-purple-600' : ''}`}>3</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="4"
                name="levels"
                value="4"
                className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="4" className={`absolute flex flex-col justify-center inset-0 ${selected[4] ? 'bg-purple-600' : ''}`}>4</label>
            </li>
            <li className='relative w-9'>
              <input
                type="radio"
                id="5"
                name="levels"
                value="5"
                className='opacity-0'
                onChange={(e) => setLevel(e.target.value)}
              />
              <label htmlFor="5" className={`absolute flex flex-col justify-center inset-0 ${selected[5] ? 'bg-purple-600' : ''}`}>5</label>
            </li>
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
            <li className='flex w-full flex-row items-baseline space-x-2 py-1'>
              <input
                type="checkbox"
                id="freestyle"
                name="freestyle"
                value="freestyle"
                className=' bg-pink-500'
                style={{transform: 'scale(1.2)'}}
                checked={strokes.includes('freestyle')}
                onChange={handleStrokes}
              />
              <label htmlFor="freestyle" className='text-left w-full'>Freestyle</label>
              
            </li>
            <li className='flex flex-row items-baseline w-full space-x-2 py-1'>
              <input
                type="checkbox"
                id="backstroke"
                name="backstroke"
                value="backstroke"
                style={{transform: 'scale(1.2)'}}
                onChange={handleStrokes}
              />
              <label htmlFor="backstroke" className='text-left w-full'>Backstroke</label>
              
            </li>
            <li className='flex flex-row items-baseline  w-full space-x-2 py-1'>
              <input
                type="checkbox"
                id="breaststroke"
                name="breaststroke"
                value="breaststroke"
                style={{transform: 'scale(1.2)'}}
                onChange={handleStrokes}
              />
              <label htmlFor="breaststroke" className='text-left w-full'>Breaststroke</label>
              
            </li>
            <li className='flex flex-row items-baseline w-full space-x-2 py-1'>
              <input
                type="checkbox"
                id="butterfly"
                name="butterfly"
                value="butterfly"
                style={{transform: 'scale(1.2)'}}
                onChange={handleStrokes}
              />
              <label htmlFor="butterfly" className='text-left w-full'>Butterfly</label>
              
            </li>
          </ul>
        </div>

        <div className='flex flex-col items-start space-y-4 w-full bg-yellow-600'>
          <h3 className='text-left w-full bg-purple-400'>Materials you are using:</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            <li className={`relative rounded-3xl ${materials.includes('kickboard') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="kickboard"
                name="kickboard"
                value="kickboard"
                className='opacity-0'
                checked={materials.includes('kickboard')}
                onChange={handleMaterials}
              />
              <label className='absolute flex flex-col justify-center text-sm inset-0' htmlFor="kickboard">Kickboard</label>
              
            </li>
            <li className={`relative rounded-3xl ${materials.includes('pullbuoy') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="pullbuoy"
                name="pullbuoy"
                value="pullbuoy"
                className='opacity-0'
                checked={materials.includes('pullbuoy')}
                onChange={handleMaterials}
              />
              <label  className='absolute flex flex-col justify-center text-sm inset-0'  htmlFor="pullbuoy">Pull-buoy</label>
              
            </li>
            <li className={`relative rounded-3xl ${materials.includes('fins') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="fins"
                name="fins"
                value="fins"
                className='opacity-0'
                onChange={handleMaterials}
              />
              <label  className='absolute flex flex-col justify-center text-sm inset-0'  htmlFor="fins">Fins</label>
              
            </li>
            <li className={`relative rounded-3xl ${materials.includes('paddles') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="paddles"
                name="paddles"
                value="paddles"
                className='opacity-0'
                onChange={handleMaterials}
              />
              <label className='absolute flex flex-col justify-center text-sm inset-0'  htmlFor="paddles">Paddles</label>
              
            </li>
            <li className={`relative rounded-3xl ${materials.includes('snorkel') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="snorkel"
                name="snorkel"
                value="snorkel"
                className='opacity-0'
                onChange={handleMaterials}
              />
              <label className='absolute flex flex-col justify-center text-sm inset-0'  htmlFor="snorkel">Snorkel</label>
              
            </li>
          </ul>
        </div>

        <div className='flex flex-col items-start space-y-4 w-full bg-yellow-600'>
          <h3  className='text-left w-full bg-purple-400'>Muscles you want to focus on:</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            <li className={`relative rounded-3xl ${muscles.includes('arms') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="arms"
                name="arms"
                value="arms"
                className='opacity-0'
                onChange={handleMuscles}
              />
              <label htmlFor="arms" className='absolute flex flex-col justify-center text-sm inset-0'>Arms</label>
              
            </li>
            <li className={`relative rounded-3xl ${muscles.includes('pecs') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="pecs"
                name="pecs"
                value="pecs"
                className='opacity-0'
                onChange={handleMuscles}
              />
              <label htmlFor="pecs" className='absolute flex flex-col justify-center text-sm inset-0'>Pecs</label>
              
            </li>
            <li className={`relative rounded-3xl ${muscles.includes('abs') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="abs"
                name="abs"
                value="abs"
                className='opacity-0'
                onChange={handleMuscles}
              />
              <label htmlFor="abs" className='absolute flex flex-col justify-center text-sm inset-0'>Abs</label>
              
            </li>
            <li className={`relative rounded-3xl ${muscles.includes('back') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="back"
                name="back"
                value="back"
                className='opacity-0'
                onChange={handleMuscles}
              />
              <label htmlFor="back" className='absolute flex flex-col justify-center text-sm inset-0'>Back</label>
              
            </li>
            <li className={`relative rounded-3xl ${muscles.includes('legs') ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <input
                type="checkbox"
                id="legs"
                name="legs"
                value="legs"
                className='opacity-0'
                onChange={handleMuscles}
              />
              <label htmlFor="legs" className='absolute flex flex-col justify-center text-sm inset-0'>Legs</label>
              
            </li>
          </ul>
        </div>

        <input type="submit" value="Generate your workout" 
          className=' bg-green-500 rounded-md px-3 py-1'
        
          style={{"marginTop": "40px"}}
        />
      </form>

      <button onClick={resetForm}>Reset Options</button>
    </div>
  );
};

export default Input;
