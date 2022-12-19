import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {catchError, EMPTY, of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  error!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


public submit() {
  /*  if(this.form.valid){
        this.authService.login(this.form.getRawValue()).subscribe((resultat) => {
          if(!resultat){
            this.form.controls['email'].setErrors({
              login: true
            })
          }else{
            this.router.navigateByUrl('/accueil/')
          }
        })
    }*/

  if(this.form.valid){
    this.authService.login(this.form.getRawValue()).pipe(
      catchError((error) => {
        this.error = error.message;
        return EMPTY
      })).subscribe((resultat) => {
        this.router.navigateByUrl('/accueil/')
    })
  }
  }

/*  get hasLoginError(): boolean {
    return this.form.controls['email'].hasError('login')
  }*/
}




