import React, { useState } from 'react';
import TreeView, { TYPES, XHR_TYPES } from 'organisms/TreeView/TreeView';
import Request from 'organisms/Request/Request';
import Domain from 'organisms/Domain/Domain';
import Folder from 'organisms/Folder/Folder';
import './Router.css';

const findSelectedById = (id, nodes = []) => {
  for (let node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.nodes) {
      const maybeFound = findSelectedById(id, node.nodes);
      if (maybeFound) {
        return maybeFound;
      }
    }
  }
  return null;
};

const Router = ({ nodes }) => {
  // TODO: initial state
  const [selectedId, setSelectedId] = useState();
  // TODO: case not selected, select default
  const selectedNode = findSelectedById(selectedId, nodes);
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
