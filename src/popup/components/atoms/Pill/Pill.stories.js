import React from 'react';

import Pill from './Pill';

export default {
  title: 'Atoms/Pill',
  component: Pill,
};

const Template = (args) => (
  <div className="m4">
    <Pill className="m2" text={200} />
    <Pill className="m2" text={500} />
    <Pill className="m2" text={404} />
    <Pill className="m2 pill_error" text={'FAILED'} />
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
