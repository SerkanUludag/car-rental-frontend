import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessToken } from 'src/app/models/auth/accessToken';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlLogin = 'https://localhost:44371/api/auth/login';
  apiUrlRegister = 'https://localhost:44371/api/auth/register';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<AccessToken>> {
    return this.httpClient.post<SingleResponseModel<AccessToken>>(
      this.apiUrlLogin,
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<AccessToken>> {
    return this.httpClient.post<SingleResponseModel<AccessToken>>(
      this.apiUrlRegister,
      registerModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
