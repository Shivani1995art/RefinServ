// src/services/auth/AuthService.ts
import ApiService from '../api/ApiService';
import ApiUrls from '../api/ApiUrls';

class AuthService {
  static async login(email: string, password: string) {
    const payload = { email, password };
    return ApiService.post(ApiUrls.login, payload);
  }

}

export default AuthService;
