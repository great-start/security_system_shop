import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Form, ListGroup, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changePersonalDataAsync, getPersonalDataAsync } from '../../../store';
import css from './UserData.module.css';

export const UserData: FC = () => {
  const [personalDataChange, setPersonalDataChange] = useState(false);
  const firstNameField = useRef<HTMLInputElement>(null);
  const lastNameField = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { personalData, isLoading } = useAppSelector((state) => state.personalDataReducer);

  useEffect(() => {
    dispatch(getPersonalDataAsync({ isAdmin: false }));
  }, []);

  const changePersonalData = (e: any) => {
    e.preventDefault();
    if (personalDataChange) {
      dispatch(
        changePersonalDataAsync({
          firstName: firstNameField?.current?.value || personalData?.firstName,
          lastName: lastNameField?.current?.value || personalData?.lastName,
        }),
      ).unwrap();
    }
    setPersonalDataChange(!personalDataChange);
  };

  return !isLoading ? (
    <div>
      <div className={css.userData}>
        <div>
          <ListGroup variant="flush" className={css.userDataFields}>
            <ListGroup.Item variant="light">
              <span>Ім'я: </span>
              {personalDataChange ? (
                <Form.Group className={css.personalDataChangeFormFields}>
                  <Form.Control
                    ref={firstNameField}
                    type="email"
                    placeholder={personalData?.firstName}
                  />
                </Form.Group>
              ) : (
                <div> {personalData?.firstName} </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <span>Прізвище: </span>
              {personalDataChange ? (
                <Form.Group className={css.personalDataChangeFormFields}>
                  <Form.Control
                    ref={lastNameField}
                    type="email"
                    placeholder={personalData?.lastName}
                  />
                </Form.Group>
              ) : (
                <div> {personalData?.lastName} </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <span>Пошта: </span>
              {personalData?.email}
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <span>Телефон: </span>
            </ListGroup.Item>
            <ListGroup.Item variant="success">
              <span>Пароль: </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className={css.dataBox}>
          <div>
            <div>Дата створення акаунту:</div>
            <p>{personalData?.createdAt}</p>
          </div>
          <div>
            <div>Дата та час останніх змін:</div>
            <p>{personalData?.updatedAt}</p>
          </div>
        </div>
      </div>
      <div className={css.personalDataChange}>
        <Button variant={'outline-success'} onClick={(e) => changePersonalData(e)}>
          {personalDataChange ? 'Зберегти зміни' : 'Змінити персональні дані'}
        </Button>
      </div>
    </div>
  ) : (
    <Spinner animation={'grow'} variant="success" />
  );
};
