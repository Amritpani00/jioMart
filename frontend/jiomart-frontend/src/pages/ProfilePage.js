import React from 'react';
import { Container, Card } from 'react-bootstrap';
import AuthService from '../services/auth.service';

const ProfilePage = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </Card.Header>
                <Card.Body>
                    <p>
                        <strong>Id:</strong> {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
