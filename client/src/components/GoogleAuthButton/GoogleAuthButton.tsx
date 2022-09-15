import React, { FC } from 'react';
import GoogleLogin from 'react-google-login';
import css from '../../pages/Auth/Auth.module.css';
import GoogleButton from 'react-google-button';
import { Container } from 'react-bootstrap';

export const GoogleAuthButton: FC = () => {
  const googleAuth = async (response: any) => {
    console.log(response);
    // e.preventDefault();
  };

  const responseGoogle = async (response: any) => {
    console.log(response.details);
    // e.preventDefault();
  };

  return (
    <Container className={css.googleButton}>
      <GoogleLogin
        clientId={String(process.env.GOOGLE_CLIENT_ID)}
        onSuccess={googleAuth}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => <GoogleButton onClick={renderProps.onClick} />}
      ></GoogleLogin>
    </Container>
  );
};
