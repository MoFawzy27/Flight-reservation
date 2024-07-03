import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddFlightComponent } from './Components/Admin/add-flight/add-flight.component';
import { ShowFlightsComponent } from './Components/Admin/show-flights/show-flights.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { UserTripsComponent } from './Components/User/user-trips/user-trips.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlightComponent } from './Components/flight/flight.component';
import { FlightDetailsComponent } from './Components/flight-details/flight-details.component';
import { FlightsComponent } from './Components/flights/flights.component';
import { FormsModule } from '@angular/forms';
import { DefaultHeaderComponent } from './Components/default-header/default-header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProfileComponent } from './Components/User/profile/profile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,
    CommonModule,HttpClientModule,
    FormsModule,
    AddFlightComponent,FlightComponent,FlightDetailsComponent,
    FlightsComponent,ShowFlightsComponent,
  EditProfileComponent,UserTripsComponent,
    FooterComponent,DefaultHeaderComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlyAwayPortal';
  url = "/assets/CompanyImgs/"
  images = [this.url+"egypt.png" ,this.url+"American_Airlines.png" ,this.url+"British.png" ,this.url+"Emirates.png" 
    ,this.url+"France.png" ,this.url+"Lufthansa.png" ,this.url+"morocco.png" ,this.url+"Qutar.png" , this.url+"Swiss.png" ,
    this.url+"turkish.png" 
  ]

  menuType: string = 'default';
  ngOnInit() {
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr&&window.location.href.indexOf("admin") > -1) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
  }
}
