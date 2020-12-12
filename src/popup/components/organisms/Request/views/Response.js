import React, { useState } from 'react';
import Section from 'atoms/Section/Section';
import ResponseBody from 'molecules/ResponseBody/ResponseBody';
import HeadersList from 'molecules/HeadersList/HeadersList';

const Response = (props) => {
  return (
    <div className="p4">
      <Section
        header={<h3 className="py1">Response Body</h3>}
        isInitiallyOpen={true}
      >
        <ResponseBody className="my3" />
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
