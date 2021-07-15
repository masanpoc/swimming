import { createSlice } from "@reduxjs/toolkit";
import exercisesList from "../lists/exercisesList";
import * as _ from "ramda";

export const exercisesReducer = createSlice({
  name: "exercises",
  initialState: exercisesList,
  reducers: {
    filterByLevel(state, action) {
      const { level } = action.payload;
      return state.filter((ex) => ex.level <= level);
    },
    filterByStroke(state, action) {
      const { strokesTargeted } = action.payload;
      if (strokesTargeted.length == 4) {
        return state;
      } else {
        let newState = state.slice();
        newState = newState.filter((ex) => !ex.stroke.includes("all"));
        // the strokes that we have to remove
        let strokesToRemove = [
          "freestyle",
          "backstroke",
          "breaststroke",
          "butterfly",
        ];
        // considering the targets
        strokesToRemove = _.difference(strokesToRemove, strokesTargeted);

        // remove exercises that includes any strokestoremove
        strokesToRemove.forEach((strokeToRemove) => {
          newState = newState.filter(
            (ex) => !ex.stroke.includes(strokeToRemove)
          );
        });

        return newState;
      }
    },
    filterByMaterial(state, action) {
      const { material } = action.payload;
      if (material.length == 5) {
        return state;
      } else {
        let newState = state.slice();
        let materialsNotUsed = [
          "kickboard",
          "fins",
          "paddles",
          "snorkel",
          "pullbuoy",
        ];
        materialsNotUsed = _.difference(materialsNotUsed, material);

        materialsNotUsed.forEach((materialNotUsed) => {
          newState = newState.filter(
            (ex) => !ex.material.includes(materialNotUsed)
          );
        });
        return newState;
      }
    },
    resetList(state, action) {
      const { reset } = action.payload;
      let newState = state.slice();
      newState = _.union(newState, reset);
      console.log(newState, "reset");
      return newState;
    },
  },
});

export const { filterByLevel, filterByStroke, filterByMaterial, resetList } =
  exercisesReducer.actions;
export default exercisesReducer.reducer;
