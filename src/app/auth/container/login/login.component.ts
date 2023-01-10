import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {catchError, EMPTY} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../shared/services/user-service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  error!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog, private snackBar:MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
  }


public submit() {

  if(this.form.valid){
    const email =  this.form.get("email")!.value;
    const password =  this.form.get("password")!.value;
    this.authService.login(email, password).pipe(
      catchError((error) => {

        this.error = error.message;
        this.snackBar.open("Invalid Login Credentials", 'Try again!', {
          duration:5000,
          verticalPosition:'top',
          panelClass: ['red-snackbar','login-snackbar'],
        })
        return EMPTY
      })).subscribe((user) => {
        this.userService.user$.next(user)
        this.router.navigateByUrl('/accueil/calendar')
    })
  }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    this.dialog.open(SignupComponent, dialogConfig)
  }
}




