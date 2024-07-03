import { Component } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router, RouterLink } from '@angular/router';
import { AuthGuard } from '../../Services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.css'
})
export class DefaultHeaderComponent {
  authStatus: string = 'guest';
constructor(private authService:AuthGuard, private router:Router){}

ngOnInit(): void {
  this.authService.authStatus$.subscribe(status => {
    this.authStatus = status;
  });
}
logout() {
  this.authService.logout();
  this.router.navigate(['sign-in']);
}
}
