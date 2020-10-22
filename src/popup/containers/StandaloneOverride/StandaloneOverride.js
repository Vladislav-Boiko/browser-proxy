import React from 'react';
import { connect } from 'react-redux';
import { addNewOverride } from '../../redux/actions';
import Override from '../../components/Overrride/Override';

import './StandaloneOverride.css';
export const StandaloneOverride = ({ domain, save }) => (
  <Override
    override={{ domain, method: 'GET', response: { code: 200 } }}
    save={save}
  />
);

export default connect(null, (dispatch) => ({
  save: (override) => addNewOverride(dispatch, override),
}))(StandaloneOverride);
