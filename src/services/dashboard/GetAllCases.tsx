// src/services/auth/AuthService.ts
import ApiService from '../api/ApiService';
import ApiUrls from '../api/ApiUrls';

class GetAllCases {
  static async getCases() {
    
    return ApiService.get(ApiUrls.getCases);
  }

}

export default GetAllCases;
