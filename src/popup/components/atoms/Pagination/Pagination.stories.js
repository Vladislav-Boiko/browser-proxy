import React, { useState } from 'react';

import Pagination from './Pagination';

export default {
  title: 'Atoms/Pagination',
  component: Pagination,
};

const Template = () => {
  const [selected, setSelected] = useState(2);
  return (
    <div className="m4">
      <Pagination
        totalPages={10}
        currentPage={selected}
        onChange={setSelected}
        className="my2"
      />
    </div>
  );
};

export const Story = Template.bind({});
const props = {};
Story.args = props;
