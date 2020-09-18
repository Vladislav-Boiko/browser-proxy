import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Arrow } from "./arrow.svg";

import "./TreeItem.css";
const Item = ({ name, subNodes, parent, isSelected }) => {
  // TODO: get initial parameter from props
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ul className={cn("tree__parent", { tree__parent_root: !parent })}>
      <li className={cn("tree__child", { tree__child_selected: isSelected })}>
        <button
          className={cn("tree__button", { "tree__button_no-arrow": !subNodes })}
          onClick={() => subNodes && setIsOpen(!isOpen)}
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
            <Item {...child} parent={true} />
          </li>
        ))}
    </ul>
  );
};

export default Item;
