import React, { FC, useEffect } from 'react';
import css from '../../pages/Auth/Auth.module.css';
import { Container } from 'react-bootstrap';

export const GoogleAuthButton: FC = () => {
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

  const googleCallBackResponse = (response: any) => {
    console.log(response);
  };

  return (
    <Container className={css.googleButton}>
      <div id="g_id_signin"></div>
    </Container>
  );
};
