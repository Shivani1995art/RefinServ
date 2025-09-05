// src/services/auth/AuthService.ts
import ApiService from '../api/ApiService';
import ApiUrls from '../api/ApiUrls';

class GetUsers {
  static async getUsers() {
    
    return ApiService.get(ApiUrls.getUserSer);
  }

}

export default GetUsers;
