import React from 'react';
import cn from 'classnames';
import Section from 'atoms/Section/Section';
import Pill from 'atoms/Pill/Pill';
import StringDiff from 'atoms/StringDiff/StringDiff';
import './AnalyserNode.css';

const IconForPill = ({ isOpen }) => (
  <span className="label_strong primary-color mr1">{isOpen ? '-' : '+'}</span>
);

const AnalyserSection = ({ name, matches }) => (
  <Section
    key={name}
    className="my3"
    header={
      <Pill
        text={name}
        className={cn({
          pill_error: !!matches?.find(({ isMatch }) => !isMatch),
        })}
      />
    }
    isInitiallyOpen={true}
    Icon={IconForPill}
  >
    {matches?.map(({ request, override, isMatch, variable }) => (
      <div
        className={cn('analyser-node__row mt1 label_medium', {
          'accent-color': !isMatch && variable,
        })}
      >
        <span className={cn({ label_strong: !!variable, ml2: !!variable })}>
          {variable ? <span className="c2-color">{`/${variable}/`}</span> : ''}
        </span>
        {!variable && (
          <>
            <div>
              <StringDiff left={request} right={override} />
            </div>
            <div>
              <StringDiff left={override} right={request} />
            </div>
          </>
        )}
        {variable && (
          <>
            <div>
              <StringDiff left={request} right={isMatch ? request : ''} />
            </div>
            <span
              className={cn({
                label_weak: !variable,
                label_strong: !!variable,
                'c2-color': !!variable,
              })}
            >
              {override}
            </span>
          </>
        )}
      </div>
    ))}
  </Section>
);

const AnalyserNode = ({ name, url, method, headers, body }) => {
  const noMatch = [url, method, headers, body]
    .filter((matches) => matches)
    .map((matches) => matches?.find((match) => !match.isMatch))
    .filter((notMatch) => notMatch)?.length;
  return (
    <Section
      className="m2"
      header={
        <h3 className="label_medium">
          {name}
          {noMatch ? <span className="ml2 g4-color">differs</span> : ''}
        </h3>
      }
      isInitiallyOpen={!noMatch}
    >
      <div className="pt2">
        <div className="analyser-node__row">
          <span></span>
          <span className="label_strong">Request</span>
          <span className="label_strong">Override</span>
        </div>
        {[
          { name: 'URL', matches: url },
          { name: 'Method', matches: method },
          { name: 'Headers', matches: headers },
          { name: 'Request Body', matches: body },
        ].map((matches) => (
          <AnalyserSection {...matches} />
        ))}
      </div>
    </Section>
  );
};

export default AnalyserNode;
