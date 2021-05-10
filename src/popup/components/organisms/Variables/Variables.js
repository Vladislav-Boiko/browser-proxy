import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import { v4 as uuid } from 'uuid';

import './Variables.css';
const DEFAULT_VARIABLES = [{ name: '', value: '', id: uuid() }];
const Variables = ({ onVariablesChange, initialVariables }) => {
  const [variables, setVariables] = useState(
    initialVariables?.length ? initialVariables : DEFAULT_VARIABLES,
  );
  useEffect(() => {
    setVariables(
      initialVariables?.length ? initialVariables : DEFAULT_VARIABLES,
    );
  }, [initialVariables]);
  const updateVariables = (newVariables) => {
    setVariables(newVariables);
    onVariablesChange &&
      onVariablesChange(
        // TODO: filter out invalid regexps
        newVariables.filter(({ name, value }) => !!name && !!value),
      );
  };
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
    updateVariables(variablesCopy);
  };
  return (
    <div className="p4 wmax">
      <h3>Variables</h3>
      <p className="mb6 mt3">
        You can capture parts of a Request with regular expressions, and then
        use them as part of a Response. Find out examples and more on the{' '}
        <a href="#">documentation</a> page
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
    </div>
  );
};

export default Variables;
