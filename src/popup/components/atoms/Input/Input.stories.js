import React, { useState } from 'react';
import Input from './Input';
import DelayInput from './DelayInput';

export default {
  title: 'Atoms/Input',
  component: Input,
};

const Template = () => {
  const [valueInput, setValueInput] = useState('Connection');
  const [valueInvalid, setValueInvalid] = useState('Github.com');
  const [valueMultiline, setValueMultiline] = useState('{\n\n}');
  const [valueDelay, setValueDelay] = useState('200ms');
  return (
    <div className="m4">
      <Input
        onChange={setValueInput}
        value={valueInput}
        className="my2"
        label="Regular input"
      />
      <Input
        onChange={setValueInput}
        value={valueInput}
        className="my2"
        label="Unsaved input"
        isUnsaved={true}
        reset={() => setValueInput('')}
      />
      <Input
        onChange={setValueInput}
        value={valueInput}
        className="my2"
        isUnsaved={true}
      />
      <Input
        onChange={setValueInvalid}
        label="Invalid input"
        value={valueInvalid}
        validate={() => 'Cannot be empty'}
        className="my2"
      />
      <Input
        onChange={setValueMultiline}
        value={valueMultiline}
        className="my2"
        multiline
      />
      <Input
        onChange={setValueMultiline}
        value={valueMultiline}
        className="my2"
        multiline
        isUnsaved={true}
      />
      <DelayInput
        className="my2"
        label="Delay"
        value={valueDelay}
        onChange={setValueDelay}
      />
    </div>
  );
};

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
