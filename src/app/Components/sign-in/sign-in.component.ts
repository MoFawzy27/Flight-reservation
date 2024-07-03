import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MainService } from '../../Services/MainService';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { NotificationService } from '../../Services/notification.service';
import { AuthGuard } from '../../Services/auth-guard.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  providers:[UserService,NotificationService],
  imports: [RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DefaultHeaderComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private userServices: UserService,
    private router : Router,
    private notification: NotificationService,
    private authService : AuthGuard
  ){}

  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
signinForm = new FormGroup({
  email: new FormControl("",[Validators.required,Validators.email]),
  password: new FormControl("",[Validators.required,Validators.minLength(8)]),
})

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
      default:
        return '';
    }
  }
  return '';
}
menuType: string = 'default';
ngOnInit() {
  const isAdminStr = localStorage.getItem('isAdmin');
  if (isAdminStr) {
    this.menuType = isAdminStr === 'true' ? 'admin' : 'user';
  }
}

onSubmit(){
  if (this.signinForm.invalid) {
    alert("Something wrong. Try again.")
    return;
  }
  const email = this.signinForm.get('email')?.value;
   const password = this.signinForm.get('password')?.value;
   this.userServices.getUserByEmail(email as string).subscribe({
    next: (response)=>{
      if (response.length > 0 && response[0].password === password) {
        //localStorage.setItem('email',email as string);
        const user=response[0];
        const userId = response[0].id;

        console.log(user);
        
        let isAdmin:boolean = false;
        localStorage.setItem('userId',userId.toString());
        localStorage.setItem('CurrentUser',JSON.stringify(user));
        if(email==='admin@test.com'){
          this.authService.setAdmin();
          this.router.navigateByUrl('/admin');
        }
        else{
          this.authService.setUser();
          this.notification.showNotification('Signed in Successfully', 'green');
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 2000);
         
        }
      }
      else{
        
        this.notification.showNotification('Bad Credintials', 'red');
      }
      //this.authService.updateAuthStatus();
    },
    error: (error)=> {
      console.log(error);
      this.notification.showNotification('Signing in failed', 'red');
    }}
    )
}
notify(){
  return this.notification;
}
}
