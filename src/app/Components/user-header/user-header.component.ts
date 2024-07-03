import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserTripsComponent } from '../User/user-trips/user-trips.component';
import { EditProfileComponent } from '../User/edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(private router: Router){}
  userLogout() {
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }
}
