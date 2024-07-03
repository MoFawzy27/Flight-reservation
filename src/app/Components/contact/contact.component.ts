import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    DefaultHeaderComponent,
    CommonModule,
    HomeComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
 
}
