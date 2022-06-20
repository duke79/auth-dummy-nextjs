import * as React from 'react';
import AuthHOC from '../../components/AuthHOC';
import styles from '../../styles/Resource3.module.css';

const Resource3 = () => {

  return <div className={styles['wrapper']}>
    Resource 3
  </div>;
};

export default AuthHOC(Resource3, ['super-admin']);
