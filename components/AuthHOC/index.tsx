import { Spin } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import { roles as userRoles } from '../../utils/db/static/roles';
import NotFound from '../NotFound';
import styles from '../../styles/NotFound.module.css';

const AuthHOC = (Component: any, roles: (keyof typeof userRoles)[]) => {
  const AuthenticatedComponent = (props: any) => {
    const app = useAppStore();
    const router = useRouter();

    const atLeastOneRoleAllowed = roles.find(role => app.roles.includes(role))

    React.useEffect(() => {
      if (!app.hasLoaded) {
        app.getMasterData({});
      }
    }, []);

    React.useEffect(() => {
      if (app.isLoggedOut) {
        router.push('/login');
      }
    }, [app.isLoggedOut]);

    const renderContent = () => {
      return atLeastOneRoleAllowed ? <Component {...props} /> : <NotFound />;
    };

    const renderLoading = () => {
      return <div className={styles['wrapper']}>
        <Spin />
      </div>;
    };

    return app.isLoggedIn ? renderContent() : renderLoading();
  };

  return AuthenticatedComponent;
};

export default AuthHOC;
