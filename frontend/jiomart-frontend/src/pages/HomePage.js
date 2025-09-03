import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ProductService.getAllProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            {/* Banner Slider */}
            <Carousel className="mb-4">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x200.png?text=Festival+Season+Sale"
                        alt="Festival Season Sale"
                    />
                    <Carousel.Caption>
                        <h3>Festival Season Sale</h3>
                        <p>Get up to 50% off on selected items.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x200.png?text=Today's+Big+Sale"
                        alt="Today's Big Sale"
                    />
                    <Carousel.Caption>
                        <h3>Today's Big Sale</h3>
                        <p>Save 10% on all vegetables.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h2 className="mb-4">Featured Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <Alert variant="danger">Error fetching products.</Alert>}

            <Row>
                {products.slice(0, 4).map(product => ( // Show first 4 products as featured
                    <Col key={product.id} md={3} className="mb-4">
                        <Card>
                            <Link to={`/product/${product.id}`}>
                                <Card.Img variant="top" src={product.imageUrl || 'https://via.placeholder.com/150.png?text=Product'} />
                            </Link>
                            <Card.Body>
                                <Card.Title as={Link} to={`/product/${product.id}`}>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>${product.price.toFixed(2)}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
