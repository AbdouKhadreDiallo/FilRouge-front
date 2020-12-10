import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public baseUrl = 'http://127.0.0.1:8000/api';
  public autorizationName = 'fil_rouge';
  public localStorage = window.localStorage;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(login: string, pass: string): any {
    const credentials =
      {
        email: login,
        password: pass,
      };
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  public getToken(login: string, pass: string): void {
    this.login(login, pass).subscribe(
      (      token: { token: any; }) => {
        //console.log(token);
        localStorage.setItem('token', token.token);
      },
      (      httpError: { error: { message: any; }; }) => console.log(httpError.error.message)
    );
  }
  decodeToken() {
      return  this.localStorage.getItem('token') ? jwt_decode(this.localStorage.getItem('token')) : null;
  }

  public getTokenName(): string {
    return this.autorizationName;
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'ROLE_ADMIN': {
        this.router.navigate(['admin']);
        break;
      }
      case 'ROLE_FORMATEUR': {
        this.router.navigate(['formateur']);
        break;
      }
      case 'ROLE_APPRENANT': {
        this.router.navigate(['apprenant']);
        break;
      }
      default: {
        this.router.navigate(['']);
        break;
      }
    }
  }
}
