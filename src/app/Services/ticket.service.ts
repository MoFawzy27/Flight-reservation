import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly ticketURL = 'http://localhost:3000/ticket';

  constructor(private readonly http: HttpClient) { }

  // CRUD methods for ticket
  getTickets() {
    return this.http.get(this.ticketURL);
  }

  getTicketById(id: number) {
    return this.http.get(`${this.ticketURL}/${id}`);
  }
  getTicketByuserId(userID:string){
    const params = new HttpParams().set('user_id', userID);
    return this.http.get(this.ticketURL, { params });
  }

  getFlightTickets(flightId:string){
    return this.http.get(this.ticketURL+`?flight_id=${flightId}`);
  }

  updateTicket(id: any, ticket: any){
    return this.http.put(`${this.ticketURL}/${id}`, ticket).subscribe(
      data => {
        console.log('Success:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  deleteTicket(ticketID:string){
    return this.http.delete(this.ticketURL+`/${ticketID}`)
  }
  deleteTicketByuserId(userId:any){
    const params = new HttpParams().set('user_id', userId.toString());
    return this.http.delete(`${this.ticketURL}/`, { params });

    //get user tickets 
    //get tickets id's 
    //for loop delete
    
  }

  insertTicket(ticket: any) {
    return this.http.post(`${this.ticketURL}`, ticket);
  }

}




 

 

