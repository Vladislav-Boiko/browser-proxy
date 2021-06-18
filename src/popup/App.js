import React, { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import bootstrap from './bootstrap.js';
import Router from 'templates/Router/Router.container';
import cn from 'classnames';

const browser = window.browser || window.chrome;

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      await bootstrap();
      setLoading(false);
    };
    load();
  }, []);
  return (
    <Provider store={store}>
      <div
        className={cn('app-container', {
          popup: !browser.devtools,
        })}
      >
        {!loading ? <Router /> : ''}
      </div>
      {/* {!browser.devtools && <Footer className="app-footer" />} */}
    </Provider>
  );
}

export default App;
