import {createSlice} from '@reduxjs/toolkit';

export const mainReducer = createSlice({
    name: 'main',
    initialState: [],
    reducers: {
        copy_filter_select_mainExercises(state, action) {
            const {filteredExercises}=action.payload;
            return filteredExercises.filter(ex=>ex.block.includes('main'))
        },
    }
})


export const {copy_filter_select_mainExercises} = mainReducer.actions;
export default mainReducer.reducer