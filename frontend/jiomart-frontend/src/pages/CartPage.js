import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import CartService from '../services/cart.service';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartItems(CartService.getCart());
        setCartTotal(CartService.getCartTotal());
    }, []);

    const handleRemove = (productId) => {
        CartService.removeFromCart(productId);
        setCartItems(CartService.getCart());
        setCartTotal(CartService.getCartTotal());
    };

    const handleQuantityChange = (productId, quantity) => {
        CartService.updateQuantity(productId, quantity);
        setCartItems(CartService.getCart());
        setCartTotal(CartService.getCartTotal());
    };

    return (
        <Container>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is currently empty. <Link to="/">Go Shopping</Link></p>
            ) : (
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product.id}>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Image src={item.product.imageUrl || 'https://via.placeholder.com/50.png?text=P'} alt={item.product.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.product.price.toFixed(2)}</Col>
                                        <Col md={3}>
                                            <Button size="sm" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button size="sm" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant="danger" size="sm" onClick={() => handleRemove(item.product.id)}>Remove</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</Card.Title>
                                <Card.Text>
                                    <strong>Total: ${cartTotal.toFixed(2)}</strong>
                                </Card.Text>
                                <div className="d-grid">
                                    <Button variant="primary">Proceed to Checkout</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;
