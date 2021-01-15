import React from 'react';

import Variables from './Variables';

export default {
  title: 'Organisms/Variables',
  component: Variables,
};

const Template = (args) => (
  <React.Fragment>
    <Variables className="m2" text={200} />
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
