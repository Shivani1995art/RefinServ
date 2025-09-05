import api from './Apiconfig';


class ApiService {
  static async get(url: string, params: any = {}, config: any = {}) {
    try {
      const response = await api.get(url, { params, ...config });
      return response.data;
    } catch (error: any) {
      console.error('GET Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  static async post(url: string, body: any = {}, config: any = {}) {
    try {
      const response = await api.post(url, body, config);
      return response.data;
    } catch (error: any) {
      console.error('POST Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  static async put(url: string, body: any = {}, config: any = {}) {
    try {
      const response = await api.put(url, body, config);
      return response.data;
    } catch (error: any) {
      console.error('PUT Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  static async delete(url: string, config: any = {}) {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error: any) {
      console.error('DELETE Error:', error?.response?.data || error.message);
      throw error;
    }
  }
}

export default ApiService;
