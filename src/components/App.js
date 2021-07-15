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
          <h1>Swimming header with 2 links to articles</h1>
        </header>
        <h1 className="text-4xl text-gray-500 hover:text-gray-600">
          Swimming Training Generator
        </h1>
        <h2 className="p-10 mb-5 text-white rounded-sm bg-opacity-100 bg-blue-600 shadow-xl flex flex-col justify-center items-center divide-y-reverse divide-red-400">
          Set your own options to generate a customised training. You can select
          options such as level, meters you want to swim, pace or materials you
          are using.
        </h2>
        {/* {
        generated
        ? <Training />
        : <Input />
      } */}

        <Input />
        {/* <Training /> */}
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
