import React, { useState } from 'react';

import Tabs from './Tabs';

export default {
  title: 'Atoms/Tabs',
  component: Tabs,
};

const Template = (args) => {
  const [selected, setSelected] = useState(1);
  return (
    <div className="m4">
      <Tabs
        onSelect={setSelected}
        tabs={[
          { name: 'Response', id: 1 },
          { name: 'Request', id: 2 },
        ]}
        selectedTab={selected}
      />
    </div>
  );
};

export const Story = Template.bind({});
const props = {};
Story.args = props;
