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
      <div className="App">
        <h1>Browser Proxy!</h1>
        <Requests />
      </div>
    </Provider>
  );
}

export default App;
