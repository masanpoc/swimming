import React, {useState, useEffect} from "react";

import Wrapper from "./Wrapper";
import { Provider } from "react-redux";
import store from "../store";

const App = () => {
  // generated will be a state.generate value in Store, not a Hook
  // const [generated] = useState(false)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{setLoading(false)}, 1000);
  }, [])
  return (loading ? (null) : (
    <Provider store={store}>
      <div className="p-0 m-0 w-full text-center ">
        <header>
          <h1 className="font-bebas text-left px-6 text-3xl h-20 flex flex-col justify-center">
            SWIMMING WORKOUT GENERATOR
          </h1>
          <hr className="h-1 text-dark-grey bg-dark-grey"></hr>
        </header>
        <div className="mt-6 mb-10 flex-col flex gap-4">
          <div className="py-4 flex flex-col gap-5 text-left px-6">
            <p>Welcome to my swim app!</p>
            <p>
              My name is Mario, I&#39;m a swimmer and I have created this{" "}
              <b>app that generates swimming workouts</b> for you.
            </p>
          </div>
          <div className="py-4 flex flex-col gap-7  text-left px-6">
            <h3>
              <u>How does it work?</u>
            </h3>
            <ol className="list-decimal list-inside flex flex-col gap-5">
              <li>
                <b>Fill the form with your training options</b> (distance, pace,
                equipment...).
              </li>
              <li>
                <b>Drills are selected</b> based on your options.{" "}
                <b>Swimming sets are generated</b> for each block.
              </li>
              <li>
                <b>You have your custom workout!</b>
              </li>
            </ol>
          </div>
        </div>
        <Wrapper />

        <footer>
          <hr className="h-1 text-dark-grey bg-dark-grey"></hr>
          <div className="flex w-full h-32 items-center">
            <h2 className="font-play w-6/12 text-left px-6">
              <u>
                <a
                  href="https://github.com/masanpoc/swimming"
                  rel="noreferrer"
                  target="_blank"
                >
                  Github repo
                </a>
              </u>
            </h2>
            <div className="flex items-center w-6/12 justify-center gap-2">
              <h2 className="font-play ">Contact:</h2>
              <div className="flex gap-1">
                <svg
                  style={{ width: "30px", height: "30px" }}
                  viewBox="0 0 24 24"
                >
                  <a
                    href="mailto:marioscp1998@outlook.es"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <path
                      fill="currentColor"
                      d="M13 17H17V14L22 18.5L17 23V20H13V17M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H11.35A5.8 5.8 0 0 1 11 18A6 6 0 0 1 22 14.69V6A2 2 0 0 0 20 4M20 8L12 13L4 8V6L12 11L20 6Z"
                    />
                  </a>
                </svg>
                <svg
                  style={{ width: "30px", height: "30px" }}
                  viewBox="0 0 24 24"
                >
                  <a
                    href="https://www.linkedin.com/in/mario-cirer/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <path
                      fill="currentColor"
                      d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
                    />
                  </a>
                </svg>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  ));
};

export default App;
