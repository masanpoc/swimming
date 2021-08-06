import React from "react";
import Warmup from "./components/Warmup";
import Technique from "./components/Technique";
import Main from "./components/Main";
import Cooldown from "./components/Cooldown";
import { useSelector } from "react-redux";

const Training = () => {
  const display = useSelector((state) => state.display);
  const total = useSelector((state) => {
    return (
      state.sets.warmup.total +
      state.sets.technique.total +
      state.sets.main.total +
      state.sets.cooldown.total
    );
  });
  return (
    <div
      className={` mb-16 ${display.training ? "" : "hidden"}`}
      data-testid="training"
      id="training"
    >
      <hr className="h-1 text-dark-grey bg-dark-grey"></hr>
      <h1 className="font-bebas pt-12 pb-10 text-left pl-6 text-3xl">
        <u>SWIM WORKOUT</u>
      </h1>
      <div className="flex flex-col space-y-12 pb-6">
        <Warmup />
        <Technique />
        <Main />
        <Cooldown />
        <h2 className="text-left text-lg pl-6 pt-6">
          <b>Total:&nbsp;&nbsp;{total} m</b>
        </h2>
      </div>
      <hr className="h-1 mt-16 text-dark-grey bg-dark-grey"></hr>
    </div>
  );
};

export default Training;
