import React, {useState} from "react";
import Input from "./Input/Input";
import Training from "./Training/Training";
import { Provider } from "react-redux";
import store from '../store';

const App = () => {
  // generated will be a state.generate value in Store, not a Hook
  const [generated] = useState(false)

  return (
    <Provider store={store}>
    <div className="p-0 m-0 w-full mb-4 text-center bg-gradient-to-b from-purple-400 to-blue-400">
      app eee
      <h1 className="text-4xl text-gray-500 hover:text-gray-600">
        Swimming Training Generator
      </h1>
      <h2 className="p-10 mb-5 rounded-sm bg-yellow-200 shadow-xl flex flex-col justify-center items-center divide-y-reverse divide-red-400">
        Set your own options to generate a customised training
      </h2>
      <p className="my-3 px-2 mx-2 w-11/12">options</p>
      {
        generated
        ? <Training />
        : <Input />
      }
    </div>
    </Provider>
  );
};

export default App;
