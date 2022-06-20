import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';
import styles from '../../styles/Resource1.module.css';

const Resource1 = () => {

  return <div className={styles['wrapper']}>
    Resource 1
  </div>;
};

export default AuthHOC(Resource1, ['default', 'admin', 'super-admin']);
