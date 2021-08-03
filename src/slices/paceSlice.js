import { createSlice } from "@reduxjs/toolkit";

export const paceReducer = createSlice({
    name: 'pace',
    initialState: 0,
    reducers: {
        setReduxPace(state, action) {
            const {pace} = action.payload;
            return pace
        }
    }
})

export const { setReduxPace } = paceReducer.actions
export default paceReducer.reducer