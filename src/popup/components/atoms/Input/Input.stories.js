import React, { useState } from 'react';
import Input from './Input';
import DelayInput from './DelayInput';

export default {
  title: 'Input',
  component: Input,
};

const Template = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <div>
      <Input {...args} onChange={setValue} value={value} className="my2" />
      <Input
        {...args}
        onChange={setValue}
        value={value}
        validationError="Cannot be empty"
        className="my2"
      />
      <DelayInput className="my2" {...args} label="Delay" value="200ms" />
    </div>
  );
};

export const Story = Template.bind({});
const tree = {
  value: 'Connection',
  label: 'Search',
};
Story.args = tree;
