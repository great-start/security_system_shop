import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
    return (
        <Navbar style={{backgroundColor: 'lightgray'}}>
            <Container className="my-2">
                <Nav className={css.navLink}>
                    <NavLink to={'/'} className={css.navLink} style={{marginRight: 50}}>SECSYSTEMS</NavLink>
                    <NavLink to={'/shop'} className={css.isActive ? css.activeClassName : undefined} >Магазин</NavLink>
                    <NavLink to={'/install'} className={css.isActive ? css.activeClassName : undefined}>Послуги</NavLink>
                </Nav>
                <Nav className='ml-auto'>
                    <Button style={{ color: 'black' }} className='ml-10' variant={'secondary'}>Увійти</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;