import React from 'react';
import { ReactComponent as Image404 } from './svg/404.svg';

import './Image404.css';
export default () => (
  <div className="image_404 p4">
    <Image404 className="image_404__image" />
    <p className="image_404__text">404</p>
  </div>
);
