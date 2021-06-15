import React from 'react';
import { ReactComponent as Image404 } from './svg/404.svg';
import { motion, AnimatePresence } from 'framer-motion';

import './Image404.css';

const imagePresenceAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default () => (
  <AnimatePresence>
    <motion.div className="image_404 p4" {...imagePresenceAnimation}>
      <Image404 className="image_404__image" />
      <h1 className="image_404__text">404</h1>
    </motion.div>
  </AnimatePresence>
);
