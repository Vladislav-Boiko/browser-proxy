import { TYPES } from 'atoms/ResponseType/ResponseType';
import React from 'react';
import RequestCard from './RequestCard';

export default {
  title: 'Molecules/RequestCard',
  component: RequestCard,
};

const Template = (args) => (
  <div className="m4">
    <RequestCard
      className="my1"
      {...args}
      responseCode={200}
      method="POST"
      responseType={TYPES.JSON}
      url="http://github.com/some/very/long/api/url/feature_preview/indicator_check?a=b&c=d"
    />
    <RequestCard
      className="my1"
      {...args}
      responseCode={500}
      method="GET"
      responseType={TYPES.ARRAY_BUFFER}
      url="user"
    />
    <RequestCard
      className="my1"
      {...args}
      responseCode={404}
      method="DELETE"
      responseType={TYPES.ARRAY_BUFFER}
      url="profile"
    />
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
