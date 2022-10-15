import React, { FC, useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAllCategoriesAsync,
  getAllProductsAsync,
  getProductsByCategoryAsync,
} from '../../store';
import { Product } from '../../components';
import { ICategory } from '../../interfaces';
import css from './Shop.module.css';

export const Shop: FC = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  const { categories, isLoading } = useAppSelector((state) => state.categoryTypeReducer);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [isTypesHide, setIsTypesHide] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  console.log(categories);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(getAllCategoriesAsync())
        .unwrap()
        .then(() => {
          if (params.category) {
            // dispatch(getProductsByCategoryAsync(params.category));
            showTypes(params.category);
            return;
          }
          dispatch(getAllProductsAsync());
          console.log('load');
        });
    };
    getProducts();
  }, []);

  const showTypes = (categoryTitle: string) => {
    const category = categories.find((category) => category.name === categoryTitle);
    category ? setCategory(category) : null;
    setIsTypesHide(true);
    console.log('load inside', category);
  };

  console.log('loading');

  const activateCategory = (e: React.MouseEvent<Element>, categoryTitle: string) => {
    e.preventDefault();
    navigate(`/shop/${categoryTitle}`);
    showTypes(categoryTitle);
    console.log('activateCategory');
  };

  if (!isLoading) {
    return <Spinner animation="grow" variant="success" style={{ marginLeft: '120px' }} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <ListGroup className={css.groupList}>
        <p>Каталог товарів</p>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.name}
              className={params.categories === category.name ? css.linkedin : ''}
              action
              href={`/shop/${category.name}`}
              onClick={(e) => activateCategory(e, category.name)}
              active={params.categories === category.name}
              // variant="secondary"
            >
              {category.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        {isTypesHide && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
            <p>Типи товарів:</p>
            <ListGroup horizontal>
              {category?.Type &&
                category.Type.map((type) => (
                  <ListGroup.Item key={type.name}>{type.name}</ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        )}
        <div className={css.products}>
          {products && products.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};
