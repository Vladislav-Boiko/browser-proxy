import React from 'react';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => (
  <div>
    <Button {...args} primary>
      Primary
    </Button>
    <Button {...args} secondary className="ml6">
      Secondary
    </Button>
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
