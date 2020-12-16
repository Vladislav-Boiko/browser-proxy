import React from 'react';
import TreeView, {
  TYPES,
  XHR_TYPES,
} from 'organisms/TreeView/TreeView.container';
import Request from 'organisms/Request/Request';
import Domain from 'organisms/Domain/Domain';
import Folder from 'organisms/Folder/Folder';

import './Router.css';
const Router = ({ nodes, selectedNode, setSelectedId }) => {
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
  return (
    <div className="ffr">
      <TreeView nodes={nodes} onChange={setSelectedId} />
      {Node ? (
        <Node {...selectedNode} className="navigation-node mt1 pt1" />
      ) : (
        'TODO: not rendered'
      )}
    </div>
  );
};

export default Router;
