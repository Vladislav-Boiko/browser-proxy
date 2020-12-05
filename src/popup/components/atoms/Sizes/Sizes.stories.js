import React from 'react';

import './Sizes.css';
export default {
  title: 'Atoms/Sizes',
  component: null,
};

const Template = () => (
  <div className="m2">
    <span className="p1 m1 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p2 m2 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p3 m3 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p4 m4 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p5 m5 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p6 m6 c4-bg" style={{ display: 'inline-block' }}></span>
    <span className="p7 m7 c4-bg" style={{ display: 'inline-block' }}></span>
  </div>
);

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
