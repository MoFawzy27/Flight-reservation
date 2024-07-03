import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../Services/notification.service';
import { TicketService } from '../../../Services/ticket.service';
import { FlightService } from '../../../Services/flight.service';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';

@Component({
  selector: 'app-show-flight-tickets',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    DefaultHeaderComponent
  ],
  providers:[TicketService,NotificationService,FlightService],
  templateUrl: './show-flight-tickets.component.html',
  styleUrl: './show-flight-tickets.component.css'
})
export class ShowFlightTicketsComponent implements OnInit {
  originalTickets:any;
  tickets :any;
  flight:any;
  nTickets:number=0;
  totalPrice=0;
  
  openDropdownIndex: any = null;
  isDropdownOpen: boolean = false;
  menuType: string = 'default';
  flightID = "";

  @ViewChild('myElementRef', { static: false }) myElementRef!: ElementRef;
  constructor(private router:Router,myActivated:ActivatedRoute , private ticketService: TicketService, private flightService: FlightService,private notification:NotificationService) {
    this.flightID = myActivated.snapshot.params["id"] ;
    this.flight = this.getFlight(this.flightID)
    
  }
  ngOnInit(){
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
    this.ticketService.getFlightTickets(this.flightID).subscribe({
      next:(data)=>{
        this.tickets = data;
        this.originalTickets = this.tickets;
        this.nTickets = this.getN_Tickets(this.tickets)
        this.totalPrice = this.getTotalPrice(this.tickets)
        
        

      },
      error:(err)=>{alert(err)}
    })
    
    
  }


  showTicket(id:number){

  }

  getFlight(id:string){
    this.flightService.getFlightById(id).subscribe({
      next:(data)=> {
          this.flight = data
      },
      error(err) {
          alert(err)
      },
    })
  }

  getTotalPrice(tickets:any):number{
    let sum =0
    tickets.forEach((ele:any) => {
      sum+= ele.TotalPrice
    });

    return sum;
    
  }

  getN_Tickets(tickets:any):number{
    let sum =0
    tickets.forEach((ele:any) => {
      sum+= ele.NumberOfTickets
    });

    return sum;
  }

  showPopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.add('open-popup');
  }
  closePopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.remove('open-popup');
  }

  deleteTicket(id:string){
    this.ticketService.deleteTicket(id).subscribe({
      next:() =>{

        this.showPopup();
        setTimeout(() => {
          this.closePopup();
        }, 2000);
        this.tickets = this.tickets.filter((ele:any)=>{
          return ele.id != id;
        })
        
      },
      error : (err) => {
        console.error('Error adding flight:', err);
      }
    })


  }
  notify()
{
  return this.notification
}

toggleDropdown(index: any) {
  if (this.openDropdownIndex === index) {
    this.isDropdownOpen = !this.isDropdownOpen;
  } else {
    this.isDropdownOpen = true;
    this.openDropdownIndex = index;
  }
}

closeDropdown() {
  this.isDropdownOpen = false;
  this.openDropdownIndex = null;
}

}
