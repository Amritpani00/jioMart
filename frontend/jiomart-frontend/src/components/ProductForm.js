import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
        stock: 0
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id !== 'new') {
            setLoading(true);
            ProductService.getProductById(id)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(e => {
                    setError('Error loading product.');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const action = id === 'new'
            ? ProductService.createProduct(product)
            : ProductService.updateProduct(id, product);

        action.then(() => {
            setMessage(`Product ${id === 'new' ? 'created' : 'updated'} successfully!`);
            setLoading(false);
            setTimeout(() => navigate('/admin'), 2000);
        }).catch(e => {
            setError('An error occurred.');
            setLoading(false);
        });
    };

    if (loading && id !== 'new') {
        return <p>Loading product...</p>;
    }

    return (
        <Container>
            <h2 className="my-4">{id === 'new' ? 'Add Product' : 'Edit Product'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Product'}
                </Button>
                {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </Container>
    );
};

export default ProductForm;
