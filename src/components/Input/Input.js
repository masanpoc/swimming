import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByLevel,
  filterByStroke,
  filterByMaterial,
  resetList,
} from "../../slices/exercisesSlice";
import { copy_filter_select_warmupExercises } from "../../slices/warmupSlice";
import { copy_filter_select_techniqueExercises } from "../../slices/techniqueSlice";
import { copy_filter_select_mainExercises } from "../../slices/mainSlice";
import { copy_filter_select_cooldownExercises } from "../../slices/cooldownSlice";
import { displayHide } from "../../slices/displaySlice";
import {
  generateMeterBlocks,
  generateMeterExercises,
  generateTechniqueSets,
  generateMainSets,
} from "../../slices/setsSlice";
import { setReduxPace } from "../../slices/paceSlice";
import exercisesList from "../../lists/exercisesList";
import * as _ from "ramda";
import { useSelector } from "react-redux";
import formatPace from "../../functions/formatPace";
import capitalizeFirstLetter from "../../functions/capitalizeFirstLetter";

let inputData = {};

const Input = () => {
  const [strokes, setStrokes] = useState(["freestyle"]);
  const [materials, setMaterials] = useState(["kickboard", "pullbuoy"]);
  const [muscles, setMuscles] = useState([]);
  const dispatch = useDispatch();
  const [level, setLevel] = useState(3);
  const [meters, setMeters] = useState(2200);
  const [pace, setPace] = useState(100);
  const [selected, setSelected] = useState({
    1: false,
    2: false,
    3: true,
    4: false,
    5: false,
  });
  const [showMessage, setShowMessage] = useState(false);
  const display = useSelector((state) => state.display);
  let paceTime = formatPace(pace);

  const listToMap = {
    levels: [1, 2, 3, 4, 5],
    strokes: ["freestyle", "backstroke", "breaststroke", "butterfly"],
    materials: ["kickboard", "pullbuoy", "fins", "paddles", "snorkel"],
    muscles: ["arms", "pecs", "abs", "back", "legs"],
  };

  useEffect(() => {
    paceTime = formatPace(pace);
  }, [pace]);

  useEffect(() => {
    setSelected({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      [level]: true,
    });
    setStrokes(strokes.filter((el) => el != "butterfly"));
  }, [level]);

  function thunkActionCreator() {
    return (dispatch, getState) => {
      // console.log('middleware working')
      // console.log(
      //   getState().exercises,
      //   "before filters",
      //   level,
      //   strokes,
      //   materials,
      //   muscles,
      //   meters,
      //   pace
      // );
      dispatch(generateMeterBlocks({ meters: inputData.meters }));
      dispatch(filterByLevel({ level: inputData.level }));
      dispatch(filterByStroke({ strokesTargeted: inputData.strokes }));
      dispatch(filterByMaterial({ material: inputData.materials }));
      dispatch(setReduxPace({ pace: inputData.pace }));
      let filteredList = getState().exercises;
      // console.log(filteredList, "after filters");
      dispatch(
        copy_filter_select_warmupExercises({
          filteredExercises: filteredList,
          material: inputData.materials,
          muscle: inputData.muscles,
          meters: getState().sets.warmup.total,
          level: inputData.level,
        })
      );
      const warmup = getState().warmup;
      // remove exercises that are already in warmup --> use _.difference function
      filteredList = _.difference(filteredList, warmup);
      // check if we have removed the generated warmup exercises from the list
      // console.log(filteredList);
      dispatch(
        copy_filter_select_techniqueExercises({
          filteredExercises: filteredList,
          material: inputData.materials,
          muscle: inputData.muscles,
          meters: getState().sets.technique.total,
          level: inputData.level,
        })
      );
      const technique = getState().technique;
      // remove exercises that are already in technique --> use _.difference function
      filteredList = _.difference(filteredList, technique);
      dispatch(
        copy_filter_select_mainExercises({
          filteredExercises: filteredList,
          material: inputData.materials,
          muscle: inputData.muscles,
          meters: getState().sets.main.total,
          level: inputData.level,
        })
      );
      const main = getState().main;
      // remove exercises that are already in main --> use _.difference function
      filteredList = _.difference(filteredList, main);
      dispatch(
        copy_filter_select_cooldownExercises({
          filteredExercises: filteredList,
          material: inputData.materials,
          meters: getState().sets.cooldown.total,
          level: inputData.level,
        })
      );
      const cooldown = getState().cooldown;
      // console.log(warmup, 'warmup')
      // console.log(technique, 'technique')
      // console.log(main, 'main')
      // console.log(cooldown, 'cooldown')
      // generate meters for every exercise in every block
      dispatch(
        generateMeterExercises({
          warmupExs: warmup.length,
          techniqueExs: technique.length,
          mainExs: main.length,
          cooldownExs: cooldown.length,
        })
      );
      // generate sets for warmup exercises
      const techniqueEachList = getState().sets.technique.each;
      dispatch(generateTechniqueSets({ eachList: techniqueEachList }));
      // generate sets for main exercises
      const mainEachList = getState().sets.main.each;
      dispatch(generateMainSets({ eachList: mainEachList }));
    };
  }

  function filterExercises() {
    // console.log(inputData);
    // dispatch(calling thunk action creator) in order to dispatch dependent to each other state updates
    dispatch(thunkActionCreator());
  }

  function handleSubmit(e) {
    // alert if any fields are not as expected
    // console.log(e);
    e.preventDefault();
    if (strokes.length < 1) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      dispatch(displayHide({ form: false, training: true, buttons: true }));
      // as it rerenders, we dont want to lose our input data, so we store it outside our component in an object
      inputData.level = level;
      inputData.strokes = strokes;
      inputData.materials = materials;
      inputData.muscles = muscles;
      inputData.meters = meters;
      inputData.pace = pace;
      // console.log(inputData);
      filterExercises();
      executeScroll();
    }
  }

  function executeScroll() {
    const section = document.getElementById("scroll-ref");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function regenerateWorkout() {
    filterExercises();
    executeScroll();
  }

  function resetOptions() {
    resetForm();
    executeScroll();
  }

  function resetForm() {
    // document.getElementById('training-form').reset();
    setLevel(3);
    setMeters(2200);
    setPace(100);
    setStrokes(["freestyle"]);
    setMaterials(["kickboard", "pullbuoy"]);
    setMuscles([]);
    setShowMessage(false);
    dispatch(resetList({ reset: exercisesList }));
    dispatch(displayHide({ form: true, training: false, buttons: false }));
  }

  function handleStrokes(e) {
    if (e.target.checked) {
      setStrokes([...strokes, e.target.value]);
    } else {
      setStrokes(strokes.filter((el) => el != e.target.value));
    }
  }

  function handleMaterials(e) {
    if (e.target.checked) {
      setMaterials([...materials, e.target.value]);
    } else {
      setMaterials(materials.filter((el) => el != e.target.value));
    }
  }

  function handleMuscles(e) {
    if (e.target.checked) {
      setMuscles([...muscles, e.target.value]);
    } else {
      setMuscles(muscles.filter((el) => el != e.target.value));
    }
  }

  return (
    <div className=" mb-32">
      <hr
        className={`h-1 text-dark-grey bg-dark-grey ${
          display.form ? "" : "hidden"
        }`}
      ></hr>
      <h1
        className={`font-bebas pt-12 pb-10 text-left pl-6 text-3xl ${
          display.form ? "" : "hidden"
        }`}
      >
        <u>READY?</u>
      </h1>
      <form
        onSubmit={handleSubmit}
        id="training-form"
        className={`flex px-6  flex-col items-start justify-center space-y-10 ${
          display.form ? "" : "hidden"
        }`}
        role="form"
      >
        <div className="flex flex-col space-y-4 border-2 w-full border-lighter-grey border-opacity-40 py-4 px-4">
          <h3 className="text-left">Your level:</h3>
          <ul className="flex flex-row h-8">
            {listToMap.levels.map((level) => {
              return (
                <li
                  className="relative w-9"
                  style={{ marginRight: "0.05rem" }}
                  key={level + "_level"}
                >
                  <input
                    type="radio"
                    id={level}
                    name="levels"
                    value={level}
                    className="opacity-0"
                    onChange={(e) => setLevel(e.target.value)}
                  />
                  <label
                    htmlFor={level}
                    className={`absolute flex flex-col justify-center inset-0 ${
                      selected[level]
                        ? "bg-blue-ocean text-white"
                        : "bg-light-grey bg-opacity-20"
                    }`}
                  >
                    {level}
                  </label>
                </li>
              );
            })}
          </ul>
          <ul className="list-decimal list-inside flex flex-col gap-4 py-4 text-left">
            <li>I&#39;m still learning how to swim.</li>
            <li>
              I&#39;m able to swim 100m freestyle, backstroke & breaststroke.
            </li>
            <li>I&#39;m able to swim 200m medley.</li>
            <li>I&#39;m able to swim 400m medley.</li>
            <li>I&#39;m able to swim 200m butterfly.</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-16 w-full border-2 border-lighter-grey border-opacity-40 pt-4 pb-5 px-4">
          <h3 className="text-left">Set your meters goal:</h3>
          <div className="relative w-10/12 flex flex-col justify-center">
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={meters}
              id="meterSlider"
              name="meters"
              className="w-full h-2"
              onChange={(e) => setMeters(e.target.value)}
            />
            <output
              htmlFor="meters"
              className={`bg-white shadow-sm border-opacity-40 border-lighter-grey w-3/12 text-sm py-1 rounded-md absolute bottom-5 output-meters`}
              style={{
                borderWidth: "0.5px",
                left: `${_.divide(_.subtract(meters, 407.89), 36.84)}%`,
                transform: "translate(-50%, 0)",
              }}
            >
              {meters} m
            </output>
            {/* {_.divide(_.subtract(meters, 407.89), 36.84)} */}
          </div>
        </div>
        <div className="flex flex-col space-y-16 w-full border-2 border-lighter-grey border-opacity-40 pt-4 pb-5 px-4">
          <h3 className="text-left">Set your 100m freestyle pace:</h3>
          <div className="relative w-8/12 flex flex-col justify-center">
            <input
              type="range"
              min="70"
              max="150"
              step="5"
              value={pace}
              id="paceSlider"
              name="pace"
              className="w-full h-2"
              onChange={(e) => setPace(e.target.value)}
            />
            <output
              htmlFor="pace"
              className={`bg-white shadow-sm border-opacity-40 border-lighter-grey text-sm px-3 py-1 rounded-md absolute bottom-5`}
              style={{
                borderWidth: "0.5px",
                left: `${_.divide(_.subtract(pace, 67.8947), 0.8421)}%`,
                transform: "translate(-50%, 0)",
              }}
            >
              {paceTime}
            </output>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-4 border-2 border-lighter-grey border-opacity-40 py-4 px-4 ">
          <h3 className="text-left ">Strokes for this workout:</h3>
          <ul className="flex flex-col space-y-2 items-start">
            {listToMap.strokes.map((stroke) => {
              if ((level < 3 && stroke != "butterfly") || level >= 3) {
                return (
                  <li
                    className="flex w-full flex-row items-baseline space-x-2 py-1"
                    key={stroke}
                  >
                    <input
                      type="checkbox"
                      id={stroke}
                      name={stroke}
                      value={stroke}
                      style={{ transform: "scale(1.2)" }}
                      checked={strokes.includes(stroke)}
                      onChange={handleStrokes}
                    />
                    <label htmlFor={stroke} className="text-left w-full">
                      {capitalizeFirstLetter(stroke)}
                    </label>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="flex flex-col items-start space-y-4 w-full border-2 border-lighter-grey border-opacity-40 pt-4 pb-6 px-4">
          <h3 className="text-left w-full ">Materials you are using:</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            {listToMap.materials.map((material) => {
              return (
                <li
                  className={`relative rounded-3xl ${
                    materials.includes(material)
                      ? "bg-blue-ocean"
                      : "bg-light-grey bg-opacity-20"
                  }`}
                  key={material}
                >
                  <input
                    type="checkbox"
                    id={material}
                    name={material}
                    value={material}
                    className="opacity-0"
                    checked={materials.includes(material)}
                    onChange={handleMaterials}
                  />
                  <label
                    className={`absolute flex flex-col justify-center text-sm inset-0 text-black ${
                      materials.includes(material) ? "text-white" : ""
                    }`}
                    htmlFor={material}
                  >
                    {capitalizeFirstLetter(material)}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col items-start space-y-5 w-full border-2 border-lighter-grey border-opacity-40 pt-4 pb-6 px-4">
          <h3 className="text-left w-full">Muscles targeted (optional)</h3>
          <ul className="grid grid-cols-toggle w-full h-16 gap-1 ">
            {listToMap.muscles.map((muscle) => {
              return (
                <li
                  className={`relative rounded-3xl ${
                    muscles.includes(muscle)
                      ? "bg-blue-ocean"
                      : "bg-light-grey bg-opacity-20"
                  }`}
                  key={muscle}
                >
                  <input
                    type="checkbox"
                    id={muscle}
                    name={muscle}
                    value={muscle}
                    className="opacity-0"
                    checked={muscles.includes(muscle)}
                    onChange={handleMuscles}
                  />
                  <label
                    htmlFor={muscle}
                    className={`absolute flex flex-col justify-center text-sm inset-0 text-black ${
                      muscles.includes(muscle) ? "text-white" : ""
                    }`}
                  >
                    {capitalizeFirstLetter(muscle)}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <input
          type="submit"
          value="Generate your workout"
          data-testid="submit-button"
          className=" bg-blue-ocean text-lg text-white rounded-md px-3 py-3 w-full"
          style={{ marginTop: "40px" }}
        />
      </form>

      <div className={`${showMessage ? "" : "hidden"}`}>
        <h2 style={{'backgroundColor': '#FFDDDC'}}>Please select at least one stroke</h2>
      </div>

      <div
        className={`${display.buttons ? "" : "hidden"} `}
        data-testid="buttons-wrapper"
      >
        <h1 className="font-bebas pt-4 pb-10 text-left pl-6 text-3xl">
          <u>NOT CONVINCED?</u>
        </h1>
        <div className="flex px-6  flex-col items-start justify-center space-y-14">
          <div className="flex flex-col space-y-6">
            <p className="text-left">
              If you want, you can generate a new workout keeping your
              preferences
            </p>
            <button
              onClick={regenerateWorkout}
              className="bg-blue-ocean text-white  text-lg rounded-md px-3 py-3 w-full"
            >
              Generate your workout again
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <p className="text-left">
              Or maybe you could try a different workout selecting other options
            </p>
            <button
              onClick={resetOptions}
              className="bg-green-herb text-white  text-lg rounded-md px-3 py-3 w-full"
            >
              Reset Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
