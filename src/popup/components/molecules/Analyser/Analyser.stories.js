import React from 'react';

import Analyser from './Analyser';

export default {
  title: 'Molecules/Analyser',
  component: Analyser,
};

const Template = (args) => (
  <div>
    <Analyser {...args} className="m4" />
  </div>
);

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
        isOn: false,
        isUnsaved: false,
        requestHeaders: [{ name: 'Content-Type', value: 'text/plain' }],
        url: 'https://github',
      },
      {
        id: '3',
        name: 'indicator_check',
        type: 'GET',
        url: 'https://github.com',
        isOn: true,
        isUnsaved: true,
        requestHeaders: [{ name: 'Content-Type', value: 'text/plain' }],
      },
      {
        id: '4',
        name: '/filters',
        type: 'DELETE',
        isOn: true,
        isUnsaved: false,
        url: 'https://git$var',
        variables: [
          {
            id: '1381a661-644b-4f4f-b678-c04f090f5d40',
            name: '$var',
            value: '.+',
          },
        ],
      },
      {
        id: '5',
        name: 'user',
        type: 'PUT',
        isOn: false,
        isUnsaved: true,
      },
      {
        id: 'f1',
        name: 'Folder',
        type: 'FOLDER',
        isOn: false,
        isUnsaved: false,
        nodes: [
          {
            id: '6',
            name: 'stats',
            type: 'OPTIONS',
            isOn: true,
            isUnsaved: false,
          },
          {
            id: '7',
            name: 'videoplayback',
            type: 'TRACE',
            isOn: true,
            isUnsaved: false,
          },
          {
            id: '8',
            name: 'notifications',
            type: 'HEAD',
            isOn: true,
            isUnsaved: false,
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

export const Story = Template.bind({});
const props = {
  request: {
    url: 'https://github.com',
    requestHeaders: [{ name: 'Content-Type', value: 'text/plain' }],
  },
  overrides: nodes,
};
Story.args = props;
