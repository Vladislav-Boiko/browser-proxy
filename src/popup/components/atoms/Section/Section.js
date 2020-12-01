import React, { useState } from 'react';
import Icons from '../Icons/Icons';
import cn from 'classnames';

import './Section.css';

const Section = ({ header, children, isInitiallyOpen, className }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <div className={cn('section', className)}>
      <button
        className={cn('section__header', {
          section__header_closed: !isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.Chevron
          className={cn('icon_sm section__chevron mr1', {
            section__chevron_closed: !isOpen,
          })}
        />
        {header}
      </button>
      <section
        className={cn('section__body', {
          section__body_closed: !isOpen,
        })}
      >
        {children}
      </section>
    </div>
  );
};

export default Section;
