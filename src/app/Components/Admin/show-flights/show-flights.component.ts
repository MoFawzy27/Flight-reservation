import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlightService } from '../../../Services/flight.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../Services/ticket.service';
import { NotificationService } from '../../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';

@Component({
  selector: 'app-show-flights',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule,
    RouterLink,
    CommonModule,
    DefaultHeaderComponent],
  providers:[FlightService,TicketService,NotificationService],
  templateUrl: './show-flights.component.html',
  styleUrl: './show-flights.component.css'
})
export class ShowFlightsComponent implements OnInit , AfterViewInit {
  originalFlights:any=[];
  flights:any = [];
  nFlights:number = 0;
  nAirLines:number=0;

  tickets:any;
  flight:any;
  openDropdownIndex: any = null;
  isDropdownOpen: boolean = false;
  menuType: string = 'default';
  searchWord = '';


  @ViewChild('myElementRef', { static: false }) myElementRef!: ElementRef;
  constructor(private router:Router, private flightService: FlightService,private ticketService:TicketService,private notification:NotificationService) {}
  ngOnInit(){
   
    this.flightService.getFlights().subscribe({
      next:(data)=>{
        this.originalFlights =data
        this.flights=data
        this.nFlights=this.flights.length
        this.nAirLines= this.getUniqueCompanyCount(this.flights)
      },
      error:(err)=>{alert(err)}
    })
  }

  ngAfterViewInit() {}

  

  search(){
    console.log(this.searchWord);
    
    if (this.searchWord){
      this.flights = this.searchFlightsByWord(this.searchWord);
      this.nAirLines= this.getUniqueCompanyCount(this.flights)
      this.nFlights=this.flights.length}
    else{
      this.flights=this.originalFlights
      this.nAirLines= this.getUniqueCompanyCount(this.flights)
      this.nFlights=this.flights.length}
    }


  searchFlightsByWord(word: string): any[] {
    const searchWord = word.toLowerCase();

    // filter flights where any attribute contains the search word
    const foundFlights = this.originalFlights.filter((flight: any) => {
         return Object.values(flight).some((value: any) => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchWord);
            }
            return false;
        });
    });

    return foundFlights;
}

  getUniqueCompanyCount(flights:any):number {
    const uniqueCompanies: string[] = [];

    flights.forEach((flight: { companyName: string; }) => {
        if (!uniqueCompanies.includes(flight.companyName)) {
            uniqueCompanies.push(flight.companyName);
        }
    });
    return uniqueCompanies.length;
}

  redirectAddFlight(){
     this.router.navigate(['/admin/flights/add'])
  }

  
  toggleDropdown(index: any) {
    if (this.openDropdownIndex === index) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.isDropdownOpen = true;
      this.openDropdownIndex = index;
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.openDropdownIndex = null;
  }
  showPopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.add('open-popup');
  }
  closePopup() {
    const popupElement = this.myElementRef.nativeElement;
    popupElement.classList.remove('open-popup');
  }
  deleteFlight(id:string){
    this.flightService.deleteFlightById(id).subscribe({
      next:() =>{
        this.showPopup();
        setTimeout(() => {
          this.closePopup();
        }, 1500);
        this.flights = this.flights.filter((ele:any)=>{
          return ele.id != id;
        })
        
      },
      error : (err) => {
        console.error('Error adding flight:', err);
      }
    })
  }

  onDestinationChange() {
    // If the destination is empty, reset the search state
    
      this.search();
  }

  notify(){
    return this.notification
  }
}
