import React from 'react';

import { StandaloneOverride } from './StandaloneOverride';

export default {
  title: 'Standalone Override',
  component: StandaloneOverride,
};

const Template = (args) => <StandaloneOverride {...args} />;

export const Story = Template.bind({});
const props = { domain: 'test', save: () => {} };
Story.args = props;
