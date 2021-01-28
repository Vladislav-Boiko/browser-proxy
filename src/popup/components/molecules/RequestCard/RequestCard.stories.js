import { TYPES } from 'atoms/ResponseType/ResponseType';
import React from 'react';
import RequestCard from './RequestCard';

export default {
  title: 'Molecules/RequestCard',
  component: RequestCard,
};

const Template = (args) => (
  <React.Fragment>
    <RequestCard
      className="my1"
      {...args}
      code={200}
      method="POST"
      responseType={TYPES.JSON}
      url="feature_preview/indicator_check"
    />
    <RequestCard
      className="my1"
      {...args}
      code={500}
      method="GET"
      responseType={TYPES.ARRAY_BUFFER}
      url="user"
    />
    <RequestCard
      className="my1"
      {...args}
      code={404}
      method="DELETE"
      responseType={TYPES.BLOB}
      url="profile"
    />
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
