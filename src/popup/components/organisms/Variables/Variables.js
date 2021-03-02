import React, { useState } from 'react';
import Input from 'atoms/Input/Input';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import { v4 as uuid } from 'uuid';

import './Variables.css';
const Variables = () => {
  const [variables, setVariables] = useState([
    { name: '', value: '', id: uuid() },
  ]);
  const setVariable = (index, toSet) => {
    let variablesCopy = [...variables];
    variablesCopy[index] = Object.assign(variablesCopy[index], toSet);
    if (index === variablesCopy.length - 1 && (!!toSet.name || !!toSet.value)) {
      variablesCopy.push({ name: '', value: '', id: uuid() });
    }
    if (
      !variablesCopy[index].name &&
      !variablesCopy[index].value &&
      variablesCopy.length > 1
    ) {
      variablesCopy.splice(index, 1);
    }
    setVariables(variablesCopy);
  };
  return (
    <div className="p4 wmax">
      <h3>Variables</h3>
      <p className="mb6 mt3">
        You can capture parts of a Requset with regular expressions, and then
        use them as part of a Response. Find out examples and more on the{' '}
        <a href="">documentation</a> page
      </p>
      {variables.map(({ name, value, id }, index) => (
        <div className="ffr mt3 variables__row" key={id}>
          <Input
            label={index === 0 && 'Name'}
            value={name}
            onChange={(newName) => setVariable(index, { name: newName })}
            validate={(value) => value === '' && 'Cannot be empty'}
            className="w100 mr3"
          />
          <Input
            label={index === 0 && 'Regular Expression'}
            value={value}
            onChange={(newValue) => setVariable(index, { value: newValue })}
            validate={(value) => value === '' && 'Cannot be empty'}
            className="w100 regular-expression__input"
          />
        </div>
      ))}
      <div className="button-row mt4">
        <Button
          Icon={Icons.Enable}
          primary
          onClick={() => {
            console.log('TODO: implement me');
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Variables;
