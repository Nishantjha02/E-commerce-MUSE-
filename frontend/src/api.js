const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};

// API request helper with authentication
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication API
export const authAPI = {
    register: async (userData) => {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (response.token) {
            setAuthToken(response.token);
        }
        return response;
    },

    login: async (credentials) => {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        if (response.token) {
            setAuthToken(response.token);
        }
        return response;
    },

    logout: () => {
        removeAuthToken();
    },

    isAuthenticated: () => {
        return !!getAuthToken();
    }
};

// Products API
export const productsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
        return await apiRequest(`/products/${id}`);
    },

    getCategories: async () => {
        return await apiRequest('/categories');
    },

    search: async (query, category = '') => {
        const params = { search: query };
        if (category) params.category = category;
        return await apiRequest(`/products?${new URLSearchParams(params)}`);
    }
};

// Cart API
export const cartAPI = {
    get: async () => {
        return await apiRequest('/cart');
    },

    add: async (productId, quantity = 1) => {
        return await apiRequest('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        });
    },

    update: async (productId, quantity) => {
        return await apiRequest('/cart/update', {
            method: 'PUT',
            body: JSON.stringify({ productId, quantity }),
        });
    },

    remove: async (productId) => {
        return await apiRequest(`/cart/remove/${productId}`, {
            method: 'DELETE',
        });
    }
};

// Orders API
export const ordersAPI = {
    create: async (orderData) => {
        return await apiRequest('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    },

    getAll: async () => {
        return await apiRequest('/orders');
    },

    getById: async (id) => {
        return await apiRequest(`/orders/${id}`);
    }
};

// User API
export const userAPI = {
    getProfile: async () => {
        return await apiRequest('/user/profile');
    },

    updateProfile: async (userData) => {
        return await apiRequest('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

    changePassword: async (passwordData) => {
        return await apiRequest('/user/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }
};

export { getAuthToken, setAuthToken, removeAuthToken };