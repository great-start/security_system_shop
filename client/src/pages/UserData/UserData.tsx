import React, { FC, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPersonalDataAsync } from '../../store';

export const UserData: FC = () => {
  const dispatch = useAppDispatch();
  const { personalData, isLoading } = useAppSelector(state => state.personalDataReducer);

  useEffect(() => {
    dispatch(getPersonalDataAsync());
  }, []);

  console.log(personalData);

  return ( !isLoading ?
    <Container>
      {personalData?.firstName}
    </Container>
   : <Spinner animation={'grow'} variant="primary" />);
};

