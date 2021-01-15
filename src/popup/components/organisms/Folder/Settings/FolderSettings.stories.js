import React from 'react';

import FolderSettings from './FolderSettings';

export default {
  title: 'Organisms/FolderSettings',
  component: FolderSettings,
};

const Template = (args) => <FolderSettings {...args} />;

export const Story = Template.bind({});
const tree = {
  folderName: 'Folder Name',
};
Story.args = tree;
