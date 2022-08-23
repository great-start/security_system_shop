import React, { FC, useEffect } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPersonalDataAsync } from '../../store';
import css from './UserData.module.css';

export const UserData: FC = () => {
  const dispatch = useAppDispatch();
  const { personalData, isLoading } = useAppSelector(state => state.personalDataReducer);

  useEffect(() => {
    dispatch(getPersonalDataAsync());
  }, []);

  console.log(personalData);

  return ( !isLoading ?
    <div className={css.userData}>
      <div>
        <ListGroup variant='flush' className={css.userDataFields}>
          <ListGroup.Item variant='light'>
            <span>Ім'я:</span>
            {personalData?.firstName}</ListGroup.Item>
          <ListGroup.Item variant='light'>
            <span>Прізвище:</span>
            {personalData?.lastName}</ListGroup.Item>
          <ListGroup.Item variant='light'>
            <span>Пошта:</span>
            {personalData?.email}</ListGroup.Item>
          <ListGroup.Item variant='light'>
            <span>Porta ac consectetur ac</span>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div>
        <div>Дата створення акаунту: </div>
        <p>{personalData?.createdAt}</p>
      </div>
    </div>
   : <Spinner animation={'grow'} variant="primary" />);
};

