import React from 'react';

import { SelectedOverride } from './SelectedOverride';

export default {
  title: 'Selected Override',
  component: SelectedOverride,
};

const Template = (args) => <SelectedOverride {...args} />;

export const Story = Template.bind({});
const props = {
  navItem: { id: 'mockId' },
  save: () => {},
  remove: () => {},
  override: {
    method: 'OPTIONS',
    response: { code: 300, type: 'TEXT', value: 'Hello world!' },
  },
};
Story.args = props;
