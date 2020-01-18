import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const API_KEY = 'AIzaSyCz3A9JJysSmx9jB4HQkJIDOBT1OO3OPlU';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }
}
