import React, { useState } from 'react';

import Pagination from './Pagination';

export default {
  title: 'Atoms/Pagination',
  component: Pagination,
};

const Template = () => {
  const [selected, setSelected] = useState(2);
  return (
    <React.Fragment>
      <Pagination
        totalPages={10}
        currentPage={selected}
        onChange={setSelected}
        className="my2"
      />
    </React.Fragment>
  );
};

export const Story = Template.bind({});
const props = {};
Story.args = props;
