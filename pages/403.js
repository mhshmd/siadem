import React from 'react';
import LinkWithHand from '../components/LinkWithHand';
import Exception from '../components/Exception';

export default () => (
  <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={LinkWithHand} />
);