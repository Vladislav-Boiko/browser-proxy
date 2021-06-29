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
    <br />
    <span className="mr2">
      {'{ "query": "{\n employee {\n name\n jobTitle\n }\n}\n" }'} -
      {'{ "query": "Somethig else" }'}
    </span>
    <StringDiff
      className="m2"
      right={'{ "query": "{\n employee {\n name\n jobTitle\n }\n}\n" }'}
      left={'{ "query": "Somethig else" }'}
    />
    <br />
    <span className="mr2">
      {'{ "query": "Somethig else" }'} -
      {'{ "query": "{\n employee {\n name\n jobTitle\n }\n}\n" }'}
    </span>
    <StringDiff
      className="m2"
      left={'{ "query": "{\n employee {\n name\n jobTitle\n }\n}\n" }'}
      right={'{ "query": "Somethig else" }'}
    />
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
