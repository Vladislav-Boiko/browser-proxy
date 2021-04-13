import React from 'react';
import Section from './Section';

export default {
  title: 'Atoms/Section',
  component: Section,
};

const Template = (args) => (
  <div className="m4">
    <Section
      className="my3"
      header={<h3>Request URL</h3>}
      isInitiallyOpen={true}
    >
      <div className="p1 c5-bg">
        Some text<p>Lorem ipsum dolor sit amet</p>
      </div>
    </Section>
    <Section
      className="my3"
      {...args}
      header={<h4>Request URL</h4>}
      isInitiallyOpen={false}
    >
      <div className="p1 c5-bg">Some text</div>
    </Section>
    <Section
      className="my3"
      {...args}
      header="Request URL"
      isInitiallyOpen={false}
    >
      <div className="p1 c5-bg">Some text</div>
    </Section>
  </div>
);

export const Story = Template.bind({});
const props = {};
Story.args = props;
