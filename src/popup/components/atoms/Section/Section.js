import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icons from '../Icons/Icons';
import cn from 'classnames';
import { animateHeight } from 'atoms/animations/animations';

import './Section.css';

const Section = ({ header, children, isInitiallyOpen, className, Icon }) => {
  let DisplayedIcon = Icon || Icons.Chevron;
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <div className={cn('section', className)}>
      <button
        className={cn('section__header', {
          section__header_closed: !isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <DisplayedIcon
          isOpen={isOpen}
          className={cn('icon_sm section__chevron mr1', {
            section__chevron_closed: !isOpen,
          })}
        />
        {header}
      </button>
      <motion.section
        className={cn('section__body', {
          section__body_closed: !isOpen,
        })}
        {...animateHeight(isOpen)}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default Section;
