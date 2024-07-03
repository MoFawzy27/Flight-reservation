import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlightService } from '../../Services/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { DefaultHeaderComponent } from '../default-header/default-header.component';


@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [HttpClientModule,
    RouterModule,
    CommonModule,
    BookFlightComponent,
    DefaultHeaderComponent
  ],
  providers:[FlightService],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent implements OnInit {
  ID: string = "";
  flight: any;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ID = params['id'];
      this.loadFlightDetails();
    });
  }

  loadFlightDetails() {
    this.flightService.getFlightById(this.ID).subscribe({
      next: (data: any) => {
        this.flight = data;
      },
      error: () => {
        console.error("Error!!, Can't get flight by id");
      },
    });
  }

  navigateToBookingPage() {
    this.router.navigateByUrl(`/booking/${this.flight.id}`);
  }
}