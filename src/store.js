import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./slices/exercisesSlice";
import warmupReducer from "./slices/warmupSlice";
import mainReducer from "./slices/mainSlice";
import techniqueReducer from "./slices/techniqueSlice";
import cooldownReducer from "./slices/cooldownSlice";
import displayReducer from "./slices/displaySlice";
import setsReducer from "./slices/setsSlice";
import paceReducer from "./slices/paceSlice";

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    warmup: warmupReducer,
    main: mainReducer,
    technique: techniqueReducer,
    cooldown: cooldownReducer,
    display: displayReducer,
    sets: setsReducer,
    pace: paceReducer,
  },
});
