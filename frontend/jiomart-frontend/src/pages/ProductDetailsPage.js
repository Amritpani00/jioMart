import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';
import CartService from '../services/cart.service';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        ProductService.getProductById(id)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        CartService.addToCart(product);
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
            // Optionally, navigate to cart page
            // navigate('/cart');
        }, 2000); // Message disappears after 2 seconds
    };

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <Alert variant="danger">Error loading product.</Alert>;
    }

    if (!product) {
        return <Alert variant="warning">Product not found.</Alert>;
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Card.Img src={product.imageUrl || 'https://via.placeholder.com/400.png?text=Product+Image'} />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>${product.price.toFixed(2)}</h3>
                    <p>In Stock: {product.stock}</p>
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                    {addedToCart && <Alert variant="success" className="mt-3">Added to cart!</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetailsPage;
