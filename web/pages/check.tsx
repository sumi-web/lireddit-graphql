import React from 'react';
import { withUrql } from '../hocs/withUrqlClient';

const check = () => {
  return <div>check</div>;
};

export default withUrql(check, true);
