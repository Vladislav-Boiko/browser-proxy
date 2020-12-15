import React from 'react';

import TreeView from './TreeView';

export default {
  title: 'Organisms/TreeView',
  component: TreeView,
};

const Template = (args) => <TreeView {...args} />;

export const Story = Template.bind({});
const props = {
  nodes: [
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
        },
        {
          id: '3',
          name: 'indicator_check',
          type: 'GET',
          isOn: true,
          isUnsaved: true,
        },
        {
          id: '4',
          name: '/filters',
          type: 'DELETE',
          isOn: true,
          isUnsaved: false,
        },
        {
          id: '5',
          name: 'user',
          type: 'PUT',
          isOn: true,
          isUnsaved: true,
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
  ],
};
Story.args = props;
