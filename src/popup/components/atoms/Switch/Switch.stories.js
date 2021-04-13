import React from 'react';

import Switch from './Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
};

const Template = (args) => <Switch {...args} className="m4" />;

export const Story = Template.bind({});
const props = {
  initialState: true,
};
Story.args = props;
