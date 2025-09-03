import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import CartService from '../services/cart.service';

const Header = () => {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setCartCount(CartService.getCartCount());
    }, []);

    // This is a simple way to update the cart count.
    // A more robust solution would use a state management library or context.
    const handleCartUpdate = () => {
        setCartCount(CartService.getCartCount());
    };

    useEffect(() => {
        // Listen for a custom event that signals a cart update
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);


    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate('/');
        window.location.reload();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">JioMart</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            Cart <Badge bg="secondary">{cartCount}</Badge>
                        </Nav.Link>
                    </Nav>
                    {currentUser ? (
                        <Nav>
                            <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                {currentUser.roles.includes('ROLE_ADMIN') && (
                                    <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
