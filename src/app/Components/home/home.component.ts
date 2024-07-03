import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlightService } from '../../Services/flight.service';
import { FlightsComponent } from '../flights/flights.component';
import { FlightComponent } from '../flight/flight.component';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,
    FlightsComponent,FlightComponent,ContactComponent,
    DefaultHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}


  menuType: string = 'default';
  ngOnInit() {
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
  }

  
  

  
}
