import React from 'react';

import ChunkedInput from './ChunkedInput';

export default {
  title: 'Molecules/ChunkedInput',
  component: ChunkedInput,
};

const Template = (args) => <ChunkedInput {...args} className="m4" />;

export const Story = Template.bind({});
const tree = {
  body: [''],
};
Story.args = tree;
