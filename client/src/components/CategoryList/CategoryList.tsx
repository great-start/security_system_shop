import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategoriesAsync } from '../../store';
import css from './CategoryList.module.css';

export const CategoryList: FC = () => {
  const { categories } = useAppSelector((state) => state.categoryTypeReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, []);

  return (
    <ListGroup className={css.groupList}>
      <p>Каталог товарів</p>
      {categories &&
        categories.map((category) => (
          <ListGroup.Item
            key={category.name}
            className={params.categories === category.name ? css.linkedin : ''}
            action
            href={`/shop/${category.name}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/shop/${category.name}`);
            }}
            active={params.categories === category.name}
            // variant="secondary"
          >
            {category.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
