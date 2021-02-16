import React, { useState } from 'react';

import Tabs from './Tabs';

export default {
  title: 'Atoms/Tabs',
  component: Tabs,
};

const Template = (args) => {
  const [selected, setSelected] = useState(1);
  return (
    <React.Fragment>
      <Tabs
        onSelect={setSelected}
        className="m2"
        tabs={[
          { name: 'Response', id: 1 },
          { name: 'Request', id: 2 },
        ]}
        selectedTab={selected}
      />
    </React.Fragment>
  );
};

export const Story = Template.bind({});
const props = {};
Story.args = props;
