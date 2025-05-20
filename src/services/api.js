import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Default data for when API is not available
const defaultData = {
    news: [
        {
            id: 1,
            title: 'Welcome to Our Party',
            content: 'This is a sample news article. The actual content will be loaded from the API when available.',
            image: '/images/placeholder.jpg',
            created_at: new Date().toISOString()
        }
    ],
    events: [
        {
            id: 1,
            title: 'Upcoming Party Event',
            description: 'This is a sample event. The actual content will be loaded from the API when available.',
            image: '/images/placeholder.jpg',
            date: new Date().toISOString()
        }
    ],
    gallery: {
        images: [
            {
                id: 1,
                title: 'Sample Image',
                description: 'This is a sample image. The actual content will be loaded from the API when available.',
                image: '/images/placeholder.jpg',
                created_at: new Date().toISOString()
            }
        ],
        videos: [
            {
                id: 1,
                title: 'Sample Video',
                description: 'This is a sample video. The actual content will be loaded from the API when available.',
                video_url: '/videos/sample.mp4',
                thumbnail: '/images/placeholder.jpg',
                created_at: new Date().toISOString()
            }
        ]
    },
    leadership: [
        {
            id: 1,
            name: 'Sample Leader',
            position: 'Sample Position',
            image: '/images/placeholder.jpg',
            bio: 'This is a sample leadership profile. The actual content will be loaded from the API when available.'
        }
    ]
};

// Location API
export const locationApi = {
    getCounties: async () => {
        try {
            const response = await api.get('/counties/');
            return response.data;
        } catch (error) {
            console.error('Error fetching counties:', error);
            return [];
        }
    },
    getConstituencies: async (countyId) => {
        try {
            const response = await api.get(`/constituencies/?county=${countyId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching constituencies:', error);
            return [];
        }
    },
    getWards: async (constituencyId) => {
        try {
            const response = await api.get(`/wards/?constituency=${constituencyId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching wards:', error);
            return [];
        }
    }
};

// Membership API
export const membershipApi = {
    create: async (membershipData, isAuthenticated = false) => {
        try {
            // Create a new instance for public endpoints to avoid interceptor
            const publicApi = axios.create({
                baseURL: API_BASE_URL,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Use different endpoints for authenticated and public requests
            const endpoint = isAuthenticated ? '/memberships/' : '/memberships/public/';
            const apiInstance = isAuthenticated ? api : publicApi;
            
            const response = await apiInstance.post(endpoint, membershipData);
            return response.data;
        } catch (error) {
            console.error('Error creating membership:', error);
            throw error;
        }
    }
};

// News API
export const newsApi = {
    getAll: async () => {
        try {
            const response = await api.get('/news/');
            //console.log('Raw news API response:', response);
            // Ensure we have the correct data structure
            const data = response.data?.results || response.data || [];
            return { 
                data: {
                    results: Array.isArray(data) ? data : [data]
                }
            };
        } catch (error) {
            console.error('Error fetching news:', error);
            return { data: { results: defaultData.news } };
        }
    },
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/news/?category=${category}`);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching news by category:', error);
            return { data: defaultData.news };
        }
    },
    getById: async (id) => {
        try {
            //console.log('Fetching news with ID:', id);
            const response = await api.get(`/news/${id}/`);
            //console.log('Raw news detail API response:', response);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching news by id:', error);
            return { data: defaultData.news[0] };
        }
    }
};

// Events API
export const eventsApi = {
    getAll: async () => {
        try {
            const response = await api.get('/events/');
            //console.log('Raw events API response:', response);
            // Ensure we have the correct data structure
            const data = response.data?.results || response.data || [];
            return { 
                data: {
                    results: Array.isArray(data) ? data : [data]
                }
            };
        } catch (error) {
            console.error('Error fetching events:', error);
            return { data: { results: defaultData.events } };
        }
    },
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/events/?category=${category}`);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching events by category:', error);
            return { data: defaultData.events };
        }
    },
    getById: async (id) => {
        try {
            //console.log('Fetching event with ID:', id);
            const response = await api.get(`/events/${id}/`);
            //console.log('Raw event detail API response:', response);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching event by id:', error);
            return { data: defaultData.events[0] };
        }
    }
};

// Gallery API
export const galleryApi = {
    getAll: async () => {
        try {
            const response = await api.get('/gallery/');
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching gallery:', error);
            return { data: [...defaultData.gallery.images, ...defaultData.gallery.videos] };
        }
    },
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/gallery/?category=${category}`);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching gallery by category:', error);
            return { data: [...defaultData.gallery.images, ...defaultData.gallery.videos] };
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/gallery/${id}/`);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching gallery item by id:', error);
            return { data: defaultData.gallery.images[0] };
        }
    }
};

// Leadership API
export const leadershipApi = {
    getAll: async () => {
        try {
            const response = await api.get('/leadership/');
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching leadership:', error);
            return { data: defaultData.leadership };
        }
    },
    getByPosition: async (position) => {
        try {
            const response = await api.get(`/leadership/?position=${position}`);
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching leadership by position:', error);
            return { data: defaultData.leadership };
        }
    }
};

// Shop API
export const shopApi = {
    // Products
    getProducts: async (params = {}) => {
        try {
            const response = await api.get('/products/', { params });
            // Ensure we return an array even if the API returns an object
            return Array.isArray(response.data) ? response.data : response.data.results || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return []; // Return empty array on error
        }
    },

    getProduct: async (slug) => {
        try {
            const response = await api.get(`/products/${slug}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    getSimilarProducts: async (categoryId) => {
        try {
            const response = await api.get(`/products/`, {
                params: { category: categoryId }
            });
            // Ensure we return an array
            return Array.isArray(response.data) ? response.data : response.data.results || [];
        } catch (error) {
            console.error('Error fetching similar products:', error);
            return []; // Return empty array on error
        }
    },

    // Reviews are part of the product detail
    getProductReviews: async (productId) => {
        try {
            const response = await api.get(`/products/${productId}/`);
            return response.data.reviews || [];
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return []; // Return empty array on error
        }
    },

    addProductReview: async (productId, reviewData) => {
        try {
            const response = await api.post(`/products/${productId}/add_review/`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    },

    // Orders
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders/', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Pickup Locations (assuming they're stored as a separate model)
    getPickupLocations: async (params = {}) => {
        try {
            const response = await api.get('/pickup-locations/', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching pickup locations:', error);
            // Return empty array as fallback
            return [];
        }
    },

    // Payment
    initiatePayment: async (orderId, paymentMethod) => {
        try {
            const response = await api.post(`/orders/${orderId}/initiate_payment/`, {
                payment_method: paymentMethod
            });
            return response.data;
        } catch (error) {
            console.error('Error initiating payment:', error);
            throw error;
        }
    },

    verifyPayment: async (orderId, transactionId) => {
        try {
            const response = await api.post(`/orders/${orderId}/verify_payment/`, {
                transaction_id: transactionId
            });
            return response.data;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }
};

export default api; 