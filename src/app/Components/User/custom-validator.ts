// import { format } from 'date-fns';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function passwordConfirmationValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
export function passwordCorrectValidator(controlName: string, matchingPass: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(controlName);
      
  
      if (!passwordControl) {
        return null;
      }
    
   
      
      
      if ( passwordControl.value !== matchingPass) {
        passwordControl.setErrors({ passwordNotCorrect: true });
      } else {
        passwordControl.setErrors(null);
      }
  
      return null;
    };
}

function validateTypeDate(control: AbstractControl) {
  
  const value = control.value;
  // const dateFormat = 'yyyy-MM-dd';


  const currentDate = new Date();
  // const maxDate = format(currentDate, dateFormat);
  // console.log(maxDate); // Outputs: 2024-05-17
  const maxDate= `${currentDate.getFullYear() - 15}-01-01`;
  console.log(maxDate);
  
  //min date 01/01/1850 and max date today
  if (value == null || value == '' || value > maxDate) {
    return { date: true };
  } else {
    return null;
  }
}

export const userForm = new FormGroup({
  fName:     new FormControl("",[Validators.required,Validators.minLength(3)]),
  lName:     new FormControl("",[Validators.required,Validators.minLength(3)]),
  nationalID:new FormControl("",[Validators.required,Validators.pattern('^[0-9]+'),Validators.minLength(14)]),
  phoneNum:  new FormControl("",[Validators.required,Validators.pattern('^[0-9]+'),Validators.minLength(11)]),
  email:     new FormControl("",[Validators.required,Validators.email]),
  date_of_birth: new FormControl("" ,[Validators.required,validateTypeDate]),
  password:  new FormControl("",[Validators.required,Validators.minLength(8)]),
})