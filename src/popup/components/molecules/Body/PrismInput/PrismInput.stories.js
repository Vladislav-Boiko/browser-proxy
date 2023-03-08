import React, { useState } from 'react';
import PrismInput, { languages } from './PrismInput';

export default {
  title: 'Molecules/ResponseBodies/PrismInput',
  component: PrismInput,
};

const Template = (args) => {
  const [code, setCode] = useState("{ 'a': 'bcd' }");
  return (
    <>
      <PrismInput
        {...args}
        className="m4"
        language={languages.js}
        code={code}
        onChange={setCode}
      />
      <p>plain code is</p>
      {code}
    </>
  );
};

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
