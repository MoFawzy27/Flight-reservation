import { RouterModule, Routes } from '@angular/router';
import { UpdateFlightComponent } from './Components/Admin/update-flight/update-flight.component';
import { ShowFlightsComponent } from './Components/Admin/show-flights/show-flights.component';
import { AddFlightComponent } from './Components/Admin/add-flight/add-flight.component';
import { ShowFlightTicketsComponent } from './Components/Admin/show-flight-tickets/show-flight-tickets.component';
import { FlightsComponent } from './Components/flights/flights.component';
import { FlightDetailsComponent } from './Components/flight-details/flight-details.component';
import { BookFlightComponent } from './Components/book-flight/book-flight.component';
import { BookUpdateComponent } from './Components/book-update/book-update.component';
import { HomeComponent } from './Components/home/home.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { UserTripsComponent } from './Components/User/user-trips/user-trips.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AuthGuard } from './Services/auth-guard.service';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './Components/User/profile/profile.component';

export const routes: Routes = [
    // Admin Panel
    //{ path: "", redirectTo: "admin", pathMatch: "full" }, // Redirect to admin by default
    { path: "admin", component: ShowFlightsComponent, canActivate:[AuthGuard]},
    { path: "admin/flights", component: ShowFlightsComponent , canActivate:[AuthGuard]},
    { path: "admin/flights/update/:id", component: UpdateFlightComponent, canActivate:[AuthGuard] },
    { path: "admin/flights/add", component: AddFlightComponent, canActivate:[AuthGuard] },
    { path: "admin/flights/tickets/:id", component: ShowFlightTicketsComponent, canActivate:[AuthGuard] } ,
    { path: "admin/flights/tickets/user/:id", component: ProfileComponent, canActivate:[AuthGuard] } ,


    // *****************************************
    {path: "flights/tickets",component:ShowFlightTicketsComponent},
    {path:"allflights",component:FlightsComponent},
    {path:"allflights/:id",component:FlightDetailsComponent},
    {path:"booking/:id", component:BookFlightComponent},
    {path:"updateBooking/:id",component:BookUpdateComponent},
    // **********************************************
    {path: "sign-in", component:SignInComponent},
    {path: "sign-up", component:SignUpComponent},
    {path: "", component:HomeComponent},   
    {path: "contact", component:ContactComponent}, 
    {path: "about", component:AboutComponent},
    //********************************** 
    {path: "profile", component:ProfileComponent},
    {path: "profile/edit", component:EditProfileComponent},
    {path: "my-trips", component:UserTripsComponent}
   

    
]

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule { }
