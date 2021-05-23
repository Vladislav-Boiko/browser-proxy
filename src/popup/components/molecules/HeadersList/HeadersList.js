import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { evolve, remove } from 'immutableql';
import Input from 'atoms/Input/Input';

import './HeadersList.css';

const filterHeaders = (searchValue, headers) => {
  try {
    const searchRegexp = new RegExp(searchValue);
    return searchValue !== ''
      ? headers.filter(
          (item) =>
            searchRegexp.test(item.name) || searchRegexp.test(item.value),
        )
      : headers;
  } catch (e) {
    // handled in validation
  }
  return headers;
};

const isUnsaved = (headers, itemId, value, valueName) => {
  if (headers) {
    const initial = headers[itemId];
    if (initial) {
      return initial[valueName] !== value;
    }
  }
  return true;
};

const HeadersList = ({ headers, onChange, className }) => {
  const [headersValue, setHeadersValue] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    setHeadersValue(headers || []);
  }, [headers]);
  let headerValuesWithId = headersValue?.map((item, id) => ({ ...item, id }));
  if (headerValuesWithId && headerValuesWithId.length) {
    const lastElement = headerValuesWithId[headerValuesWithId.length - 1];
    if (lastElement?.name || lastElement?.value) {
      headerValuesWithId.push({
        name: '',
        value: '',
        id: headerValuesWithId.length,
      });
    }
  } else {
    headerValuesWithId = [
      {
        name: '',
        value: '',
        id: 0,
      },
    ];
  }

  const updateEntry = ({ name, value, id }) => {
    let updatedHeader = evolve(headersValue, {
      [id]: { name, value, id },
    });
    if (name === '' && value === '') {
      updatedHeader = evolve(headersValue, {
        [id]: remove(),
      }).filter((item) => !!item);
    }
    setHeadersValue(updatedHeader);
    onChange && onChange(updatedHeader);
  };
  const filteredHeaders = filterHeaders(searchValue, headerValuesWithId);
  return (
    <div className={cn(className, 'mt3')}>
      <Input
        label="Search"
        value={searchValue}
        onChange={setSearchValue}
        className="headers-list__search"
        validate={() => {
          try {
            new RegExp(searchValue);
          } catch (e) {
            return 'Is not a valid regexp';
          }
          return null;
        }}
      />
      <ul>
        {!filteredHeaders.length && headerValuesWithId.length && (
          <h4 className="my1 g2-color">No headers found</h4>
        )}
        {filteredHeaders?.map(({ id, name, value }, index) => (
          <li key={id} className="ffr mt3">
            <Input
              className="mr3 w100 header__input_name"
              label={index === 0 ? 'Name' : ''}
              value={name}
              onChange={(newValue) =>
                updateEntry({ id, name: newValue, value })
              }
              isUnsaved={
                isUnsaved(headers, id, name, 'name') &&
                (name !== '' || value !== '')
              }
            />
            <Input
              className="w100"
              label={index === 0 ? 'Value' : ''}
              value={value}
              onChange={(newValue) =>
                updateEntry({ id, name, value: newValue })
              }
              isUnsaved={
                isUnsaved(headers, id, value, 'value') &&
                (name !== '' || value !== '')
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadersList;
