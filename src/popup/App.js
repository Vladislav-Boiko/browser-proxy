import React from "react";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainSection from "./components/MainSection/MainSection";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import bootstrap from "./bootstrap.js";

function App() {
  bootstrap();
  return (
    <Provider store={store}>
      <div className="app">
        <Navigation className="app-navigation" />
        <main className="app-main">
          <MainSection />
        </main>
        {!chrome.devtools && <Footer className="app-footer" />}
      </div>
    </Provider>
  );
}

export default App;
