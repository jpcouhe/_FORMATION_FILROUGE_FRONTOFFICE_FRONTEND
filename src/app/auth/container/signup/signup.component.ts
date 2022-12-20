import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidityFormService} from "../../../shared/services/validify-form/validity-form.service";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMsg!: string;


  constructor(private formBuilder: FormBuilder, private validator: ValidityFormService, private authService: AuthService, private router:Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname:[null, [Validators.required, Validators.minLength(2), this.validator.onlyTextValidator()]],
      name:[null, [Validators.required, Validators.minLength(2),this.validator.onlyTextValidator()]],
      emailSignup:[null, [Validators.required, this.validator.emailValidator()]],
      passwordSignup:[null, [Validators.required, this.validator.createPasswordsStrengthValidator()]],
      matchPasswordSignup:[null, Validators.required]
    },
      {
       validator :this.validator.passwordMatchValidator("passwordSignup", "matchPasswordSignup")
      }
      )
  }
  get firstnameHasErrorMessage(): string {
    const form: FormControl = (this.signupForm.get('firstname') as FormControl) ;
    return form.hasError('required') ? 'prénom requis' : form.hasError('isNumeric') ? 'Pas de chiffre dans le prénom' : form.hasError('minlength') ? 'Min length error' : '';
  }

  get NameHasErrorMessage(): string {
    const form: FormControl = (this.signupForm.get('name') as FormControl);
    return form.hasError('required') ? 'nom requis' : form.hasError('isNumeric') ? 'Pas de chiffre dans le nom' : form.hasError('minlength') ? 'Min length error' : '';
  }

  get passWordHasErrorMessage(): string {
    const form: FormControl = (this.signupForm.get("passwordSignup") as FormControl)
    return form.hasError("required") ? "mot de passe requis" : form.hasError('passwordStrength') ? "Le mot de passe doit comporter 1 chiffre, 1 majuscule" : ""
  }

  get emailHasErrorMessage(): string {
    const form: FormControl = (this.signupForm.get("emailSignup") as FormControl)
    return form.hasError("required") ? "email requis" : form.hasError('emailMatch') ? "Veuillez renseigner un format valide" : ""
  }

  get matchPasswordHasErrorMessage(): string {
    const form: FormControl = (this.signupForm.get("matchPasswordSignup") as FormControl)
    return form.hasError('passwordMismatch') ? "Les mots de passes ne correspondent pas" : ""
  }

  onSubmit() {
    if(this.signupForm.valid){
      const firstname =  this.signupForm.get("firstname")!.value;
      const name =  this.signupForm.get("name")!.value;
      const email =  this.signupForm.get("emailSignup")!.value;
      const password =  this.signupForm.get("passwordSignup")!.value;
      this.authService.signup(firstname, name, email, password).pipe(
        switchMap(()=> this.authService.login(email, password)),
        tap(()=>{
          this.router.navigate(["/register/get-started"])
          this.closeTab()
        }),
        catchError((error) => {
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe()
    }
  }

  closeTab() {
      this.dialog.closeAll()
  }
}
