import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly baseUrl = 'http://localhost:3000/Flight';

  constructor(private readonly http: HttpClient) { }


  getFlights() {
    return this.http.get(this.baseUrl);
  }
  searchByDestination(destination: string):Observable <any>{
    return this.http.get(`${this.baseUrl}?to=${destination}`);
  }

  getFlightById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateFlight(id: string, flight: any) {
    return this.http.put(`${this.baseUrl}/${id}`, flight);
  }

  deleteFlightById(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  insertFlight(flight: any) {
    console.log("kkkkkkkkkkkkkkkkkk");
    
    return this.http.post(this.baseUrl, flight);
  }



}
