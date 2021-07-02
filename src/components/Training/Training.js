import React from "react";
import Warmup from "./components/Warmup";
import Technique from "./components/Technique";
import Main from "./components/Main";
import Cooldown from "./components/Cooldown";

const Training = () => {
  return (
    <div>
      <h3>Training</h3>
      <Warmup />
      <Technique />
      <Main />
      <Cooldown />
    </div>
  );
};

export default Training;
