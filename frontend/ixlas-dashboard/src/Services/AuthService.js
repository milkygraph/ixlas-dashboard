import axios from 'axios';

const backend_root = 'http://localhost:8080';

class AuthService {
    async login(username, password, setLoggedIn) {
        try {
            const response = await axios.post(backend_root + '/login', {
                username,
                password
            });

            localStorage.setItem('user', JSON.stringify(response.data));
            setLoggedIn(true);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    static getInstance() {
        return new AuthService();
    }

    logout(setLoggedIn) {
        localStorage.removeItem('user');
        setLoggedIn(false);
    }

    async register(username, email, password) {
        try {
            const response = await axios.post(backend_root + '/signup', {
                username,
                email,
                password
            });

            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getAcessToken() {
        return `Bearer ${this.getCurrentUser().access_token}`
    }
}

export default AuthService.getInstance();
