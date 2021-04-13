import React from 'react';

import ResponseType, { TYPES } from './ResponseType';

export default {
  title: 'Atoms/ResponseType',
  component: ResponseType,
};

const Template = (args) => (
  <div className="m4">
    <ResponseType className="my1 mx1" type={TYPES.JSON} />
    <ResponseType className="my1 mx1" type={TYPES.BLOB} />
    <ResponseType className="my1 mx1" type={TYPES.ARRAY_BUFFER} />
    <ResponseType className="my1 mx1" type={TYPES.DOCUMENT} />
    <ResponseType className="my1 mx1" type={TYPES.TEXT} />
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
