import {createSlice} from '@reduxjs/toolkit';

export const techniqueReducer = createSlice({
    name: 'technique',
    initialState: [],
    reducers: {
        copy_filter_select_techniqueExercises(state, action) {
            const {filteredExercises}=action.payload;
            return filteredExercises.filter(ex=>ex.block.includes('technique'))
        },
    }
})


export const {copy_filter_select_techniqueExercises} = techniqueReducer.actions;
export default techniqueReducer.reducer