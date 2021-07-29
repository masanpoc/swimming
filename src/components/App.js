import React, { useState } from "react";
import Input from "./Input/Input";
import Training from "./Training/Training";
import { Provider } from "react-redux";
import store from "../store";

const App = () => {
  // generated will be a state.generate value in Store, not a Hook
  // const [generated] = useState(false)

  return (
    <Provider store={store}>
      <div className="p-0 m-0 w-full mb-4 text-center ">
        <header>
          <h1>SWIMMING WORKOUT GENERATOR</h1>
        </header>
        <div>
          <div>
            <p>
            Welcome to my swim app!
            </p>
            <p>
            My name is Mario, I&#39;m a swimmer and I have created this <b>app that generates swimming workouts</b> for you. 
            </p>
          </div>
          <div>
            <h3>
              <i><u>How does it work?</u></i>
            </h3>
            <ol type='1'>
              <li><b>Fill the form with your training options</b> (distance, pace, equipment...)</li>
              <li><b>Drills are selected</b> based on your options. <b>Swimming sets are generated</b> for each block.</li>
              <li><b>You have your custom workout!</b></li>
            </ol>
          </div>
        </div>

        <Input />
        <Training />

        <footer>
          <h1>
            Swimming footer with links to gh, lnkdn, complete list of exercises
          </h1>
        </footer>
      </div>
    </Provider>
  );
};

export default App;
