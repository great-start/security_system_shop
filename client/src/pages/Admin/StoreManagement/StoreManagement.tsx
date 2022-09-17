import React, { FC, useEffect, useRef, useState } from 'react';
import { Card, Container, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import css from './Store.Management.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAllCategoriesAsync, getAllTypesAsync } from '../../../store';

export const StoreManagement: FC = () => {
  const newCategory = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { categories, types } = useAppSelector((state) => state.categoryTypeReducer);

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllTypesAsync());
  }, []);

  return (
    <Container>
      <Container className={css.mainBox}>
        <Card border={'success'}>
          <Card.Header className={css.title}>Categories</Card.Header>
          <Card.Body>
            <div>All categories:</div>
            <ListGroup>
              {categories &&
                categories.map((category) => (
                  <ListGroupItem key={category.name}>{category.name}</ListGroupItem>
                ))}
            </ListGroup>
          </Card.Body>
          <Card.Body>
            Add new:
            <Form.Group>
              <Form.Control
                ref={newCategory}
                type="text"
                placeholder={'new category of products'}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card border={'success'}>
          <Card.Header className={css.title}>Types</Card.Header>
          <Card.Body>
            <div>All types:</div>
            <ListGroup>
              {types &&
                categories.map((category) => (
                  <ListGroupItem key={category.name}>{category.name}</ListGroupItem>
                ))}
            </ListGroup>
          </Card.Body>
          <Card.Body>
            Add new:
            <Form.Group>
              <Form.Control ref={newCategory} type="text" placeholder={'new type of products'} />
            </Form.Group>
          </Card.Body>
        </Card>
      </Container>
      <Card>
        <Card.Header>Products</Card.Header>
      </Card>
    </Container>
  );
};
