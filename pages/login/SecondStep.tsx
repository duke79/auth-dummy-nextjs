import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';

const SecondStep = () => {
  const router = useRouter();
  const { isFirstFactorSuccessful } = useAuthStore();

  React.useEffect(() => {
    if (isFirstFactorSuccessful) {
      router.push('/');
    }
  }, [isFirstFactorSuccessful]);

  return <div>
    <h1>Congratulations!</h1>
    <p>You have sucessfully logged in!</p>
    <p>Redirecting...</p>
  </div>;
};

export default SecondStep;
