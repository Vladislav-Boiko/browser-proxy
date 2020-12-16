import React from 'react';
import Domain from './Domain';
import EnabledDomain from './views/EnabledDomain';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'store/reducer';

export default {
  title: 'Organisms/Domain',
  component: Domain,
};

const store = createStore(rootReducer);
const Template = (args) => (
  <Provider store={store}>
    <Domain {...args} />
  </Provider>
);

export const Disabled = Template.bind({});
const props = {
  enable: () => {},
  domainName: 'Github.com',
};
Disabled.args = props;

const EnabledTemplate = (args) => (
  <Provider store={store}>
    <EnabledDomain {...args} />
  </Provider>
);

export const Enabled = EnabledTemplate.bind({});
Enabled.args = {
  requests: [
    {
      method: 'GET',
      url: 'http://yandex.ru',
      code: '200',
      responseType: 'JSON',
    },
    {
      method: 'POST',
      url: 'http://google.com',
      code: '200',
      responseType: 'BLOB',
    },
  ],
};
