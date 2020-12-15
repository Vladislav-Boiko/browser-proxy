import React from 'react';
import Section from 'atoms/Section/Section';
import Body from 'molecules/Body/Body';
import HeadersList from 'molecules/HeadersList/HeadersList';

const Response = () => {
  return (
    <div className="p4 wmax">
      <Section
        header={<h3 className="py1">Response Body</h3>}
        isInitiallyOpen={true}
      >
        <Body className="my3" />
      </Section>
      <Section
        className="mt6"
        header={<h3 className="py1">Response Headers</h3>}
        isInitiallyOpen={false}
      >
        <HeadersList className="my3" />
      </Section>
    </div>
  );
};

export default Response;
