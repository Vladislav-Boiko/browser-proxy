import React from 'react';

import Button from './Button';
import Icons from '../Icons/Icons';

export default {
  title: 'Atoms/Button',
  component: Button,
};

const Template = (args) => (
  <React.Fragment>
    <h3>Regular buttons</h3>
    <div className="my4">
      <Button {...args} primary>
        Primary
      </Button>
      <Button {...args} secondary className="mt6">
        Secondary
      </Button>
      <Button {...args} tretiary className="mt6">
        Tretiary
      </Button>
    </div>
    <h3>Buttons with icons</h3>
    <div className="my4">
      <Button {...args} primary Icon={Icons.Enable}>
        Primary
      </Button>
      <Button {...args} secondary className="mt6" Icon={Icons.AddFolder}>
        Secondary
      </Button>
      <Button {...args} tretiary className="mt6" Icon={Icons.Add}>
        Tretiary
      </Button>
    </div>
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
