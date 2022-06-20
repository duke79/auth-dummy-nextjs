import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';
import styles from '../../styles/login.module.css';
import FirstFactorLogin from './FirstFactorLogin';
import SecondStep from './SecondStep';

const Login = () => {
  const { isFirstFactorSuccessful } = useAuthStore();

  return <div className={styles['login-wrapper']}>
    {isFirstFactorSuccessful ? <SecondStep/> : <FirstFactorLogin />}
  </div>;
};

export default Login;
