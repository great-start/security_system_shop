import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Form, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addNewAsync, getAllCategoriesAsync, getAllTypesAsync } from '../../../store';
import css from './Store.Management.module.css';

export const StoreManagement: FC = () => {
  const newCategory = useRef<HTMLInputElement>(null);
  const newType = useRef<HTMLInputElement>(null);
  const chooseCategory = useRef<HTMLSelectElement>(null);
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { categories, types, isLoading } = useAppSelector((state) => state.categoryTypeReducer);

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllTypesAsync());
  }, [reload]);

  const addNewCategory = (action: string) => {
    dispatch(
      addNewAsync({
        action,
        body: action === 'newCategory' ? newCategory.current?.value : newType.current?.value,
      }),
    );
    if (newCategory.current) newCategory.current.value = '';
    if (newType.current) newType.current.value = '';
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  const addNewType = () => {
    dispatch(add)
    console.log(chooseCategory.current?.value, newType.current?.value);
  };

  return (
    <Container>
      <Container className={css.mainBox}>
        <Card border={'success'}>
          <Card.Header className={css.title}>Categories</Card.Header>
          <Card.Body>
            <div className={css.titleAll}>
              <div>All categories:</div>
              <div style={{ color: '#777fa8', fontSize: '0.8rem' }}>Cтворено:</div>
            </div>
            {!categories.length ? (
              <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
            ) : (
              <ListGroup>
                {categories &&
                  categories.map((category) => (
                    <ListGroupItem key={category.name}>
                      <div style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <div>{category.name}</div>
                        <div style={{ color: '#777fa8', fontSize: '0.8rem' }}>
                          {category.createdAt}
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
              </ListGroup>
            )}
          </Card.Body>
          <Card.Body>
            <div className={css.titleAll}>Add:</div>
            <Container
              style={{ padding: 0, display: 'flex', justifyContent: 'space-between', gap: '50px' }}
            >
              <Form.Group>
                <Form.Control
                  ref={newCategory}
                  type="text"
                  onMouseEnter={() => {
                    if (newCategory.current) newCategory.current.placeholder = 'new category';
                  }}
                  onMouseOut={() => {
                    if (newCategory.current) newCategory.current.placeholder = '';
                  }}
                />
              </Form.Group>
              <Button variant={'outline-primary'} onClick={() => addNewCategory('newCategory')}>
                Створити
              </Button>
            </Container>
          </Card.Body>
        </Card>
        <Card border={'success'}>
          <Card.Header className={css.title}>Types</Card.Header>
          <Card.Body>
            <div className={css.titleAll}>
              <div>All types:</div>
              <div style={{ color: '#777fa8', fontSize: '0.8rem' }}>Cтворено:</div>
            </div>
            {!types.length ? (
              <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
            ) : (
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
            )}
          </Card.Body>
          <Card.Body style={{ display: 'flex' }}>
            <Container
              style={{
                padding: 0,
                display: 'flex',
                justifyContent: 'space-between',
                gap: '50px',
                alignSelf: 'end',
              }}
            >
              <Form.Group>
                <Container
                  style={{
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '50px',
                  }}
                >
                  <Container style={{ padding: 0 }}>
                    <div className={css.titleAll}>To category:</div>
                    <Form.Select ref={chooseCategory}>
                      {categories.map((category) => (
                        <option value={category.name}>{category.name}</option>
                      ))}
                    </Form.Select>
                  </Container>
                  <Container style={{ padding: 0 }}>
                    <div className={css.titleAll}>New type:</div>
                    <Form.Control
                      ref={newType}
                      type="text"
                      onMouseEnter={() => {
                        if (newType.current) newType.current.placeholder = 'new type';
                      }}
                      onMouseOut={() => {
                        if (newType.current) newType.current.placeholder = '';
                      }}
                    />
                  </Container>
                </Container>
              </Form.Group>
              <Button
                variant={'outline-primary'}
                onClick={() => addNewType()}
                style={{ alignSelf: 'flex-end', display: 'block' }}
              >
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
