import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import { useAuthStore } from '../../stores/auth-store';
import styles from '../../styles/login.module.css';

const Logout = () => {
  const { postLogout, isFirstFactorSuccessful } = useAuthStore();
  const router = useRouter();
  const app = useAppStore();

  React.useEffect(() => {
    postLogout();
    app.resetMasterData();
  }, []);

  React.useEffect(() => {
    if (!isFirstFactorSuccessful) {
      router.push('/login');
    }
  }, [isFirstFactorSuccessful]);

  return <div className={styles['login-wrapper']}>
    Logging out...
  </div>;
};

export default Logout;
