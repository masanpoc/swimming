import {createSlice} from '@reduxjs/toolkit';
import exercisesList from '../lists/exercisesList'; 

export const exercisesReducer = createSlice({
    name: 'exercises',
    initialState: exercisesList,
    reducers: {
        filterNames(state, action) {
            console.log(action);
            const {regex}=action.payload;
            const newState = state.filter(el=>el.includes(regex));
            return newState
        }
    }
})


export const {filterNames} = exercisesReducer.actions;
export default exercisesReducer.reducer