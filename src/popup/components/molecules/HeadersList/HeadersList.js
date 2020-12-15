import React, { useState } from 'react';
import cn from 'classnames';
import { evolve, remove } from 'immutableql';
import Input from 'atoms/Input/Input';

import './HeadersList.css';
const HeadersList = ({ headers, onChange, className }) => {
  const [headersValue, setHeadersValue] = useState(headers);
  const [searchValue, setSearchValue] = useState('');
  let headerValuesWithId = headersValue?.map((item, id) => ({ ...item, id }));
  if (headerValuesWithId) {
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
    let updatedHeader = evolve(filteredHeaders, {
      [id]: { name, value, id },
    });
    if (name === '' && value === '') {
      updatedHeader = evolve(filteredHeaders, {
        [id]: remove(),
      }).filter((item) => !!item);
    }
    setHeadersValue(updatedHeader);
    onChange && onChange(updatedHeader);
  };
  const searchRegexp = new RegExp(searchValue);
  const filteredHeaders =
    searchValue !== ''
      ? headerValuesWithId.filter(
          (item) =>
            searchRegexp.test(item.name) || searchRegexp.test(item.value),
        )
      : headerValuesWithId;
  return (
    <div className={cn(className, 'mt3')}>
      <Input
        label="Search"
        value={searchValue}
        onChange={setSearchValue}
        className="headers-list__search"
      />
      <ul>
        {filteredHeaders?.map(({ id, name, value }, index) => (
          <li key={id} className="ffr mt3">
            <Input
              className="mr3 w100"
              label={index === 0 ? 'Name' : ''}
              value={name}
              onChange={(newValue) =>
                updateEntry({ id, name: newValue, value })
              }
            />
            <Input
              className="w100"
              label={index === 0 ? 'Value' : ''}
              value={value}
              onChange={(newValue) =>
                updateEntry({ id, name, value: newValue })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadersList;
