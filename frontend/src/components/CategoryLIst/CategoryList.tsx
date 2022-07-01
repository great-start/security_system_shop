import React, { FC, useEffect, useState } from 'react';
import { categoryService } from '../../services';
import { ICategory } from '../../interaces';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListGroup, Nav } from 'react-bootstrap';

const CategoryList: FC = () => {

    const [categories, setCategories]  = useState<ICategory[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await categoryService.getAll();
            setCategories(data);
        }
        getCategories();
    },[])

    return (
        <ListGroup>
            <p>Каталог товарів</p>
            {categories && categories.map(value =>
                <ListGroup.Item key={value.name} action href={`/shop/${value.name}`} onClick={e => {
                    e.preventDefault();
                    navigate(`/shop/${value.name}`);
                }}>
                    {value.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default CategoryList;