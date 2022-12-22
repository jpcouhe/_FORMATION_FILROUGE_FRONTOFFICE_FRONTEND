import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidityFormService} from "../../../../shared/services/validify-form/validity-form.service";

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
  constructor(private fb : FormBuilder,private validator: ValidityFormService) { }

  ngOnInit(): void {
  }

  onSubmit() {
      //todo update user mot de passe
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
