import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/products/';

class ProductService {
    getAllProducts() {
        return axios.get(API_URL);
    }

    getProductById(id) {
        return axios.get(API_URL + id);
    }

    createProduct(product) {
        return axios.post(API_URL, product, { headers: authHeader() });
    }

    updateProduct(id, product) {
        return axios.put(API_URL + id, product, { headers: authHeader() });
    }

    deleteProduct(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }
}

export default new ProductService();
