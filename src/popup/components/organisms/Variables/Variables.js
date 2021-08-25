import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import { v4 as uuid } from 'uuid';

import './Variables.css';
const DEFAULT_VARIABLES = () => [{ name: '', value: '', id: uuid() }];
const Variables = ({ onVariablesChange, initialVariables }) => {
  const [variables, setVariables] = useState(
    initialVariables?.length ? initialVariables : DEFAULT_VARIABLES(),
  );
  // We always  want to have an empty line for variables setting at the end
  // in case we don't yet have one.
  useEffect(() => {
    const lastItem = variables && variables[variables.length - 1];
    if (lastItem && (lastItem?.name || lastItem?.value)) {
      setVariables([...variables, DEFAULT_VARIABLES()]);
    }
  }, [variables]);
  const setVariable = (index, toSet) => {
    let variablesCopy = [...variables];
    variablesCopy[index] = Object.assign(variablesCopy[index], toSet);
    variablesCopy = variablesCopy.filter(
      ({ name, value }) => !!name || !!value,
    );
    setVariables(variablesCopy);
    onVariablesChange && onVariablesChange(variablesCopy);
  };
  return (
    <div className="p4 wmax">
      <h3>Variables</h3>
      <p className="mb6 mt3">
        You can capture parts of a Request with regular expressions, and then
        use them as part of a Response. Find out examples and more on the{' '}
        <a
          href="https://github.com/Vladislav-Boiko/browser-proxy#Using-variables-for-RegExp-matching"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>{' '}
        page
      </p>
      {variables.map(({ name, value, id }, index) => (
        <div className="ffr mt3 variables__row" key={id}>
          <Input
            label={index === 0 && 'Name'}
            value={name}
            onChange={(newName) => setVariable(index, { name: newName, value })}
            validate={(value) => value === '' && 'Cannot be empty'}
            className="w100 mr3"
          />
          <Input
            label={index === 0 && 'Regular Expression'}
            value={value}
            onChange={(newValue) =>
              setVariable(index, { name, value: newValue })
            }
            validate={(value) => {
              if (value === '') {
                return 'Cannot be empty';
              }
              try {
                new RegExp(value);
              } catch (e) {
                return 'Shall be a valid regexp';
              }
            }}
            className="w100 regular-expression__input"
          />
        </div>
      ))}
    </div>
  );
};

export default Variables;
