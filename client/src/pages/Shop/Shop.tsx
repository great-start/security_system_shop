import React, { FC, useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategoriesAsync, getAllProductsOrSortedBy } from '../../store';
import { Product } from '../../components';
import { ICategory, IType } from '../../interfaces';
import css from './Shop.module.css';

export const Shop: FC = () => {
  const { products, errors } = useAppSelector((state) => state.productReducer);
  const { categories, isLoading } = useAppSelector((state) => state.categoryTypeReducer);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [isTypesHide, setIsTypesHide] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllProductsOrSortedBy({}));
  }, []);

  useEffect(() => {
    params.category ? showTypes(params.category) : null;
  }, [isLoading]);

  const showTypes = (categoryTitle: string) => {
    const category = categories.find((category) => category.name === categoryTitle);
    category ? setCategory(category) : null;
    setIsTypesHide(true);
  };

  const activateCategory = (e: React.MouseEvent<Element>, category: ICategory) => {
    e.preventDefault();
    navigate(`/shop/${category.name}`);
    showTypes(category.name);
    dispatch(getAllProductsOrSortedBy({ categoryId: category.id }));
  };

  const activateType = (e: React.MouseEvent<Element>, type: IType) => {
    e.preventDefault();
    dispatch(getAllProductsOrSortedBy({ typeId: type.id }));
  };

  return isLoading ? (
    <Spinner animation="border" variant="success" style={{ marginLeft: '120px' }} />
  ) : (
    <div className={css.shopWrap}>
      <div>
        <ListGroup>
          <div className={`${css.titles} ${css.catalog}`}>Каталог товарів</div>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.name}
                className={params.categories === category.name ? css.linkedin : ''}
                action
                href={`/shop/${category.name}`}
                onClick={(e) => activateCategory(e, category)}
                active={params.categories === category.name}
              >
                {category.name}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, width: '100%' }}>
        <div className={`${css.titles} ${css.catalog}`}>
          {isTypesHide && (
            <ListGroup horizontal className={css.types}>
              {category?.Type &&
                category.Type.map((type) => (
                  <ListGroup.Item
                    className={css.listItem}
                    key={type.name}
                    action
                    onClick={(e) => activateType(e, type)}
                  >
                    {type.name}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </div>

        <div className={css.products}>
          {errors && <div className={css.error404}>{errors.toString()}</div>}
          {products && products.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};
