import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <Navbar style={{backgroundColor: 'rgba(123, 171, 231, 0.23)'}}>
            <Container className="my-2">
                <Nav className={css.navLink}>
                    <NavLink to={'/'} className={css.navLink}
                             style={{marginRight: 50, color: 'rgba(31,119,206,0.6)', fontSize: 'large'}}>SECSYSTEMS</NavLink>
                    <NavLink to={'/shop'} className={css.isActive ? css.activeClassName : undefined} >Магазин</NavLink>
                    <NavLink to={'/install'} className={css.isActive ? css.activeClassName : undefined}>Послуги</NavLink>
                </Nav>
                <Nav className='ml-auto gap-3'>
                    <Button style={{ color: 'black' }} className='ml-10' variant={'outline-secondary'}>Корзина</Button>
                    <Button style={{ color: 'black' }} className='ml-10' variant={'outline-secondary'} onClick={e => {
                        e.preventDefault();
                        navigate('auth');
                    }}>Кабінет</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};
