import React from 'react';
import { ReactComponent as Image404 } from './svg/404.svg';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import './Image404.css';

const imagePresenceAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default ({ className, children = 404 }) => (
  <AnimatePresence>
    <motion.div
      className={cn('image_404 p4', className)}
      {...imagePresenceAnimation}
    >
      <Image404 className="image_404__image" />
      <h1 className="image_404__text">{children}</h1>
    </motion.div>
  </AnimatePresence>
);
