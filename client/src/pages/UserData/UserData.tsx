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
      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">Cras justo odio</ListGroup.Item>
        <ListGroup.Item variant="info">Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item variant="secondary">Morbi leo risus</ListGroup.Item>
        <ListGroup.Item variant="success">Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
      {personalData?.firstName}
    </Container>
   : <Spinner animation={'grow'} variant="primary" />);
};

