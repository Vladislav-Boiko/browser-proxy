import React from 'react';

import StringDiff from './StringDiff';

export default {
  title: 'Atoms/StringDiff',
  component: StringDiff,
};

const Template = (args) => (
  <div className="m4">
    <span className="mr2">ABCDEF - A.C.E.</span>
    <StringDiff className="m2" left="ABCDEF" right="A.C.E." />
    <br />
    <span className="mr2">A.C.E. - ABCDEF</span>
    <StringDiff className="m2" right="ABCDEF" left="A.C.E." />
    <br />
    <span className="mr2">GET - </span>
    <StringDiff className="m2" left="GET" right="" />
    <br />
    <span className="mr2"> - GET</span>
    <StringDiff className="m2" left="" right="GET" />
    <br />
    <span className="mr2">ABCGETDEF - GET</span>
    <StringDiff className="m2" left="ABCGETDEF" right="GET" />
    <br />
    <span className="mr2">GET - ABCGETDEF</span>
    <StringDiff className="m2" right="ABCGETDEF" left="GET" />
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
