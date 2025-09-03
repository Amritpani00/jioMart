import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
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
            <h2 className="mb-4">All Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <Alert variant="danger">Error fetching products.</Alert>}

            <Row>
                {products.map(product => (
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

export default ProductListPage;
