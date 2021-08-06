import React from "react";
import { useSelector } from "react-redux";

const Cooldown = () => {
  const cooldown = useSelector((state) => state.cooldown);
  const cooldownEach = useSelector((state) => state.sets.cooldown.each);
  return (
    <div>
      <h4 className="text-left pl-6">
        <b>Cool down</b>
      </h4>
      <div className="flex flex-col pt-4 space-y-2">
        {cooldown.map((ex, i) => {
          return (
            <div className="flex justify-between px-6 " key={ex.id}>
              <h3 className="flex justify-end " style={{ width: "20%" }}>
                {cooldownEach[i]}
              </h3>
              <h3 className="text-left" style={{ width: "75%" }}>
                {ex.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cooldown;
