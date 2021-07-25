import { createSlice } from "@reduxjs/toolkit";
import * as _ from "ramda";

export const displayReducer = createSlice({
    name: "display",
    initialState: {
        form: true,
        training: false,
        buttons: false
    },
    reducers: {
        displayHide(state, action) {
            const partsToDisplayHide = action.payload;
            let newState = state;
            newState = _.mergeRight(newState, partsToDisplayHide);
            console.log(newState)
            return newState
        }
    }
})

export const { displayHide } = displayReducer.actions;
export default displayReducer.reducer;