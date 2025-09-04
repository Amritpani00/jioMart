import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartService from '../services/cart.service';

const ProductCard = ({ product }) => {
    const handleAddToCart = () => {
        CartService.addToCart(product);
    };

    return (
        <Card className="h-100">
            <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.imageUrl || 'https://via.placeholder.com/150.png?text=Product'} />
            </Link>
            <Card.Body>
                <Card.Title as={Link} to={`/product/${product.id}`}>{product.name}</Card.Title>
                <Card.Text>
                    <strong>${product.price.toFixed(2)}</strong>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" className="w-100" onClick={handleAddToCart}>Add to Cart</Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;
