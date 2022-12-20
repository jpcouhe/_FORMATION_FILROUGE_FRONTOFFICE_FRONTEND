import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class ValidityFormService {

  createPasswordsStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if(!value){
        return null
      }

      const hasUppercase = /[A-Z]+/.test(value)
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const passwordValid = hasUppercase && hasLowerCase && hasNumeric;
      return !passwordValid ? {passwordStrength:true} : null;

    }
  }

  onlyTextValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if(!value) {
        return null;
      }

      const hasOnlyLetter =
        /^[a-zA-Z- áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸ\-ÆŒs]{2,15}$/.test(value);

      const textValid = hasOnlyLetter;

      return !textValid
        ? {
          isNumeric: true,
        }
        : null;
    }
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors["passwordMismatch"]) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return true;
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const email = /[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);

      const emailValid = email;

      return !emailValid
        ? {
          emailMatch: true,
        }
        : null;
    };
  }

}
