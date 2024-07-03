import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Route, Router } from '@angular/router';
import { MainService } from '../../Services/MainService';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { ConfirmBookComponent } from '../book-confirm/book-confirm.component';
import { BookConfirmUpdateComponent } from '../book-confirm-update/book-confirm-update.component';
import { FlightService } from '../../Services/flight.service';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { TicketService } from '../../Services/ticket.service';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookFlightComponent,
    FormsModule,
    HttpClientModule,
    BookConfirmUpdateComponent,
    DefaultHeaderComponent
  ],
    providers:[TicketService, FlightService, TicketService],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent {
  selectedCabin="";
  NumberOfTickets=0;
   adultsTickets=0;
   TeenageTickets=0;
   ChildrenTickets=0;
  price=0;
  TotalPrice=0;
  ticket:any;
  ID :any;
  ticketID:any;
  flight:any;
  flightID:any;
  flag:boolean=false;//to hide/show the mini window of confirmation 

  constructor(myActivated:ActivatedRoute, private FService:FlightService, private route:Router,private TService: TicketService){
    this.ID = myActivated.snapshot.params["id"];//ticket id
    this.ticketID=this.ID;
  }
  
  ngOnInit() {
    this.TService.getTicketById(this.ID).subscribe({
      next:(data)=>{        
        this.ticket = data;
        this.flightID=this.ticket.flight_id;
        this.loadFlightDetails();
        
      },
      error:(err)=>{console.log(err)}
    });
  }

  loadFlightDetails() {
    this.FService.getFlightById(this.ticket.flight_id).subscribe({
      next: (data: any) => {
        this.flight = data;
        },
      error: () => {
        console.error("Error!!, Can't get flight by id");
      },
    });
  }

  totalTickets(){
    this.ticket.NumberOfTickets=this.ticket.tickets.children+this.ticket.tickets.adults;
    this.ticket.TotalPrice=this.ticket.NumberOfTickets*this.flight.price;
  }
  
  add(ID:number){
    
    if(ID==1){
      this.ticket.tickets.adults++;
    }
    else{
      this.ticket.tickets.children++;
    }

    this.totalTickets();//calculate total number of tickets
  }

  Subtract(ID:number){
    
    if(ID==1){
      this.ticket.tickets.adults--;
      if(this.ticket.tickets.adults<0)
        this.ticket.tickets.adults=0;
    }
    else{
      this.ticket.tickets.children--;
      
    if(this.ticket.tickets.children<0)
      this.ticket.tickets.children=0;
    }
    this.totalTickets();
  }

  toggleMiniWindow(): void {
      this.flag = !this.flag;
  }
  closeMiniWindow(): void {
    this.flag = false;
  }
}