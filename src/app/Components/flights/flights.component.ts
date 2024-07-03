import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../Services/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightComponent } from '../flight/flight.component';
import { DefaultHeaderComponent } from '../default-header/default-header.component';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule,
    FlightComponent,
    DefaultHeaderComponent
  ],
  providers:[FlightService],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {
  searchedFlights: any;
  destination: string='';
  originalFlights:any;
  flights: any;
  flightsError: string = '';
  searchError: string = '';
  searchWord = '';

  constructor(private flightService: FlightService) {}
  ngOnInit() {
    this.loadAllFlights();
  }

  loadAllFlights() {
    this.flightService.getFlights().subscribe({
      next: (data:any) => {
        if (data && data.length > 0) {
          this.flights = data;
          this.originalFlights=this.flights;
          this.flightsError = ''; // Clear any previous error message
        } else {
          this.flights = [];
          this.flightsError = 'There are no flights.';
        }
      },
      error: (error) => {
        this.flightsError = 'Error fetching flights.';
        console.error('Error fetching flights:', error);
      },
    });
  }

  search(){
    if (this.searchWord){
      this.flights = this.searchFlightsByWord(this.searchWord);}
    else{
      this.flights=this.originalFlights
    }
  }


  searchFlightsByWord(word: string): any[] {
    const searchWord = word.toLowerCase();

    // filter flights where any attribute contains the search word
    const foundFlights = this.originalFlights.filter((flight: any) => {
         return Object.values(flight).some((value: any) => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchWord);
            }
            return false;
        });
    });

    return foundFlights;
}
  searchFlights() {
    if (this.destination.trim() !== '') {
      const searchQuery = this.destination.trim().toLowerCase(); // Convert the search query to lower case
      this.flightService.getFlights().subscribe({
        next:(data:any)=> {
          if (data && data.length > 0) {
            this.searchedFlights = data.filter((flight: any) =>
              flight.to.toLowerCase().includes(searchQuery) // Convert des property to lower case and check for inclusion
            );
            if (this.searchedFlights.length > 0) {
              this.searchError = ''; // Clear any previous error message
            } else {
              this.searchError = 'No flights found for this destination.';
            }
          } else {
            this.searchedFlights = [];
            this.searchError = 'No flights found.';
          }
        },
          
          error:(error) => {
            this.searchedFlights = [];
            this.searchError = 'Error fetching flights.';
            console.error('Error fetching flights:', error);
          }
        });
      }
    else {
      // If the search query is empty, reset the search state
      this.resetSearch();
    }
  }
  

  onDestinationChange() {
    // If the destination is empty, reset the search state
      this.search();
    
  }

  private resetSearch() {
    this.searchedFlights = null;
    this.searchError = '';
    this.loadAllFlights();
  }
}
