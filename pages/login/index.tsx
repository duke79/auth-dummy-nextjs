import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import styles from '../../styles/login.module.css';
import FirstFactorLogin from './FirstFactorLogin';
import SecondStep from './SecondStep';

const Login = () => {
  const { isFirstFactorSuccessful } = useAppStore();

  return <div className={styles['login-wrapper']}>
    {isFirstFactorSuccessful ? <SecondStep/> : <FirstFactorLogin />}
  </div>;
};

export default Login;
