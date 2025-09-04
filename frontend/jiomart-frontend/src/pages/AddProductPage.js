import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';

const AddProductPage = () => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const handleAddProduct = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);
        setSuccessful(false);

        const product = {
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category,
            stock: parseInt(stock)
        };

        ProductService.createProduct(product).then(
            (response) => {
                setMessage('Product added successfully!');
                setSuccessful(true);
                setLoading(false);
                setTimeout(() => navigate('/'), 2000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false);
            }
        );
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Add Product</h2>
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock quantity"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Add Product</span>
                            </Button>
                        </div>

                        {message && (
                            <Form.Group className="mt-3">
                                <Alert variant={successful ? 'success' : 'danger'}>
                                    {message}
                                </Alert>
                            </Form.Group>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProductPage;
