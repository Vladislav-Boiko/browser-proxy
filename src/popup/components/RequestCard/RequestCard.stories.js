import React from 'react';
import RequestCard from './RequestCard';

export default {
  title: 'RequestCard',
  component: RequestCard,
};

const Template = (args) => (
  <React.Fragment>
    <RequestCard
      className="my1"
      {...args}
      code={200}
      method="POST"
      responseType="JSON"
      url="feature_preview/indicator_check"
    />
    <RequestCard
      className="my1"
      {...args}
      code={500}
      method="GET"
      responseType="ArrayBuffer"
      url="user"
    />
    <RequestCard
      className="my1"
      {...args}
      code={404}
      method="DELETE"
      responseType="BLOB"
      url="profile"
    />
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
