import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilsService {

  constructor(private loginService: LoginService, private http: HttpClient, private userService: UsersService) { }
  getProfils(): Observable<any> {
    return this.http.get(`${this.loginService.baseUrl}/admin/profils`,this.loginService.httpOptions);
  }

}
