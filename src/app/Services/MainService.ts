import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  getUserByEmail(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private readonly baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) { }

  // CRUD methods for User
  getUsers() {
    return this.http.get(`${this.baseUrl}/User`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/User/${id}`);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/User/${id}`, user);
  }

  deleteUserById(id: number) {
    return this.http.delete(`${this.baseUrl}/User/${id}`);
  }

  insertUser(user: any) {
    return this.http.post(`${this.baseUrl}/User`, user);
  }



  // CRUD methods for Flight
 
  // CRUD methods for ticket
  getTickets() {
    return this.http.get(`${this.baseUrl}/ticket`);
  }

  getTicketById(id: number) {
    return this.http.get(`${this.baseUrl}/ticket/${id}`);
  }

  updateTicket(id: number, ticket: any) {
    return this.http.put(`${this.baseUrl}/ticket/${id}`, ticket);
  }

  deleteTicketById(id: number) {
    return this.http.delete(`${this.baseUrl}/ticket/${id}`);
  }

  insertTicket(ticket: any) {
    return this.http.post(`${this.baseUrl}/ticket`, ticket);
  }

}
