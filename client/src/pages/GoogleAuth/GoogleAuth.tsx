import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { googleAuthAsync, setCredentialsAfterGoogleAuth } from '../../store';
import axios from 'axios';
import { userService } from '../../services';
import GoogleLogin from 'react-google-login';

export const GoogleAuth: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(googleAuthAsync());
  }, []);

  // useEffect(() => {
  //   async function setCredentials() {
  //     await dispatch(setCredentialsAfterGoogleAuth(location.search));
  //   }

  // setCredentials().then(() => window.close());
  // }, []);

  return (
    <GoogleLogin
      clientId={'810053192176-d0chn9j3l1qplkoniu7tsbr1r4idqqra.apps.googleusercontent.com'}
      // buttonText="Log in with Google"
      // onSuccess={handleLogin}
      // onFailure={handleLogin}
      // cookiePolicy={'single_host_origin'}
    />
  );
};
