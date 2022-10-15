import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addNewAsync,
  addNewTypeAsync,
  getAllCategoriesAsync,
  getAllTypesAsync,
} from '../../../store';
import css from './Store.Management.module.css';

export const StoreManagement: FC = () => {
  const newCategory = useRef<HTMLInputElement>(null);
  const newType = useRef<HTMLInputElement>(null);
  const chooseCategory = useRef<HTMLSelectElement>(null);
  const [reload, setReload] = useState<boolean>(false);
  const newProductName = useRef<HTMLInputElement>(null);
  const newProductPrice = useRef<HTMLInputElement>(null);
  const newProductQuantity = useRef<HTMLInputElement>(null);
  const newProductType = useRef<HTMLSelectElement>(null);
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
    }, 500);
  };

  const addNewType = () => {
    if (chooseCategory.current && newType.current) {
      dispatch(
        addNewTypeAsync({
          typeName: newType.current.value,
          relatedCategoryId: Number(chooseCategory.current.value),
        }),
      );
    }
    setTimeout(() => {
      setReload(!reload);
    }, 500);
  };

  return (
    <Container>
      <Container className={css.mainBox}>
        <Card border={'success'}>
          <Accordion>
            <Accordion.Item eventKey="0" className={css.title}>
              <Accordion.Header className={css.AccordionHeader}>
                <div>Category</div>
              </Accordion.Header>
              <Accordion.Body className={css.accordionBody}>
                <Card.Body>
                  <div className={css.titleAll}>
                    <div style={{ color: '#777fa8', fontSize: '0.8rem', alignSelf: 'flex-end' }}>
                      Cтворено:
                    </div>
                  </div>
                  {!categories.length ? (
                    <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />
                  ) : (
                    <ListGroup>
                      {categories &&
                        categories.map((category) => (
                          <ListGroupItem key={category.name}>
                            <div
                              style={{
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Card.Body style={{ display: 'flex' }}>
            <Container className={css.cardBody}>
              <div className={css.title}>Add new:</div>
              <Container
                style={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '50px',
                }}
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
            </Container>
          </Card.Body>
        </Card>

        <Card border={'success'}>
          <Accordion>
            <Accordion.Item eventKey="0" className={css.title}>
              <Accordion.Header className={css.AccordionHeader}>
                <div>Type</div>
              </Accordion.Header>
              <Accordion.Body className={css.accordionBody}>
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
                            <div
                              style={{
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>{type.name}</div>
                              <div style={{ color: '#778ba8', fontSize: '0.8rem' }}>
                                {type.createdAt}
                              </div>
                            </div>
                          </ListGroupItem>
                        ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
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
                  <div className={css.titleAll}>Product type:</div>
                  <Form.Select ref={newProductType}>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Container>
                <Container style={{ padding: 0 }}>
                  <div className={css.titleAll}>Name:</div>
                  <Form.Control
                    ref={newProductName}
                    type="text"
                    onMouseEnter={() => {
                      if (newType.current) newType.current.placeholder = 'name';
                    }}
                    onMouseOut={() => {
                      if (newType.current) newType.current.placeholder = '';
                    }}
                  />
                </Container>
                <Container style={{ padding: 0 }}>
                  <div className={css.titleAll}>Price:</div>
                  <Form.Control
                    ref={newProductPrice}
                    type="text"
                    onMouseEnter={() => {
                      if (newType.current) newType.current.placeholder = 'price';
                    }}
                    onMouseOut={() => {
                      if (newType.current) newType.current.placeholder = '';
                    }}
                  />
                </Container>
                <Container style={{ padding: 0 }}>
                  <div className={css.titleAll}>Quantity:</div>
                  <Form.Control
                    ref={newProductQuantity}
                    type="text"
                    onMouseEnter={() => {
                      if (newType.current) newType.current.placeholder = 'quantity';
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
  );
};
