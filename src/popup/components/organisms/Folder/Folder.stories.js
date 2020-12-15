import React from 'react';

import Folder from './Folder';

export default {
  title: 'Organisms/Folder',
  component: Folder,
};

const Template = (args) => <Folder {...args} />;

export const Story = Template.bind({});
const tree = {
  folderName: 'Folder Name',
};
Story.args = tree;
