import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MainService } from '../../Services/MainService';
import { ConfirmBookComponent } from '../book-confirm/book-confirm.component';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { FlightService } from '../../Services/flight.service';
import { DefaultHeaderComponent } from '../default-header/default-header.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ConfirmBookComponent,
    FlightDetailsComponent,
    DefaultHeaderComponent
  ],
  providers: [provideNativeDateAdapter(), MainService, FlightService],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css',
})
export class BookFlightComponent implements OnInit{
  selectedCabin="";
  flightID:any;
  
  NumberOfTickets=0;
   adultsTickets=0;
   ChildrenTickets=0;
  price=50;
  TotalPrice=0;
  flight:any;
  userID:any;
  validation=true;


  constructor(private route: ActivatedRoute,private router: Router,private FService:FlightService  ){//clears el data inputs
  this.selectedCabin="";
  this.NumberOfTickets=0;
   this.adultsTickets=0;
   this.ChildrenTickets=0;
  this.TotalPrice=0;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.flightID = params['id'];
    });

    this.FService.getFlightById(this.flightID).subscribe({
      next: (data: any) => {
        this.flight = data;
        console.log(this.flight.price);
      },
      error: () => {
        console.error("Error!!, Can't get flight by id");
      },
    });
  }

  add(ID: number) {
    if (ID == 1) {
      this.adultsTickets++;
    }
   else {
      this.ChildrenTickets++;
    }

    this.totalTickets(); //calculate total number of tickets
  }

  Subtract(ID: number) {
    if (ID == 1) {
      this.adultsTickets--;
      if (this.adultsTickets < 0) this.adultsTickets = 0;

    } else {
      this.ChildrenTickets--;

      if (this.ChildrenTickets < 0) this.ChildrenTickets = 0;
    }
    this.totalTickets();
  }

  totalTickets() {
    this.NumberOfTickets =
      this.ChildrenTickets + this.adultsTickets;
    this.TotalPrice = this.NumberOfTickets * this.flight.price;
  }

  flag: boolean = false; //to hide/show the mini window of confirmation

  toggleMiniWindow(): void {
    this.flag = !this.flag;
    if (this.flag) {
      //validation
      if (this.selectedCabin == '') {
        this.validation = false;
        this.flag = false;
      } else if (
        this.adultsTickets == 0 &&
        this.ChildrenTickets == 0
      ) {
        this.validation = false;
        this.flag = false;
      } else {
        this.validation = true;
      }
      
    }
  }
  closeMiniWindow(): void {
    this.flag = false;
  }
}
