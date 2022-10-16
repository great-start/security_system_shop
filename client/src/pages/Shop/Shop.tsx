import React, { FC, useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategoriesAsync, getAllProductsAsync, getProductsSortedByType } from '../../store';
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

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllProductsAsync());
  }, []);

  useEffect(() => {
    if (params.category) {
      showTypes(params.category);
      return;
    }
  }, [isLoading]);

  const showTypes = (categoryTitle: string) => {
    const category = categories.find((category) => category.name === categoryTitle);
    category ? setCategory(category) : null;
    setIsTypesHide(true);
  };

  const activateCategory = (e: React.MouseEvent<Element>, categoryTitle: string) => {
    e.preventDefault();
    navigate(`/shop/${categoryTitle}`);
    showTypes(categoryTitle);
  };

  const activateType = (e: React.MouseEvent<Element>, typeId: number) => {
    e.preventDefault();
    console.log(typeId);
    dispatch(getProductsSortedByType({ typeId }));
  };

  return isLoading ? (
    <Spinner animation="border" variant="success" style={{ marginLeft: '120px' }} />
  ) : (
    <div className={css.shopWrap}>
      <div>
        <ListGroup className={css.groupList}>
          <div className={`${css.titles} ${css.catalog}`}>Каталог товарів</div>
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
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        <div className={`${css.titles} ${isTypesHide && css.catalog}`}>
          {isTypesHide && (
            <ListGroup horizontal className={css.types}>
              {category?.Type &&
                category.Type.map((type) => (
                  <ListGroup.Item
                    className={css.listItem}
                    key={type.name}
                    action
                    onClick={(e) => activateType(e, type.id)}
                  >
                    {type.name}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </div>

        <div className={css.products}>
          {products && products.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};
