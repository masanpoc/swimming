import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./slices/exercisesSlice";
import warmupReducer from "./slices/warmupSlice";
import mainReducer from "./slices/mainSlice";
import techniqueReducer from "./slices/techniqueSlice";
import cooldownReducer from "./slices/cooldownSlice";
import trainingReducer from "./slices/trainingSlice";

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    warmup: warmupReducer,
    main: mainReducer,
    technique: techniqueReducer,
    cooldown: cooldownReducer,
    training: trainingReducer,
  },
});
