import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidityFormService} from "../../../../shared/services/validify-form/validity-form.service";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profil-password',
  templateUrl: './profil-password.component.html',
  styleUrls: ['./profil-password.component.scss']
})
export class ProfilPasswordComponent implements OnInit {
  @Input() user!: User;

  passwordForm: FormGroup = this.fb.group({
    oldpassword:["", Validators.required],
    confirmNewPassword:["", Validators.required],
    newPassword: ["", [Validators.required, Validators.minLength(2), this.validator.createPasswordsStrengthValidator()]]
  }, {validators:this.validator.passwordMatchValidator("newPassword", "confirmNewPassword")});



  constructor(private fb : FormBuilder,private validator: ValidityFormService, private userService: UserService, private router: Router,  private dialog: MatDialog, private snackBar:MatSnackBar) { }


  ngOnInit(): void {
  }

  onSubmit() {

    if(this.passwordForm.valid){
        const oldPassword = this.passwordForm.get("oldpassword")!.value
        const newPassword = this.passwordForm.get("newPassword")!.value

      this.userService.updateUserPassword(this.user.userId!, oldPassword, newPassword).subscribe(()=>{
        this.snackBar.open("Changes up to date", '', {
          duration:5000,
          verticalPosition:'top',
          panelClass: ['green-snackbar'],
        })
          this.dialog.closeAll();
      }, ()=>{
        this.snackBar.open("Invalid Current Password", 'Try again!', {
          duration:5000,
          verticalPosition:'top',
          panelClass: ['red-snackbar','login-snackbar'],
        })
      })
    }
  }

  get passWordHasErrorMessage(): string {
    const form: FormControl = (this.passwordForm.get("newPassword") as FormControl)
    return form.hasError("required") ? "mot de passe requis" : form.hasError('passwordStrength') ? "Le mot de passe doit comporter 1 chiffre, 1 majuscule" : ""
  }

  get matchPasswordHasErrorMessage(): string {
    const form: FormControl = (this.passwordForm.get("confirmNewPassword") as FormControl)
    return form.hasError('passwordMismatch') ? "Les mots de passes ne correspondent pas" : ""
  }

}
