import * as React from 'react';
import styles from '../../styles/login.module.css'

const Login = () => {
  return <div className={styles['login-wrapper']}>
    <form action="/api/form" method="post" className={styles['login-form']}>
      <label>First name:</label>
      <input type="text" id="first" name="first" />
      <label >Last name:</label>
      <input type="text" id="last" name="last" />
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default Login;
