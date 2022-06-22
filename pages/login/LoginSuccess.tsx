import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';

const LoginSuccess = () => {
  const router = useRouter();
  const auth = useAuthStore();
  const redirectTo = router.query.redirectTo as string || '/';

  React.useEffect(() => {
    // router.push(redirectTo);
    window.location.href = redirectTo;
  }, []);

  return <div>
    <h1>Congratulations!</h1>
    <p>You have sucessfully logged in!</p>
    <p>Redirecting to .... {redirectTo}</p>
  </div>;
};

export default LoginSuccess;
