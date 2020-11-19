import React from 'react';

import './Colors.css';
export default {
  title: 'Colors',
  component: null,
};

const Template = () => (
  <div>
    <div className="p2 m1 primary-bg"></div>
    <div className="p2 m1 c2-bg"></div>
    <div className="p2 m1 c3-bg"></div>
    <div className="p2 m1 c4-bg"></div>
    <div className="p2 m1 c5-bg"></div>
    <div className="p2 m1 white-bg"></div>
    <div className="p2 m1 black-bg"></div>
    <div className="p2 m1 g1-bg"></div>
    <div className="p2 m1 g2-bg"></div>
    <div className="p2 m1 g3-bg"></div>
    <div className="p2 m1 g4-bg"></div>
    <div className="p2 m1 g5-bg"></div>
    <div className="p2 m1 g6-bg"></div>
    <div className="p2 m1 g7-bg"></div>
    <div className="p2 m1 accent-bg"></div>
    {/* text */}
    <div className="p2 m1 primary-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 c2-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 c3-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 c4-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 c5-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 white-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 black-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g1-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g2-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g3-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g4-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g5-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g6-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 g7-color">Lorem ipsum dolor sit amet</div>
    <div className="p2 m1 accent-color">Lorem ipsum dolor sit amet</div>
  </div>
);

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
