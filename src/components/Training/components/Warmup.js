import React from "react";
import { useSelector } from "react-redux";

const Warmup = () => {
  const warmup = useSelector((state) => state.warmup);
  const warmupEach = useSelector((state) => state.sets.warmup.each);
  return (
    <div>
      <h4 className="text-left pl-6">
        <b>Warm up</b>
      </h4>
      <div className="flex flex-col pt-4 space-y-2">
        {warmup.map((ex, i) => {
          return (
            <div className="flex justify-between px-6 " key={ex.id}>
              <h3 className="flex justify-end " style={{ width: "20%" }}>
                {warmupEach[i]}
              </h3>
              <h3 className="text-left " style={{ width: "75%" }}>
                {ex.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Warmup;
