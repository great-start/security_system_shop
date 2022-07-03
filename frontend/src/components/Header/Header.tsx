import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <Navbar style={{backgroundColor: '#f6f6f6'}}>
            <Container className="my-2">
                <Nav className={css.navLink}>
                    <NavLink to={'/'} className={css.navLink} style={{marginRight: 50}}>SECSYSTEMS</NavLink>
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
