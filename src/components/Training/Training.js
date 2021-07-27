import React from "react";
import Warmup from "./components/Warmup";
import Technique from "./components/Technique";
import Main from "./components/Main";
import Cooldown from "./components/Cooldown";
import { useSelector } from "react-redux";

const Training = () => {
  const display = useSelector((state) => state.display); 
  return (
    <div className={`${display.training ? '' : 'hidden'}`} data-testid='training' id='training'>
      <h3>Training</h3>
      <Warmup />
      <Technique />
      <Main />
      <Cooldown />
    </div>
  );
};

export default Training;
