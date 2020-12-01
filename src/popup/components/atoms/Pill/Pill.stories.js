import React from 'react';

import Pill from './Pill';

export default {
  title: 'Pill',
  component: Pill,
};

const Template = (args) => (
  <React.Fragment>
    <Pill className="m2" text={200} />
    <Pill className="m2" text={500} />
    <Pill className="m2" text={404} />
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
