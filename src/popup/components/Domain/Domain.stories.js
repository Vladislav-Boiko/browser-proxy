import React from 'react';
import Domain from './Domain';
import EnabledDomain from './views/EnabledDomain';

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

const EnabledTemplate = (args) => <EnabledDomain {...args} />;

export const Enabled = EnabledTemplate.bind({});
Enabled.args = {
  requests: [
    {
      method: 'GET',
      url: 'http://yandex.ru',
      code: '200',
      responseType: 'JSON',
    },
    {
      method: 'POST',
      url: 'http://google.com',
      code: '200',
      responseType: 'BLOB',
    },
  ],
};
