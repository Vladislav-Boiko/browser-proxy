import React, { useState } from 'react';
import Input from 'atoms/Input/Input';

import './Variables.css';
const Variables = (props) => {
  const [variables, setVariables] = useState([{ name: '', value: '' }]);
  const setVariable = (index, toSet) => {
    let variablesCopy = [...variables];
    variablesCopy[index] = Object.assign(variablesCopy[index], toSet);
    if (index === variablesCopy.length - 1 && (!!toSet.name || !!toSet.value)) {
      variablesCopy.push({ name: '', value: '' });
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
      <p>lorem ipsum dolor sit amet, consectetur adipiscing</p>
      {variables.map(({ name, value }, index) => (
        <div className="ffr mt3 variables__row" key="index">
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
            className="w100"
          />
        </div>
      ))}
    </div>
  );
};

export default Variables;
