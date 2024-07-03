import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly baseUrl = 'http://localhost:3000/User';
  constructor(private readonly http: HttpClient ) { }

  // CRUD methods for User
  getUsers() {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: any):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateUser(id: any, user: any) {
    console.log(user);
    
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUserById(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`)
    // .pipe(
    //   map(() => {
    //     return this.TService.deleteTicketByuserId(id);
    //   })
    // );
    
  }
  
  getUserByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/?email=${email}`);
  }

  insertUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }
}
