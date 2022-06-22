import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import { useAuthStore } from '../../stores/auth-store';
import styles from '../../styles/login.module.css';
import FirstFactorLogin from './FirstFactorLogin';
import SecondFactorLogin from './SecondFactorLogin';
import LoginSuccess from './LoginSuccess';

const Login = () => {
  const {
    isFirstFactorSuccessful,
    isTwoFactorEnabled,
    isSecondFactorSuccessful,
  } = useAuthStore();
  const app = useAppStore();

  React.useEffect(() => {
    app.resetMasterData();
  }, []);

  return <div className={styles['login-wrapper']}>
    {isFirstFactorSuccessful ? (
      isTwoFactorEnabled && !isSecondFactorSuccessful ? <SecondFactorLogin /> : <LoginSuccess />
    ) : <FirstFactorLogin />}
  </div>;
};

export default Login;
