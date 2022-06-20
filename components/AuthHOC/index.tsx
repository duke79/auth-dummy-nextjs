import * as React from 'react';
import { useAppStore } from '../../stores/app-store';
import { roles as userRoles } from '../../utils/db/static/roles';
import NotFound from '../NotFound';

const AuthHOC = (Component: any, roles: (keyof typeof userRoles)[]) => {
  const AuthenticatedComponent = (props: any) => {
    const app = useAppStore();
    const atLeastOneRoleAllowed = roles.find(role => app.roles.includes(role))
    
    return atLeastOneRoleAllowed ? <Component {...props} /> : <NotFound />;
};

return AuthenticatedComponent;
};

export default AuthHOC;
