import React from "react";
//import logo from './logo.svg';
import "./index.css";
import "./App.css";
import "./communication/withPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Requests from "./components/Reqeusts/Requests";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        {/* TODO: menu */}
        <h2>Requests</h2>
        <Requests />
      </div>
    </Provider>
  );
}

export default App;
