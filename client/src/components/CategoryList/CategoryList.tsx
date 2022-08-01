import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategoryAsync } from '../../store';
import css from './CategoryList.module.css';

export const CategoryList: FC = () => {

    const { category } = useAppSelector(state => state.categoryReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        dispatch(getAllCategoryAsync());
    }, []);

    return (
        <ListGroup className={css.groupList}>
            <p>Каталог товарів</p>
            {category && category.map(value =>
                <ListGroup.Item
                    key={value.name}
                    className={params.category === value.name ? css.linkedin : "" }
                    action href={`/shop/${value.name}`}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/shop/${value.name}`);
                    }}
                    active={params.category === value.name}
                    // variant="secondary"
                >
                    {value.name}
                </ListGroup.Item>)
            }
        </ListGroup>
    );
};
