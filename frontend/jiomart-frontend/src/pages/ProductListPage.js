import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';
import ProductCard from '../components/ProductCard';

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
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductListPage;
