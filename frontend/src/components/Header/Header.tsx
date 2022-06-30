import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
    return (
        <Navbar bg='light' variant='dark'>
            <Container>
                <Nav className={css.navLink}>
                    <NavLink to={'/'}>SECSYSTEM</NavLink>
                    <NavLink to={'/shop'} className={css.isActive ? css.activeClassName : undefined} >Магазин</NavLink>
                    <NavLink to={'/install'} className={css.isActive ? css.activeClassName : undefined}>Замовити роботи</NavLink>
                </Nav>
                <Nav className='ml-auto'>
                    <Button style={{ color: 'black' }} className='ml-10' variant={'secondary'}>Увійти</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;