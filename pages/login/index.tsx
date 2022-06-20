import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import { useAuthStore } from '../../stores/auth-store';
import styles from '../../styles/login.module.css';
import FirstFactorLogin from './FirstFactorLogin';
import SecondStep from './SecondStep';

const Login = () => {
  const { isFirstFactorSuccessful } = useAuthStore();
  const app = useAppStore();
  const router = useRouter();

  React.useEffect(() => {
    app.resetMasterData();
  }, []);

  return <div className={styles['login-wrapper']}>
    {isFirstFactorSuccessful ? <SecondStep/> : <FirstFactorLogin />}
  </div>;
};

export default Login;
