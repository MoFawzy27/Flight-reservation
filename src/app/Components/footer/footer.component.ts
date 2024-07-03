import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  url = "/assets/CompanyImgs/"
  images = [this.url+"egypt.png" ,this.url+"American_Airlines.png" ,this.url+"British.png" ,this.url+"Emirates.png" 
    ,this.url+"France.png" ,this.url+"Lufthansa.png" ,this.url+"morocco.png" ,this.url+"Qutar.png" , this.url+"Swiss.png" ,
    this.url+"turkish.png" 
  ]
}
