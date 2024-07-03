import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../Services/ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from '../../../Services/flight.service';
import { map } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';

@Component({
  selector: 'app-user-trips',
  standalone: true,
  imports: [HttpClientModule,
    RouterModule,
    CommonModule,
    DefaultHeaderComponent],
  providers:[TicketService,FlightService,DatePipe],
  templateUrl: './user-trips.component.html',
  styleUrl: './user-trips.component.css'
})
export class UserTripsComponent implements OnInit {

  userID:any;
  flight:any;
  tickets:any=[];
  // flights:any=[];
  Previoustickets:any=[];
  UpCommingtickets:any=[];
  menuType: string = 'default';
  constructor(private Tservice:TicketService,private FService:FlightService,private datePipe:DatePipe){}

  ngOnInit(): void {
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
   this.userID = localStorage.getItem('userId');

   this.Tservice.getTicketByuserId(this.userID).subscribe({
    next:(data)=>{
      console.log(data);
      this.tickets=data;
      console.log(this.tickets);
      this.tickets.map((ticket:any) => {
        this.FService.getFlightById(ticket.flight_id)
        
       .subscribe({
        next:(res) =>{
          this.flight=res;
          ticket.flight=res
          // this.flights.push({tid:ticket.id,fdt:this.f.DateTime});
          // console.log(this.flights);
          this.splitTicketsOnDT(ticket,this.flight.DateTime);
        }
        
        
      });
      
    })

   } ,error:(err)=> {
     console.log(err);
   }
   
  });

  }

  DTgreater(date:string){
     const dateFormat='yyyy-MM-dd HH:MM';
     var today = new Date();
    //  console.log(today);
     
     var myDate=new Date(date);
    //  console.log(myDate);
     
     return myDate > today;
  }
  splitTicketsOnDT(ticket:any,date:string){
      ticket.date=date;
      console.log(ticket);
      
      if(this.DTgreater(date))
        {
          
          this.UpCommingtickets.push(ticket);
        }
        else{
          this.Previoustickets.push(ticket);
        }
    
  }
}
