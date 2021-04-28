import React from 'react';

import Header from './Header';

export default {
  title: 'Molecules/Header',
  component: Header,
};

const Template = (args) => (
  <div>
    <Header {...args} className="m4" />
    <br />
    <Header
      options={[
        { name: 'requests' },
        { name: 'settings' },
        { name: 'something' },
      ]}
      className="m4"
    />
    <br />
    <Header
      options={[
        { name: 'requests' },
        { name: 'settings' },
        { name: 'something' },
        { name: 'else' },
      ]}
      className="m4"
    />
  </div>
);

export const Story = Template.bind({});
const props = {
  options: [{ name: 'requests' }, { name: 'settings' }],
};
Story.args = props;
