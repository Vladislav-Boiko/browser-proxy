import React from 'react';

import './Text.css';
export default {
  title: 'Atoms/Text',
  component: null,
};

const Template = (args) => (
  <div className="m4">
    <h1 className="my1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
    </h1>
    <h2 className="my1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
    </h2>
    <h3 className="my1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
    </h3>
    <h4 className="my1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
    </h4>
    <p className="paragrap_lg my2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet gravida
      in dictum tincidunt elementum sed. Proin egestas mi nam et. Arcu purus
      viverra accumsan elit. Tempus, consequat tellus et nunc, id. Faucibus quis
      diam sed nunc. Venenatis aliquam et ipsum vitae. Nulla imperdiet purus
      tempor vitae consectetur.
    </p>
    <p className="paragraph_sm my2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet gravida
      in dictum tincidunt elementum sed. Proin egestas mi nam et. Arcu purus
      viverra accumsan elit. Tempus, consequat tellus et nunc, id. Faucibus quis
      diam sed nunc. Venenatis aliquam et ipsum vitae. Nulla imperdiet purus
      tempor vitae consectetur.
    </p>
    <span className="label_strong mr2">Label</span>
    <span className="label_medium mr2">Label</span>
    <span className="label_weak mr2">Label</span>
  </div>
);

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
