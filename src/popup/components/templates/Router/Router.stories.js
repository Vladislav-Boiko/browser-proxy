import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'store/reducer';
import Router from './Router.container';

export default {
  title: 'Templates/Router',
  component: Router,
};

const nodes = [
  {
    id: '1',
    name: 'Github.com',
    type: 'DOMAIN',
    isOn: true,
    isUnsaved: false,
    nodes: [
      {
        id: '2',
        name: 'personal data',
        type: 'POST',
        isOn: true,
        isUnsaved: false,
        responseType: 'TEXT',
        responseCode: '201',
        responseBody: [{ value: 'test value', delay: '300ms' }],
        url: 'https://github.com',
      },
      {
        id: '3',
        name: 'indicator_check',
        type: 'GET',
        isOn: true,
        isUnsaved: true,
        responseType: 'JSON',
        responseCode: '200',
        responseBody: [{ value: 'value', delay: '100ms' }],
        url: 'http://localhost:9000',
      },
      {
        id: '4',
        name: '/filters',
        type: 'DELETE',
        isOn: true,
        isUnsaved: false,
        responseType: 'JSON',
        responseCode: '200',
        responseBody: [{ value: 'value', delay: '100ms' }],
        url: 'http://localhost:9000',
      },
      {
        id: '5',
        name: 'user',
        type: 'PUT',
        isOn: true,
        isUnsaved: true,
        responseType: 'JSON',
        responseCode: '200',
        responseBody: [{ value: 'value', delay: '100ms' }],
        url: 'http://localhost:9000',
      },
      {
        id: 'f1',
        name: 'Folder',
        type: 'FOLDER',
        isOn: true,
        isUnsaved: false,
        nodes: [
          {
            id: '6',
            name: 'stats',
            type: 'OPTIONS',
            isOn: true,
            isUnsaved: false,
            responseType: 'JSON',
            responseCode: '200',
            responseBody: [{ value: 'value', delay: '100ms' }],
            url: 'http://localhost:9000',
          },
          {
            id: '7',
            name: 'videoplayback',
            type: 'TRACE',
            isOn: true,
            isUnsaved: false,
            responseType: 'JSON',
            responseCode: '200',
            responseBody: [{ value: 'value', delay: '100ms' }],
            url: 'http://localhost:9000',
          },
          {
            id: '8',
            name: 'notifications',
            type: 'HEAD',
            isOn: true,
            isUnsaved: false,
            responseType: 'JSON',
            responseCode: '200',
            responseBody: [{ value: 'value', delay: '100ms' }],
            url: 'http://localhost:9000',
          },
        ],
      },
    ],
  },
  {
    id: 'd2',
    name: 'Google.com',
    type: 'DOMAIN',
    isOn: true,
    isUnsaved: false,
  },
  {
    id: 'd3',
    name: 'localhost:9000',
    type: 'DOMAIN',
    isOn: true,
    isUnsaved: false,
  },
];

const store = createStore(rootReducer, { nodes });
const Template = (args) => (
  <Provider store={store}>
    <Router {...args} />
  </Provider>
);

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
