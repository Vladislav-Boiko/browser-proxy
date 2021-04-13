import React, { useState } from 'react';

import FileInput from './FileInput';

export default {
  title: 'Atoms/FileInput',
  component: FileInput,
};

const Template = (args) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const onSubmit = (file) => setSelectedFile(file);
  console.log(selectedFile);
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
