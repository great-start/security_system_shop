import React, { FC, useEffect, useState } from 'react';
import { Button, Container, Form, ListGroup, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPersonalDataAsync } from '../../store';
import css from './UserData.module.css';

export const UserData: FC = () => {

  const [personalDataChange, setPersonalDataChange] = useState(false);
  const dispatch = useAppDispatch();
  const { personalData, isLoading } = useAppSelector(state => state.personalDataReducer);

  useEffect(() => {
    dispatch(getPersonalDataAsync());
  }, []);

  console.log(personalData);

  const changePersonalData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPersonalDataChange(!personalDataChange);

  }

  return ( !isLoading ?
    <div>
      <div className={css.userData}>
        <div>
          <ListGroup variant='flush' className={css.userDataFields}>
            <ListGroup.Item variant='light'>
              <span>Ім'я: </span>
              {personalDataChange ?
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                : <div> {personalData?.firstName} </div> }</ListGroup.Item>
            <ListGroup.Item variant='light'>
              <span>Прізвище: </span>
              {personalDataChange ?
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                : <div> {personalData?.lastName} </div> }</ListGroup.Item>
            <ListGroup.Item variant='light'>
              <span>Пошта: </span>
              { personalData?.email }</ListGroup.Item>
            <ListGroup.Item variant='light'>
              <span>Телефон: </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <div>Дата створення акаунту: </div>
          <p>{ personalData?.createdAt }</p>
        </div>
      </div>
      <div className={css.personalDataChange}>
        <Button variant={'outline-success'} onClick={(e) => changePersonalData(e)}>
          { personalDataChange ? 'Зберегти зміни' : 'Змінити персональні дані'  }
        </Button>
      </div>
    </div>
   : <Spinner animation={'grow'} variant="primary" />);
};

