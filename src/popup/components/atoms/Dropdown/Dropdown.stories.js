import React from 'react';
import Dropdown from './Dropdown';
import ResponseType from '../ResponseType/ResponseType';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} className="m4" />;

export const Story = Template.bind({});
const props = {
  label: 'Type',
  initialState: 'GET',
  options: [
    { name: 'GET', value: 'GET' },
    { name: 'POST', value: 'POST' },
    {
      name: 'JSON',
      value: 'JSON',
      view: <ResponseType type="JSON" />,
    },
  ],
};
Story.args = props;
