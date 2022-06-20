import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';

const Resource2 = () => {

  return <div>
    Resource 2
  </div>;
};

export default AuthHOC(Resource2, ['admin', 'super-admin']);
