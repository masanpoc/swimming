import React, {useState} from "react";
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
  const [level, setLevel] = useState(1);

  function thunkActionCreator() {
    return (dispatch, getState) => {
      // console.log('middleware working')
      let filteredList = list;
      // console.log(filteredList);
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(level);
  }

  return <div>
    {/* {
      list.map(ex=>{
        return (
          <h5 key={ex.id}>name: {ex.name} level:{ex.level} materials:{ex.material}</h5>
        )
      })
    } */}
    
    <form onSubmit={handleSubmit}>
      <label htmlFor="levels">
        <h3>Choose a level:</h3>
      </label>
      <select name="levels" id="levels" onChange={(e)=>setLevel(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br/>

      <h3>You will be swimming:</h3>
      <div>
        <input type="checkbox" id="freestyle" name="freestyle" value="freestyle" onChange={(e)=>{}}/>
        <label htmlFor="freestyle">Freestyle</label><br/>
        <input type="checkbox" id="backstroke" name="backstroke" value="backstroke" onChange={(e)=>{}}/>
        <label htmlFor="backstroke">Backstroke</label><br/>
        <input type="checkbox" id="breaststroke" name="breaststroke" value="breaststroke" onChange={(e)=>{}}/>
        <label htmlFor="breaststroke">Breaststroke</label><br/>
        <input type="checkbox" id="butterfly" name="butterfly" value="butterfly" onChange={(e)=>{}}/>
        <label htmlFor="butterfly">Butterfly</label><br/>
      </div>

      <h3>You are using:</h3>
      <div>
        <input type="checkbox" id="kickboard" name="kickboard" value="kickboard"/>
        <label htmlFor="kickboard">Kickboard</label><br/>
        <input type="checkbox" id="pullbuoy" name="pullbuoy" value="pullbuoy"/>
        <label htmlFor="pullbuoy">Pull-buoy</label><br/>
        <input type="checkbox" id="fins" name="fins" value="fins"/>
        <label htmlFor="fins">Fins</label><br/>
        <input type="checkbox" id="paddles" name="paddles" value="paddles"/>
        <label htmlFor="paddles">Paddles</label><br/>
        <input type="checkbox" id="snorkel" name="snorkel" value="snorkel"/>
        <label htmlFor="snorkel">Snorkel</label><br/>
      </div>

      <h3>Muscles you want to focus on:</h3>
      <div>
        <input type="checkbox" id="arms" name="arms" value="arms"/>
        <label htmlFor="arms">Arms</label><br/>
        <input type="checkbox" id="pecs" name="pecs" value="pecs"/>
        <label htmlFor="pecs">Pecs</label><br/>
        <input type="checkbox" id="abs" name="abs" value="abs"/>
        <label htmlFor="abs">Abs</label><br/>
        <input type="checkbox" id="back" name="back" value="back"/>
        <label htmlFor="back">Back</label><br/>
        <input type="checkbox" id="legs" name="legs" value="legs"/>
        <label htmlFor="legs">Legs</label><br/>
      </div>

      <input type="submit" value="Submit"/>
    </form>

    <button onClick={filterExercises}>Add</button>
    
    
    
  </div>;
};

export default Input;
