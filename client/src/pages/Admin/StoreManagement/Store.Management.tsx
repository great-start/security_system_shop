import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Form, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addNewAsync, getAllCategoriesAsync, getAllTypesAsync } from '../../../store';
import css from './Store.Management.module.css';

export const StoreManagement: FC = () => {
  const newCategory = useRef<HTMLInputElement>(null);
  const newType = useRef<HTMLInputElement>(null);
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { categories, types, isLoading } = useAppSelector((state) => state.categoryTypeReducer);

  useEffect(() => {
    dispatch(getAllCategoriesAsync()).unwrap();
    dispatch(getAllTypesAsync());
    if (newCategory.current) newCategory.current.placeholder = 'enter new category';
    if (newType.current) newType.current.placeholder = 'enter new type';
  }, [reload]);

  const addNew = (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
    e.preventDefault();
    dispatch(
      addNewAsync({
        action,
        body: action === 'newCategory' ? newCategory.current?.value : newType.current?.value,
      }),
    );
    if (newCategory.current) newCategory.current.placeholder = 'enter new category';
    if (newType.current) newType.current.placeholder = 'enter new type';
    setReload(!reload);
  };

  console.log(isLoading);

  return (
    <Container>
      <Container className={css.mainBox}>
        <Card border={'success'}>
          <Card.Header className={css.title}>Categories</Card.Header>
          <Card.Body>
            <div>All categories:</div>
            {isLoading ? (
              <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
            ) : (
              <ListGroup>
                {categories &&
                  categories.map((category) => (
                    <ListGroupItem key={category.name}>
                      <div style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <div>{category.name}</div>
                        <div style={{ color: '#777fa8', fontSize: '0.8rem' }}>
                          Cтворено: {category.createdAt}
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
              </ListGroup>
            )}
          </Card.Body>
          <Card.Body>
            Add new:
            <Container
              style={{ padding: 0, display: 'flex', justifyContent: 'space-between', gap: '50px' }}
            >
              <Form.Group>
                <Form.Control
                  ref={newCategory}
                  type="text"
                  placeholder={newCategory.current?.placeholder}
                />
              </Form.Group>
              <Button variant={'outline-primary'} onClick={(e) => addNew(e, 'newCategory')}>
                Створити
              </Button>
            </Container>
          </Card.Body>
        </Card>
        <Card border={'success'}>
          <Card.Header className={css.title}>Types</Card.Header>
          <Card.Body>
            <div>All types:</div>
            <ListGroup>
              {types &&
                types.map((type) => (
                  <ListGroupItem key={type.name}>
                    <div style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <div>{type.name}</div>
                      <div style={{ color: '#778ba8', fontSize: '0.8rem' }}>
                        Cтворено: {type.createdAt}
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Card.Body>
          <Card.Body>
            Add new:
            <Container
              style={{ padding: 0, display: 'flex', justifyContent: 'space-between', gap: '50px' }}
            >
              <Form.Group>
                <Form.Control
                  ref={newType}
                  type="text"
                  placeholder={newType.current?.placeholder}
                />
              </Form.Group>
              <Button variant={'outline-primary'} onClick={(e) => addNew(e, 'newType')}>
                Створити
              </Button>
            </Container>
          </Card.Body>
        </Card>
      </Container>
      <Card>
        <Card.Header>Products</Card.Header>
      </Card>
    </Container>
  );
};
