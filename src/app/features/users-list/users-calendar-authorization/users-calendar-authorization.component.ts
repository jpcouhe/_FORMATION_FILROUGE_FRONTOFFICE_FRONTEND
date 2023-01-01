import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../../../shared/services/auth-service/auth.service";

@Component({
  selector: 'app-users-calendar-authorization',
  templateUrl: './users-calendar-authorization.component.html',
  styleUrls: ['./users-calendar-authorization.component.scss']
})
export class UsersCalendarAuthorizationComponent implements OnInit {
  authorizationForm!: FormGroup

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }

  ngOnInit(): void {
    this.authorizationForm = this.fb.group({
      read: [""],
      write:[""],
      modification:[""]
    })
  }

  onSubmit() {
    const read = this.authorizationForm.get('read')!.value
    const write = this.authorizationForm.get('write')!.value
    const modification = this.authorizationForm.get('modification')!.value

    console.log(read, "ecriture")
    console.log(write, "write")
    console.log(modification, "modification")
    //todo switch update en fonction du questionnaire : On passe l'id de l'utilisateur, celui du calendrier et les autorisation dans la table
  }
}
