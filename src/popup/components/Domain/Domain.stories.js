import React from 'react';
import Domain from './Domain';

export default {
  title: 'Domain',
  component: Domain,
};

const Template = (args) => <Domain {...args} />;

export const Story = Template.bind({});
const props = {
  enable: () => {},
  domainName: 'Github.com',
};
Story.args = props;
