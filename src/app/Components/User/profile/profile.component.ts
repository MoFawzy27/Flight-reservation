import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { TicketService } from '../../../Services/ticket.service';
import { NotificationService } from '../../../Services/notification.service';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule,
    DefaultHeaderComponent,
    
    
  ],
  providers:[UserService,DatePipe,NotificationService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userID:any;
  user:any;
  tickets:any=[];
  isAdmin=false;
  menuType: string='default';
  
  constructor(private UService:UserService, private notification:NotificationService,private myActivated:ActivatedRoute,private router:Router,private TService:TicketService ){


    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.isAdmin = isAdminStr === 'true' ? true : false;
    }

    if(this.isAdmin){
      this.userID  = myActivated.snapshot.params["id"];
    }else{
      // this.user=localStorage.getItem('CurrentUser');
      this.userID = localStorage.getItem('userId');
    }
    
    console.log(this.userID);
    
    this.UService.getUserById(this.userID).subscribe({
      next:(data)=>{
        console.log(data)
        this.user = data;
        // this.user.date_of_birth = datePipe.transform(this.user.date_of_birth , dateFormat);

      },
      
      error:(err)=>{console.log(err)}
    })
 
  
  }


  deleteUser(){
    if (confirm("Are you sure that you want to delete this account?")){
     this.UService.deleteUserById(this.userID).subscribe({
       next:(value)=> {
           console.log(value);
          
           this.TService.getTicketByuserId(this.userID).subscribe({
             next:(value)=> {
             
             this.tickets=value;
             console.log(this.tickets)
             this.tickets.map((ticket:any) => {
              this.TService.deleteTicket(ticket.id).subscribe({
                next:(value)=>{
                 console.log(value);

                }
              });
             })
              this.notification.showNotification("Account deleted seccesssfully","red");
              this.router.navigate(['/sign-in']);
           }
           })
           
         },error:(err)=>{
           console.log(err);
           alert(err);
         }
       })
    }
   }
   ngOnInit() {
    // console.log("oninit!!!!!!!!!!");
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
  
  }
   notify(){
    return this.notification;
  }

}
