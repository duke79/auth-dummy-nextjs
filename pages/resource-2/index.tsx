import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';
import styles from '../../styles/Resource2.module.css';

const Resource2 = () => {

  return <div className={styles['wrapper']}>
    Resource 2
  </div>;
};

export default AuthHOC(Resource2, ['admin', 'super-admin']);
