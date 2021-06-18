import React from 'react';
import AnalyserNode from './AnalyserNode/AnalyserNode';
import overridesStorage from '../../../../injected/overrides/Overrides';
import { TYPES, XHR_TYPES } from 'organisms/TreeView/Nodes/index';
import Icons from 'atoms/Icons/Icons';
import Image404 from 'atoms/404/Image404';
import Pill from 'atoms/Pill/Pill';
import './Analyser.css';

const getMatchers = (request, node, variables) => {
  const { matches: url } = overridesStorage.compareUrlMatch(
    request,
    node,
    variables,
  );
  const { matches: method } = overridesStorage.compareMethodMatch(
    request,
    node,
    variables,
  );
  const { matches: headers } = overridesStorage.compareHeadersMatch(
    request,
    node,
    variables,
  );
  const { matches: body } = overridesStorage.compareRequestBodyMatch(
    request,
    node,
    variables,
  );
  return { url, method, headers, body };
};

const Analyser = ({ overrides, request, variables = [], level = 0 }) => {
  overridesStorage.overrides = overrides;
  return (
    <div className="analyser">
      {!overrides && level === 1 && (
        <Image404 className="analyser__404">
          <span>404</span>
          <br />
          <span className="analyser__404-text analyser__404-text_strong">
            no overrides
          </span>
        </Image404>
      )}
      {overrides?.map((node, i) => {
        if (node.type === TYPES.FOLDER || node.type === TYPES.DOMAIN) {
          return (
            <div>
              <h3 className="g2-color mx2 label_medium">
                {node.type === TYPES.FOLDER && (
                  <Icons.Folder className="icon_md mr1" />
                )}
                {node.type === TYPES.DOMAIN && (
                  <Icons.Domain className="icon_md mr1" />
                )}
                {node.name}
                {node.isOn === false && <Pill className="ml2" text={'OFF'} />}
              </h3>
              {node.isOn !== false && (
                <Analyser
                  overrides={node.nodes}
                  request={request}
                  variables={variables.concat(
                    (node.variables || []).filter(({ name }) => !!name),
                  )}
                  level={level + 1}
                />
              )}
            </div>
          );
        }
        if (node.type in XHR_TYPES) {
          return (
            <AnalyserNode
              {...node}
              key={node.id || i}
              {...getMatchers(
                request,
                node,
                variables.concat(
                  (node.variables || []).filter(({ name }) => !!name),
                ),
              )}
            />
          );
        }
      })}
    </div>
  );
};

export default Analyser;
