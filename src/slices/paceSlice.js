import { createSlice } from "@reduxjs/toolkit";

export const paceReducer = createSlice({
  name: "pace",
  initialState: 0,
  reducers: {
    setReduxPace(state, action) {
      const { pace } = action.payload;
      // pace is passed as a string even though when passed it is a number, is there a type cohertion when passing data to redux?
      // console.log(typeof pace, 'type of pace')
      return pace;
    },
  },
});

export const { setReduxPace } = paceReducer.actions;
export default paceReducer.reducer;
