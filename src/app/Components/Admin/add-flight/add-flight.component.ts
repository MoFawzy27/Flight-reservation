import { AfterViewInit, Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FlightService } from '../../../Services/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../../Services/notification.service';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,CommonModule,
    DefaultHeaderComponent
  ],
  providers:[FlightService , NotificationService ],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent  implements AfterViewInit {
  flight = {
    Title: '',
    from: '',
    to: '',
    price: 0,
    DateTime: '',
    description: '',
    n_seats: 0,
    img_path: '',
    companyName: '',
    countryImg_path: ''
  };

  @ViewChild('myElementRef', { static: false }) myElementRef!: ElementRef;

  constructor(private router: Router, private flightService: FlightService) {}

  ngAfterViewInit() {}

  getCompanyImgPath() {
    const company = this.flight.companyName;
    if (company === 'Egypt Air') {
      this.flight.img_path = '/assets/CompanyImgs/egypt.png';
    } else if (company === 'QATAR Airways') {
      this.flight.img_path = '/assets/CompanyImgs/Qatar.png';
    } else if (company === 'Fly Emirates') {
      this.flight.img_path = '/assets/CompanyImgs/Emirates.png';
    } else if (company === 'Turkish Airways') {
      this.flight.img_path = '/assets/CompanyImgs/turkish.png';
    } else if (company === 'Air France') {
      this.flight.img_path = '/assets/CompanyImgs/France.png';
    } else if (company === 'Swiss Air') {
      this.flight.img_path = '/assets/CompanyImgs/Swiss.png';
    } else if (company === 'Lufthansa airways') {
      this.flight.img_path = '/assets/CompanyImgs/Lufthansa.png';
    } else if (company === 'American Airlines') {
      this.flight.img_path = '/assets/CompanyImgs/American_Airlines.png';
    } else if (company === 'morocco Airlines') {
      this.flight.img_path = '/assets/CompanyImgs/morocco.png';
    } else if (company === 'British Airways') {
      this.flight.img_path = '/assets/CompanyImgs/British.png';
    }
  }
  getDestinationImgPath() {
    const to = this.flight.to;
    if (to === 'Cairo') {
      this.flight.countryImg_path = '/assets/CountryImages/cairo.jpg';
    } else if (to === 'Milano') {
      this.flight.countryImg_path = '/assets/CountryImages/milano.webp';
    } else if (to === 'Paris') {
      this.flight.countryImg_path = '/assets/CountryImages/paris.jpg';
    } else if (to === 'London') {
      this.flight.countryImg_path = '/assets/CountryImages/london.jpg';
    } else if (to === 'New York') {
      this.flight.countryImg_path = '/assets/CountryImages/ny.avif';
    } else if (to === 'Bali') {
      this.flight.countryImg_path = '/assets/CountryImages/bali.jpeg';
    } else if (to === 'Tokyo') {
      this.flight.countryImg_path = '/assets/CountryImages/tokyo.jpg';
    } else if (to === 'Istanbul') {
      this.flight.countryImg_path = '/assets/CountryImages/istanbul.webp';
    } else if (to === 'Dubai') {
      this.flight.countryImg_path = '/assets/CountryImages/dubai.webp';

    }
  }
  addFlight() {
    console.log("Add Flight method called");
    console.log("Flight details:", this.flight);
    
    this.getCompanyImgPath();
    this.getDestinationImgPath();

    this.flightService.insertFlight(this.flight).subscribe({
      next: () => {
        console.log("Flight added successfully");
        this.showPopup();
      },
      error: (err) => {
        console.error('Error adding flight:', err);
      }
    });
  }

  showPopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.add('open-popup');
  }

  closePopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.remove('open-popup');
    this.router.navigate(['/admin/flights']);
  }

  imagePathInvalid = false;

  onFileSelected(event: any): string | null {
    const file = event.target.files[0];
    if (file) {
      let path = URL.createObjectURL(file);
      return path;
    } else {
      return null;
    }
  }
}