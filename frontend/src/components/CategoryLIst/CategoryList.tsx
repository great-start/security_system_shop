import React, { FC, useEffect, useState } from 'react';
import { categoryService } from '../../services';
import { ICategory } from '../../interaces';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const CategoryList: FC = () => {

    const [categories, setCategories]  = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await categoryService.getAll();
            setCategories(data);
        }
        getCategories();
    },[])

    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column">
                <p style={{paddingLeft: 0}}>Каталог товарів</p>
                {categories && categories.map(category =>
                    <NavLink key={category.name} to={`${category.name}`} >
                        {category.name}
                    </NavLink>
                )}
                {/*<Nav.Link href="/home">Active</Nav.Link>*/}
                {/*<Nav.Link eventKey="link-1">Link</Nav.Link>*/}
                {/*<Nav.Link eventKey="link-2">Link</Nav.Link>*/}
                {/*<Nav.Link eventKey="disabled" disabled>*/}
                {/*    Disabled*/}
                {/*</Nav.Link>*/}
            </Nav>
        </div>
    );
};

export default CategoryList;