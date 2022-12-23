import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users-calendar-authorization',
  templateUrl: './users-calendar-authorization.component.html',
  styleUrls: ['./users-calendar-authorization.component.scss']
})
export class UsersCalendarAuthorizationComponent implements OnInit {
  authorizationForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authorizationForm = this.fb.group({
      read: [""],
      write:[""],
      modification:[""]
    })
  }

  onSubmit() {
    console.log("Todo request")
    //todo switch update en fonction du questionnaire : On passe l'id de l'utilisateur, celui du calendrier et les autorisation dans la table
  }
}
