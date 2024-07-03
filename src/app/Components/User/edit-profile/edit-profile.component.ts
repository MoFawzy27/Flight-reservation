import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule ,DatePipe } from '@angular/common';
import { passwordConfirmationValidator, passwordCorrectValidator, userForm } from '../custom-validator';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../../../Services/ticket.service';
import { DefaultHeaderComponent } from '../../default-header/default-header.component';


import { NotificationService } from '../../../Services/notification.service';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    DefaultHeaderComponent,
  
   
  ],
  providers:[UserService,TicketService
    ,DatePipe,NotificationService],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{

  ID :any;
  max_date:any;
  user:any;//undefined
  PassbtnEnable=false;
  menuType: string = 'default';

  account_info_form:FormGroup=userForm;

  change_pass_form = new FormGroup({
      oldPass:new FormControl('', Validators.required),
      newPass: new FormControl('', [Validators.required,Validators.minLength(8)]),
      repeatNPass: new FormControl('', [
        Validators.required,Validators.minLength(8)]),},
      {validators:passwordConfirmationValidator('newPass','repeatNPass')}
    );  
 
  constructor(private UService:UserService ,private TService:TicketService,private notification:NotificationService,private router:Router, private datePipe:DatePipe){

    const dateFormat = 'yyyy-MM-dd';
    this.max_date=datePipe.transform(new Date(), dateFormat);
    this.ID = localStorage.getItem('userId');
    this.user=localStorage.getItem("CurrentUser");
    this.user=JSON.parse(this.user);
    console.log(this.user);
    this.user.date_of_birth = datePipe.transform(this.user.date_of_birth , dateFormat);

    this.account_info_form.controls["fName"].setValue(this.user.fName);
    this.account_info_form.controls["lName"].setValue (this.user.lName);
    this.account_info_form.controls["email"].setValue (this.user.email);
    this.account_info_form.controls["phoneNum"].setValue (this.user.phoneNum);
    this.account_info_form.controls["nationalID"].setValue(this.user.nationalID);
    this.account_info_form.controls["date_of_birth"].setValue (this.user.date_of_birth);
    this.account_info_form.removeControl('password');
    this.change_pass_form.addValidators(passwordCorrectValidator("oldPass",this.user.password));
    // this.UService.getUserById(this.ID).subscribe({
    //   next:(data)=>{
    //     console.log(data)
    //     this.user = data;
    //     this.user.date_of_birth = datePipe.transform(this.user.date_of_birth , dateFormat);

    //     this.account_info_form.controls["fName"].setValue(this.user.fName);
    //     this.account_info_form.controls["lName"].setValue (this.user.lName);
    //     this.account_info_form.controls["email"].setValue (this.user.email);
    //     this.account_info_form.controls["phoneNum"].setValue (this.user.phoneNum);
    //     this.account_info_form.controls["nationalID"].setValue(this.user.nationalID);
    //     this.account_info_form.controls["date_of_birth"].setValue (this.user.date_of_birth);
    //     this.account_info_form.removeControl('password');
    //     this.change_pass_form.addValidators(passwordCorrectValidator("oldPass",this.user.password));
    //   },
      
    //   error:(err)=>{console.log(err)}
    // })
 
  }

  ngOnInit() {
    // console.log("oninit!!!!!!!!!!");
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr) {
      this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
    }
  
  }
  
  

  get LNameValid(){
    return this.account_info_form.controls["lName"].valid;
  }
  get FNameValid(){
    return this.account_info_form.controls["fName"].valid;
  }
  get EmailValid(){
    return this.account_info_form.controls["email"].valid;
  }
  get PhoneValid(){
    return this.account_info_form.controls["phoneNum"].valid;
  }
  get date_of_birthValid(){
    return this.account_info_form.controls["date_of_birth"].valid;
  }
  get nationalIDValid(){
    return this.account_info_form.controls["nationalID"].valid;
  }
 

  get PassValid(){

    return this.change_pass_form.controls['oldPass'].value !== "";
    
  }

  
  
  // changePass(){
  //   if(this.change_pass_form.valid )
  //     {
  //       this.user.password=this.change_pass_form.controls["newPass"].value;
  //       alert("Password changed successfully.");
  //     }
      
  //     console.log(this.change_pass_form.status);
  //     // console.log(this.PassbtnEnable);
      
     
  // }

  SaveChanges(){
    console.log(this.account_info_form.status);
    this.user.fName = this.account_info_form.controls["fName"].value;
    this.user.lName = this.account_info_form.controls["lName"].value;
    this.user.email = this.account_info_form.controls["email"].value;
    this.user.phoneNum = this.account_info_form.controls["phoneNum"].value;
    this.user.nationalID=this.account_info_form.controls["nationalID"].value
    this.user.date_of_birth = this.account_info_form.controls["date_of_birth"].value;
    if(this.change_pass_form.valid )
    {
        this.user.password=this.change_pass_form.controls["newPass"].value;
        // alert("Password changed successfully.");
    }
    this.UService.updateUser(this.ID,this.user).subscribe({
    next:(value)=> {
        console.log(value);
        localStorage.setItem('CurrentUser',JSON.stringify(value));

        this.notification.showNotification("Changes saved successfully","green");
        // this.router.navigate(['/']);
      },error:(err)=>{
        console.log(err);
        
        alert(err);
      }
    })
  }
  
  notify(){
    return this.notification;
  }
}
