class CartService {
    getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    }

    addToCart(product, quantity = 1) {
        const cart = this.getCart();
        const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }

        this.saveCart(cart);
    }

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.product.id !== productId);
        this.saveCart(cart);
    }

    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const productIndex = cart.findIndex(item => item.product.id === productId);

        if (productIndex > -1) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                cart[productIndex].quantity = quantity;
                this.saveCart(cart);
            }
        }
    }

    getCartCount() {
        return this.getCart().reduce((count, item) => count + item.quantity, 0);
    }

    getCartTotal() {
        return this.getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}

export default new CartService();
