import React, { FC, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllProductsAsync, getProductsByCategoryAsync } from '../../store';
import { CategoryList, Product } from '../../components';
import { ICategory } from '../../interfaces';
import css from './Shop.module.css';

export const Shop: FC = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  const { categories } = useAppSelector((state) => state.categoryTypeReducer);
  const [category, setCategory] = useState<ICategory | null>(null);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      if (params.category) {
        dispatch(getProductsByCategoryAsync(params.category));
        const category = categories.find((category) => category.name === params.category);
        category ? setCategory(category) : null;
        return;
      }
      dispatch(getAllProductsAsync());
    };
    getProducts();
  }, [params.category]);

  console.log(category);

  return (
    <div style={{ display: 'flex' }}>
      <CategoryList />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
          <p>Типи товарів:</p>
          <ListGroup horizontal>
            {category?.Type &&
              category.Type.map((type) => (
                <ListGroup.Item key={type.name}>{type.name}</ListGroup.Item>
              ))}
          </ListGroup>
        </div>
        <div className={css.products}>
          {products && products.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};
