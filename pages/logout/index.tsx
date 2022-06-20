import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';

const Logout = () => {
  const { postLogout, isFirstFactorSuccessful } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    postLogout();
  }, []);

  React.useEffect(() => {
    if (!isFirstFactorSuccessful) {
      router.push('/login');
    }
  }, [isFirstFactorSuccessful]);

  return <div>
    Logging out...
  </div>;
};

export default Logout;
