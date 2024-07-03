import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlightService } from '../../../Services/flight.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../../Services/notification.service';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';


@Component({
  selector: 'app-update-flight',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    DefaultHeaderComponent
  ],
  providers:[FlightService,NotificationService],
  templateUrl: './update-flight.component.html',
  styleUrl: './update-flight.component.css'
})
export class UpdateFlightComponent implements AfterViewInit {
    flight : any ;
    ID= ""
    @ViewChild('myElementRef', { static: false }) myElementRef!: ElementRef;
    constructor(private router:Router ,myActivated:ActivatedRoute , private backend: FlightService){
      this.ID = myActivated.snapshot.params["id"] ;
    }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

    ngOnInit(){
      this.backend.getFlightById(this.ID).subscribe({
        next:(data)=> {
          this.flight = data
        },
        error:(err)=>{
          console.log(err)
        }

      })
    }
    showPopup() {
      const popupElement = this.myElementRef.nativeElement;
      popupElement.classList.add('open-popup');
     
    }
    
    getCompanyImgPath(){
      let company = this.flight.companyName
      if (company=="Egypt-Air"){
        this.flight.img_path="/assets/CompanyImgs/egypt.png"
      }
      if (company=="QATAR-Air"){
        this.flight.img_path="/assets/CompanyImgs/Qutar.png"
      }
      if (company=="Emirits-Air"){
        this.flight.img_path="/assets/CompanyImgs/Emarits.png"
      }
      if (company=="Turkish-Air"){
        this.flight.img_path="/assets/CompanyImgs/turkish.png"
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
    update(){
      this.getCompanyImgPath();
      this.getDestinationImgPath();
      this.backend.updateFlight(this.ID, this.flight).subscribe({
        next:()=>{
          this.showPopup();
          setTimeout(()=>{this.router.navigate(['/admin']);},2000)
          
        },
        error:(err)=>{console.log(err)}
      })
    }


}

