import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';

const Resource3 = () => {

  return <div>
    Resource 3
  </div>;
};

export default AuthHOC(Resource3, ['super-admin']);
