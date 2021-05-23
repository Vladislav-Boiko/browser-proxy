import React from 'react';

import FileInput from './FileInput';

export default {
  title: 'Atoms/FileInput',
  component: FileInput,
};

const Template = (args) => {
  const onSubmit = () => {};
  return (
    <div className="m4">
      <h3>File Inputs</h3>
      <div className="my4">
        <FileInput {...args} secondary onSubmit={onSubmit}>
          Secondary
        </FileInput>
        <FileInput {...args} tretiary className="ml6" onSubmit={onSubmit}>
          Tretiary
        </FileInput>
      </div>
    </div>
  );
};

export const Story = Template.bind({});
const props = {};
Story.args = props;
