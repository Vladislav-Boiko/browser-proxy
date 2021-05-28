import React from 'react';
import Icons from 'atoms/Icons/Icons';
import { motion, AnimatePresence } from 'framer-motion';

import './Pagination.css';

const arrowsPresenceAnimation = {
  initial: { width: 0 },
  animate: { width: 'auto' },
  exit: { width: 0, opacity: 0 },
};

const Pagination = ({ totalPages, currentPage, onChange }) => {
  if (totalPages === 0 || totalPages === 1) {
    return '';
  }
  let current = Math.min(Math.max(1, currentPage), totalPages);
  return (
    <ul className="pagination">
      <AnimatePresence>
        {current > 1 && (
          <motion.li className="pagination__page" {...arrowsPresenceAnimation}>
            <button
              className="pagination__navigation pagination__navigation_to-start"
              onClick={() => onChange && onChange(1)}
            >
              <Icons.Collapse className="icon_md" />
            </button>
          </motion.li>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {current > 1 && (
          <motion.li className="pagination__page" {...arrowsPresenceAnimation}>
            <button
              className="pagination__navigation pagination__navigation_backward"
              onClick={() => onChange && onChange(current - 1)}
            >
              <Icons.Chevron className="icon_md" />
            </button>
          </motion.li>
        )}
      </AnimatePresence>
      {current !== 1 && (
        <li className="pagination__page">
          <button onClick={() => onChange && onChange(1)}>1</button>
        </li>
      )}
      <AnimatePresence>
        {current > 3 && (
          <motion.li
            className="pagination__ellipsis"
            {...arrowsPresenceAnimation}
          >
            ..
          </motion.li>
        )}
      </AnimatePresence>
      {current - 1 > 1 && (
        <li className="pagination__page">
          <button onClick={() => onChange && onChange(current - 1)}>
            {current - 1}
          </button>
        </li>
      )}
      <li className="pagination__page pagination__page_selected">
        <button onClick={() => onChange && onChange(current)}>{current}</button>
      </li>
      {current + 1 < totalPages && (
        <li className="pagination__page">
          <button onClick={() => onChange && onChange(current + 1)}>
            {current + 1}
          </button>
        </li>
      )}
      <AnimatePresence>
        {totalPages - current - 1 > 0 && (
          <motion.li
            {...arrowsPresenceAnimation}
            className="pagination__page pagination__ellipsis"
          >
            ...
          </motion.li>
        )}
      </AnimatePresence>
      {current !== totalPages && (
        <li className="pagination__page">
          <button onClick={() => onChange && onChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      )}
      {current < totalPages && (
        <li className="pagination__page">
          <button
            className="pagination__navigation pagination__navigation_forward"
            onClick={() => onChange && onChange(current + 1)}
          >
            <Icons.Chevron className="icon_md" />
          </button>
        </li>
      )}
      {current < totalPages && (
        <li className="pagination__page">
          <button
            className="pagination__navigation pagination__navigation_to-end"
            onClick={() => onChange && onChange(totalPages)}
          >
            <Icons.Collapse className="icon_md" />
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
