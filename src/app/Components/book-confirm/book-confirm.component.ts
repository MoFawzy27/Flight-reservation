import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { MainService } from '../../Services/MainService';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-confirm-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BookFlightComponent,
    FormsModule,
    HttpClientModule,
    BookFlightComponent,
    BookUpdateComponent,
  ],
  providers: [MainService, NotificationService],
  templateUrl: './book-confirm.component.html',
  styleUrl: './book-confirm.component.css',
})
export class ConfirmBookComponent implements OnInit {
  @Output() confirmDetailsEvent = new EventEmitter<void>();
  @Output() closeMiniWindowEvent = new EventEmitter<void>();

  @Input() selectedCabin: string | undefined;
  @Input() NumberOfTickets: number = 0;
  @Input() TotalPrice: number | undefined;
  @Input() adultsTickets: number = 0;
  @Input() ChildrenTickets: number = 0;

  ticket: any;
  check = false;
  Tickets: any;
  flightID = 0;
  userID: any;
  closeMiniWindow(): void {
    // Emit an event to notify booking component to hide the mini window
    this.closeMiniWindowEvent.emit();
  }

  confirmDetails(): void {
    this.confirmDetailsEvent.emit();
    // Emit an event to notify booking component about confirmation
  }

  constructor(
    myActivated: ActivatedRoute,
    private UService: MainService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.flightID = myActivated.snapshot.params['id'];
    this.userID = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.UService.getTickets().subscribe({
      next: (data) => {
        this.Tickets = data;
      },
      error: (err) => {
        console.log(' Error');
      },
    });
  }

  generateId(): string {
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }

  Add() {
    this.ticket = {
      id: this.generateId(),
      user_id: this.userID,
      flight_id: this.flightID,
      selectedCabin: this.selectedCabin,
      NumberOfTickets: this.NumberOfTickets,
      TotalPrice: this.TotalPrice,
      tickets: {
        adults: this.adultsTickets,
        children: this.ChildrenTickets,
      },
    };

    this.UService.insertTicket(this.ticket).subscribe((ticketInstance) =>
      this.Tickets.push(ticketInstance)
    ); //adding ticket to database
    this.check = true;
    this.confirmDetailsEvent.emit(); //send to booking component
  }
  confirm(): boolean {
    if (this.check) {
      this.notification.showNotification('Booked Successfully', 'rgb(36, 36, 88)');
      setTimeout(() => {
        this.router.navigate(['allflights']);
      }, 2000);
      return true;
    } else return false;
  }
  notify() {
    return this.notification;
  }
}
