import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from '../../Services/MainService';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../Services/flight.service';
import { TicketService } from '../../Services/ticket.service';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-book-confirm-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  BookUpdateComponent],
    providers:[TicketService, FlightService, NotificationService],
  templateUrl: './book-confirm-update.component.html',
  styleUrl: './book-confirm-update.component.css'
})
export class BookConfirmUpdateComponent implements OnInit{
  @Output() confirmDetailsEvent = new EventEmitter<void>();
  @Output() closeMiniWindowEvent = new EventEmitter<void>();

  @Input() selectedCabin: string | undefined;
  @Input() NumberOfTickets: number = 0;
  @Input() TotalPrice: number | undefined;
  @Input() adultsTickets: number = 0;
  @Input() ChildrenTickets: number = 0;

  @Input() ticketID:number=0;

  check=false;
ticket:any;
Oneticket: any;
userID:any;
ID=0;
flightID:any;
flight:any;
constructor(private route: ActivatedRoute, private TService:TicketService, private FService:FlightService,
  private notification: NotificationService, private router:Router){
  this.ID = route.snapshot.params["id"];
  this.userID=localStorage.getItem('userId');
}
  closeMiniWindow(): void {
    // Emit an event to notify booking component to hide the mini window
    this.closeMiniWindowEvent.emit();
  }

  confirmDetails(): void {
    this.confirmDetailsEvent.emit();
    // Emit an event to notify booking component about confirmation
  }
  
  ngOnInit() {
    this.TService.getTicketById(this.ID).subscribe({
      next: (data: any) => {
        this.Oneticket = data;
      },
      error: () => {
        console.error("Error!!, Can't get flight by id");
      },
    });
  }

  update(){

    this.ticket={
      "id": this.ID,
      "user_id": this.userID,
      "flight_id": this.Oneticket.flight_id,
      "selectedCabin": this.selectedCabin,
      "NumberOfTickets": this.NumberOfTickets,
      "TotalPrice":this.TotalPrice,
      "tickets": {
        "adults": this.adultsTickets,
        "children": this.ChildrenTickets
      }
    }
    
    this.TService.updateTicket(this.ticket.id,this.ticket);
    this.check=true;
  }
  confirm(): boolean {
    if (this.check) {
      this.notification.showNotification('Updated Successfully', 'rgb(36, 36, 88)'); setTimeout(() => {
        this.router.navigate(['allflights']);
      }, 2000);
      return true;
    } else return false;
  }
  notify() {
    return this.notification;
  }
}
