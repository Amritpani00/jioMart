import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import ProductService from '../services/product.service';
import AuthService from '../services/auth.service';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
            navigate('/');
        } else {
            ProductService.getAllProducts()
                .then(response => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [navigate]);

    const handleDelete = (id) => {
        ProductService.deleteProduct(id)
            .then(() => {
                setProducts(products.filter(p => p.id !== id));
            })
            .catch(error => {
                setError(error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <Alert variant="danger">An error occurred.</Alert>;
    }

    return (
        <Container>
            <h2 className="my-4">Admin Dashboard</h2>
            <Link to="/admin/product/new" className="btn btn-primary mb-3">Add New Product</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link to={`/admin/product/${product.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
