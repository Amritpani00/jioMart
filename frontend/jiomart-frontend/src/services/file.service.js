import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/files';

class FileService {
    upload(file) {
        let formData = new FormData();
        formData.append('file', file);

        return axios.post(API_URL + '/upload', formData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export default new FileService();
