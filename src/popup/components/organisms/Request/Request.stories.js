import React from 'react';
import Request from './Request';

export default {
  title: 'Organisms/Request',
  component: Request,
};

const Template = (args) => <Request {...args} />;

export const Story = Template.bind({});
const props = {
  isOn: true,
};
Story.args = props;
