import React from 'react';

import Button from './Button';
import Icons from '../Icons/Icons';
import ConfirmationButton from './ConfirmationButton';
import SuccessButton from './SuccessButton';

export default {
  title: 'Atoms/Button',
  component: Button,
};

const Template = (args) => (
  <div className="p4">
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
    <h3>Success Buttons</h3>
    <div className="my4">
      <SuccessButton {...args} primary Icon={Icons.Enable} onClick={() => true}>
        Primary
      </SuccessButton>
      <SuccessButton
        {...args}
        secondary
        className="mt6"
        Icon={Icons.AddFolder}
        onClick={() => true}
      >
        Secondary
      </SuccessButton>
      <SuccessButton
        {...args}
        tretiary
        className="mt6"
        Icon={Icons.Add}
        onClick={() => true}
      >
        Tretiary
      </SuccessButton>
    </div>
    <h3>Confirmation Buttons</h3>
    <div className="my4">
      <ConfirmationButton
        {...args}
        primary
        Icon={Icons.Enable}
        onClick={() => true}
      >
        Primary
      </ConfirmationButton>
      <ConfirmationButton
        {...args}
        secondary
        className="mt6"
        Icon={Icons.AddFolder}
        onClick={() => true}
      >
        Secondary
      </ConfirmationButton>
      <ConfirmationButton
        {...args}
        tretiary
        className="mt6"
        Icon={Icons.Add}
        onClick={() => true}
      >
        Tretiary
      </ConfirmationButton>
    </div>
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
