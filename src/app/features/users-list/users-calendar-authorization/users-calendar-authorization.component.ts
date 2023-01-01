import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../../shared/services/planning-service/planning.service";

@Component({
  selector: 'app-users-calendar-authorization',
  templateUrl: './users-calendar-authorization.component.html',
  styleUrls: ['./users-calendar-authorization.component.scss']
})
export class UsersCalendarAuthorizationComponent implements OnInit {
  authorizationForm!: FormGroup

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private planningService: PlanningService, private dialog: MatDialog) { }

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

    if(read === true){
    this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 1)
    }

    if(write === true){
      this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 2)
    }

    if(modification === true){
      this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 3)
    }

    this.dialog.closeAll();
  }
}
