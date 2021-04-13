import React from 'react';

import Header from './Header';

export default {
  title: 'Molecules/Header',
  component: Header,
};

const Template = (args) => <Header {...args} className="m4" />;

export const Story = Template.bind({});
const props = {
  options: [{ name: 'requests' }, { name: 'settings' }],
};
Story.args = props;
