import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { ContactComponent } from '../contact/contact.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    
    DefaultHeaderComponent,
    CommonModule,
    ContactComponent,
    SignUpComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {

}
