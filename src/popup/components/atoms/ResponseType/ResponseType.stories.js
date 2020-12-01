import React from 'react';

import ResponseType, { TYPES } from './ResponseType';

export default {
  title: 'ResponseType',
  component: ResponseType,
};

const Template = (args) => (
  <React.Fragment>
    <ResponseType className="my1 mx1" type={TYPES.JSON} />
    <ResponseType className="my1 mx1" type={TYPES.BLOB} />
    <ResponseType className="my1 mx1" type={TYPES.ARRAY_BUFFER} />
    <ResponseType className="my1 mx1" type={TYPES.DOCUMENT} />
    <ResponseType className="my1 mx1" type={TYPES.TEXT} />
  </React.Fragment>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
