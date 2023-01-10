import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  UsersCalendarAuthorizationComponent
} from "../users-list/users-calendar-authorization/users-calendar-authorization.component";
import {User} from "../../shared/models/User.model";
import {EMPTY, switchMap, tap} from "rxjs";
import {SharePlanning} from "../../shared/models/SharePlanning.model";

@Component({
  selector: 'app-manage-authorization',
  templateUrl: './manage-authorization.component.html',
  styleUrls: ['./manage-authorization.component.scss']
})
export class ManageAuthorizationComponent implements OnInit {

  user!: User;
  planningCredentials!:SharePlanning[];
  planningCredentialsEmpty:boolean = true;
  constructor(private authService: AuthService, private planningService: PlanningService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.auth$
      .pipe(
        tap((data)=>{
          if(Object.entries(data).length !=0){
            this.user = data as User;
          }
        }),
        switchMap(()=>{
          if(this.user.planningsByUserId !== undefined){
            return this.planningService.getShareUsersByPlanning(this.user.planningsByUserId[0].planningId!)
          }
          return EMPTY
        })
      ).subscribe((data)=>{
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

    if(this.user.planningsByUserId != undefined){
      dialogConfig.data = {
        userId,
        planningId: this.user.planningsByUserId[0].planningId
      }
    }
    this.dialog.open(UsersCalendarAuthorizationComponent, dialogConfig)
  }
}
