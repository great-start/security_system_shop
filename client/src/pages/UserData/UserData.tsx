import React, { FC, useEffect } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
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
      <Container>
        <ListGroup variant='flush'>
        <ListGroup.Item variant='light'>Ім'я: {personalData?.firstName}</ListGroup.Item>
        <ListGroup.Item variant='light'>Прізвище: {personalData?.lastName}</ListGroup.Item>
        <ListGroup.Item variant='light'>Пошта: {personalData?.email}</ListGroup.Item>
        <ListGroup.Item variant='light'>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
      </Container>
      <Container>
        {personalData?.createdAt}
      </Container>
    </Container>
   : <Spinner animation={'grow'} variant="primary" />);
};

