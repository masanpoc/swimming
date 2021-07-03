import {createSlice} from '@reduxjs/toolkit';

export const cooldownReducer = createSlice({
    name: 'cooldown',
    initialState: [],
    reducers: {
        copy_filter_select_cooldownExercises(state, action) {
            const {filteredExercises}=action.payload;
            return filteredExercises.filter(ex=>ex.block.includes('cooldown'))
        },
    }
})


export const {copy_filter_select_cooldownExercises} = cooldownReducer.actions;
export default cooldownReducer.reducer