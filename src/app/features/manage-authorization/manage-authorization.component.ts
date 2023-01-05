import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";
import * as events from "events";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../../auth/container/signup/signup.component";
import {
  UsersCalendarAuthorizationComponent
} from "../users-list/users-calendar-authorization/users-calendar-authorization.component";

@Component({
  selector: 'app-manage-authorization',
  templateUrl: './manage-authorization.component.html',
  styleUrls: ['./manage-authorization.component.scss']
})
export class ManageAuthorizationComponent implements OnInit {

  user!: any;
  planningCredentials!:any;
  planningCredentialsEmpty:boolean = true;
  constructor(private authService: AuthService, private planningService: PlanningService, private dialog: MatDialog) { }

  ngOnInit(): void {

    //todo switchmap/forkmap?

   this.authService.auth$.subscribe((data)=>{
     this.user = data;
   })

    this.planningService.getShareUsersByPlanning(this.user.planningsByUserId[0].planningId).subscribe((data)=>{
      this.planningCredentials = data

      if(this.planningCredentials.length == 0){
        this.planningCredentialsEmpty = true;
      }else{
        this.planningCredentialsEmpty = false;
      }
    })

  }

  displayModal(userId:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    dialogConfig.data = {
      userId,
      planningId: this.user.planningsByUserId[0].planningId
    }
    this.dialog.open(UsersCalendarAuthorizationComponent, dialogConfig)
  }
}
