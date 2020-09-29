import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Arrow } from "./arrow.svg";

import "./TreeItem.css";
const TreeItem = ({
  id,
  name,
  subNodes,
  path,
  select,
  selected,
  type,
  isIniitiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(isIniitiallyOpen);
  return (
    <ul
      className={cn("tree__parent", {
        tree__parent_root: !path || !path.length,
      })}
    >
      <li
        className={cn("tree__child", { tree__child_selected: selected === id })}
      >
        <button
          className={cn("tree__button", { "tree__button_no-arrow": !subNodes })}
          onClick={() => {
            select({ id, type, path });
            subNodes && setIsOpen(!isOpen);
          }}
        >
          {subNodes && (
            <Arrow
              className={cn("tree__arrow", { tree__arrow_closed: !isOpen })}
            />
          )}
          <span className={cn("tree__child-title")}>{name}</span>
        </button>
      </li>
      {subNodes &&
        isOpen &&
        subNodes.map((child, index) => (
          <li className="tree__child" key={index}>
            <TreeItem
              {...child}
              path={path ? [...path, id] : [id]}
              select={select}
              selected={selected}
            />
          </li>
        ))}
    </ul>
  );
};

export default TreeItem;
