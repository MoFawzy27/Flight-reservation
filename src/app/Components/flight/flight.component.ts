import { Component, Input } from '@angular/core';
import { FlightsComponent } from '../flights/flights.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from '../default-header/default-header.component';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [FlightsComponent,
    RouterModule,
    CommonModule
    ,DefaultHeaderComponent
  ],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {
  @Input() oneFlight:any;

  menuType: string = 'default';
  ngOnInit() {
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
  }
}
