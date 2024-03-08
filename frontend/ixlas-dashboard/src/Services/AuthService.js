import axios from 'axios';

const backend_root = 'http://localhost:8080';

class AuthService {
    async login(username, password) {
        try {
            const response = await axios.post(backend_root + '/login', {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        } catch (error) {
            // Handle specific error scenarios or log the error
            console.error('Login failed:', error);

            // Re-throw the error to propagate it to the calling code
            throw error;
        }
    }

    static getInstance() {
        return new AuthService();
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post('/api/auth/register', {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default AuthService.getInstance();
