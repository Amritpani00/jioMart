import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import AuthService from '../services/auth.service';

const RegisterPage = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);
        setSuccessful(false);

        AuthService.register(username, email, password).then(
            (response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                setMessage("User registered successfully! Redirecting to profile...");
                setSuccessful(true);
                setLoading(false);
                setTimeout(() => navigate('/profile'), 2000);
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
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleRegister}>
                        {!successful && (
                            <div>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign Up</span>
                                    </Button>
                                </div>
                            </div>
                        )}

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

export default RegisterPage;
