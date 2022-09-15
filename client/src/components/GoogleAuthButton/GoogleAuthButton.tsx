import React, { FC, useEffect } from 'react';
import css from './GoogleAuthButton.module.css';
import { Container } from 'react-bootstrap';
import { IGoogleCallbackResponse } from 'react-google-one-tap-login/dist/types/types';
import { useAppDispatch } from '../../hooks';
import { authWithGoogle } from '../../store';

export const GoogleAuthButton: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '810053192176-bfu0nf7p2p0mon4a1s3h04npt8ok15sg.apps.googleusercontent.com',
      callback: googleCallBackResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
      type: 'standard',
      theme: 'filled_blue',
      size: 'large',
    });
  }, []);

  const googleCallBackResponse = (response: IGoogleCallbackResponse) => {
    const token = response.credential;

    if (token) {
      dispatch(authWithGoogle(token));
    }
  };

  return (
    <Container className={css.googleButton}>
      <div id="g_id_signin"></div>
    </Container>
  );
};
