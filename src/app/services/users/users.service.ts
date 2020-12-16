import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/user.model';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+ this.loginService.getBrutToken()
    })
  };


  getAllUsers(): Observable<any>{
    return this.http.get(`${this.loginService.baseUrl}/admin/users`,this.loginService.httpOptions);
  }
  //add apprenant
  addApprenant(data: any){
    return this.http.post<any>(`${this.loginService.baseUrl}/apprenants`,JSON.stringify(data),this.httpOptions);
  }

  //add Admin
  addFormateur(data: Users){
    return this.http.post<any>(`${this.loginService.baseUrl}/formateur`,JSON.stringify(data),this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.loginService.baseUrl}/admin/users/${id}`,this.httpOptions);
  }
  get(id: number): Observable<any> {
    return this.http.get(`${this.loginService.baseUrl}/admin/users/${id}`,this.httpOptions);
  }
}
