import React from 'react';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import bootstrap from './bootstrap.js';
import Router from 'templates/Router/Router.container';
import cn from 'classnames';

function App() {
  bootstrap();
  const browser = window.browser || window.chrome;
  return (
    <Provider store={store}>
      <div
        className={cn({
          popup: !browser.devtools,
        })}
      >
        <Router />
      </div>
      {/* {!browser.devtools && <Footer className="app-footer" />} */}
    </Provider>
  );
}

export default App;
