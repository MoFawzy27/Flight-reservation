import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MainService } from '../../Services/MainService';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { UserService } from '../../Services/user.service';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { NotificationService } from '../../Services/notification.service';
import { userForm } from '../User/custom-validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers:[UserService,NotificationService],
  imports: [ RouterLink,
    CommonModule,
    SignInComponent,
    ReactiveFormsModule,
    FormsModule
    ,DefaultHeaderComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private userServices: UserService,
    private router : Router,
    private notification: NotificationService
  ){}
  showPassword: boolean = false;
  menuType: string = 'default';
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
signupForm = userForm;
// new FormGroup({
//   fName: new FormControl("",[Validators.required,Validators.minLength(3)]),
//   lName: new FormControl("",[Validators.required,Validators.minLength(3)]),
//   nationalID: new FormControl("",[Validators.required,Validators.minLength(14)]),
//   phoneNum: new FormControl("",[Validators.required,Validators.minLength(11)]),
//   email:       new FormControl("",[Validators.required,Validators.email]),
//   date_of_birth:       new FormControl("" ,[Validators.required]),
//   password: new FormControl("",[Validators.required,Validators.minLength(8)]),
// });


getErrorMessage(form: FormGroup, controlName: string, errorType: string): string {
  const control = form.get(controlName);
  if (control && control.hasError(errorType) && (control.dirty || control.touched)) {
    switch (errorType) {
      case 'required':
        return `Input is required`;
      case 'minlength':
        const requiredLength = control.errors?.['minlength']?.['requiredLength'];
        return `Input must be at least ${requiredLength} characters`;
      case 'email':
        return `Must be in email format`;
      case 'pattern':
      
        return `Input format is invalid`;
      case 'min':
        return `Input must be at least ${control.errors?.['min']?.['min']}`;
      case 'date':
        return `Input Date must atleast 15 years ago`;

      default:
        return '';
    }
  }
  return '';
}


ngOnInit() {
  const isAdminStr = localStorage.getItem('isAdmin');
  if (isAdminStr) {
    this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
  }
}

onSubmit() {
  if (this.signupForm.invalid) {
    this.notification.showNotification('Something Invalid', 'red');;
    return;
  }

  const email = this.signupForm.get('email')?.value;

  this.userServices.getUserByEmail(email as string).subscribe({
    next: (response) => {
      if (response.length > 0) {
        this.notification.showNotification('Email already existed.', 'red');
      } else {
        this.userServices.insertUser(this.signupForm.value).subscribe({
          next: (response) => {
            this.notification.showNotification('Signed up Successfully', 'green');
            setTimeout(() => {
              this.router.navigateByUrl('/sign-in');
            }, 2000);
            
          },
          error: (error) => {
            this.notification.showNotification('Signing up Failed', 'red');
          }
        });
      }
    },
    error: (error) => {
      this.notification.showNotification('Signing up Failed', 'red');
    }
  });
}
notify(){
  return this.notification;
}

}

