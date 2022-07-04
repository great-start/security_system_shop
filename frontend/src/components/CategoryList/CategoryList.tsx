import React, { FC, useEffect, useState } from 'react';
import { categoryService } from '../../services';
import { ICategory } from '../../interaces';
import { useNavigate, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import css from './CategoryList.module.css';

export const CategoryList: FC = () => {

    const [categories, setCategories]  = useState<ICategory[]>([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await categoryService.getAll();
            setCategories(data);
        }
        getCategories();
    },[])

    return (
        <ListGroup className={css.groupList}>
            <p>Каталог товарів</p>
            {categories && categories.map(value =>
                <ListGroup.Item key={value.name}
                                className={params.category === value.name ? css.linkedin : "" }
                                action
                                href={`/shop/${value.name}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/shop/${value.name}`);
                                }}
                                active={params.category === value.name}
                                variant="secondary">
                    {value.name}
                </ListGroup.Item>)
            }
        </ListGroup>
    );
};
