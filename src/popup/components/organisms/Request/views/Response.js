import React from 'react';
import Section from 'atoms/Section/Section';
import Body from 'molecules/Body/Body';
import HeadersList from 'molecules/HeadersList/HeadersList';

const Response = ({ ...otherProps }) => {
  return (
    <div className="p4 wmax">
      <Section
        className="mt2"
        header={<h3 className="py1">Response Body</h3>}
        isInitiallyOpen={true}
      >
        <Body className="my3" {...otherProps} />
      </Section>
      <Section
        className="mt6"
        header={<h3 className="py1">Response Headers</h3>}
        isInitiallyOpen={false}
        {...otherProps}
      >
        <HeadersList
          className="my3"
          headers={otherProps.responseHeaders}
          onChange={(responseHeaders) =>
            otherProps.onChange({ responseHeaders })
          }
        />
      </Section>
    </div>
  );
};

export default Response;
