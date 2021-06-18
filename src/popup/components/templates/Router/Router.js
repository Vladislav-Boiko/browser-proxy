import React from 'react';
import TreeView, {
  TYPES,
  XHR_TYPES,
} from 'organisms/TreeView/TreeView.container';
import Request from 'organisms/Request/Request.container';
import Domain from 'organisms/Domain/Domain';
import Folder from 'organisms/Folder/Folder.container';
import Analyser from 'molecules/Analyser/Analyser';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

import './Router.css';
import Image404 from 'atoms/404/Image404';
const Router = ({
  nodes,
  selectedNode,
  setSelectedId,
  analysedRequest,
  currentDomain,
  toggleNode,
  stopAnalysing,
}) => {
  let Node = null;
  if (selectedNode) {
    if (selectedNode.type in XHR_TYPES) {
      Node = Request;
    } else {
      switch (selectedNode.type) {
        case TYPES.DOMAIN: {
          Node = Domain;
          break;
        }
        case TYPES.FOLDER: {
          Node = Folder;
          break;
        }
        default: {
          Node = null;
        }
      }
    }
  }
  const onlyCurrentDomainNodes = nodes.filter(({ id }) => id === currentDomain);
  return (
    <div className="ffr">
      <TreeView nodes={nodes} onChange={setSelectedId} />
      {analysedRequest && (
        <div className="wmax navigation-node pt2">
          <Button
            tretiary
            onClick={stopAnalysing}
            className="mb2 ml2 back-button"
            Icon={Icons.Chevron}
            iconLeft={false}
            iconClass="back-button__icon"
          >
            Back
          </Button>
          <Analyser
            request={analysedRequest}
            overrides={onlyCurrentDomainNodes}
          />
        </div>
      )}
      {!analysedRequest &&
        (Node ? (
          <Node
            {...selectedNode}
            toggle={() => toggleNode(selectedNode?.id)}
            className="wmax navigation-node py2"
          />
        ) : nodes?.length ? (
          <Image404 />
        ) : (
          ''
        ))}
    </div>
  );
};

export default Router;
