import axios from 'axios';
import { getAppContext } from '../../contexts/AppContext';


const apiUrl = 'https://q51ccms3-8000.inc1.devtunnels.ms';

const Apiconfig = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
Apiconfig.interceptors.request.use(
  async (config) => {
    // ✅ Don't attach token for login request

    console.log('=========config.url=======',config.url);

    if (!config.url.includes('/login')) {
      try {
        const { user } = getAppContext(); 
        console.log('=========token=======',user);
        const token = user?.token;       // adjust if token key is different

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn('Token fetch failed:', err);
      }
    }

    console.debug('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
// Apiconfig.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('Response Error:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });
//     return Promise.reject(error);
//   }
// );
Apiconfig.interceptors.response.use(
  (response) => response,
  (error) => {

     console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    const { logout } = getAppContext();

    if (error.response?.status === 401) {
      console.warn('⚠️ Session expired, redirecting to login...');

      // 1. Clear user session
      logout?.();

      // 2. Reset navigation to Login screen
     // reset('Login'); // ✅ using your NavigationService
    }

    return Promise.reject(error);
  }
);
export default Apiconfig;
