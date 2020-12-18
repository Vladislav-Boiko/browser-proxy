import React from 'react';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import bootstrap from './bootstrap.js';
import Router from 'templates/Router/Router.container';

function App() {
  bootstrap();
  return (
    <Provider store={store}>
      <Router />
      {/* {!chrome.devtools && <Footer className="app-footer" />} */}
    </Provider>
  );
}

export default App;
