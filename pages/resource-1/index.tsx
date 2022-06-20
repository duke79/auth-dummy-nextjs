import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';

const Resource1 = () => {

  return <div>
    Resource 1
  </div>;
};

export default AuthHOC(Resource1, ['default', 'admin', 'super-admin']);
