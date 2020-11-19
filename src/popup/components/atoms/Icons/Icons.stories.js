import React from 'react';
import Icons from './Icons';

export default {
  title: 'Icons',
  component: Icons,
};

const Template = () => (
  <div>
    <h4 className="my1">Small</h4>
    <Icons.Cross className="icon_sm ml1" />
    <Icons.Watch className="icon_sm ml1" />
    <h4 className="my2">Medium</h4>
    <Icons.Cross className="icon_md ml1" />
    <Icons.Watch className="icon_md ml1" />
    <h4 className="my2">Large</h4>
    <Icons.Cross className="icon_lg ml1" />
    <Icons.Watch className="icon_lg ml1" />
  </div>
);

export const Story = Template.bind({});
const tree = {
  value: 'Connection',
  label: 'Search',
};
Story.args = tree;
