import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "../calendar/form-event/form-event.component";
import {
  UsersCalendarAuthorizationComponent
} from "./users-calendar-authorization/users-calendar-authorization.component";
import {UserService} from "../../shared/services/user-service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  filteredString: string = "";
  //todo filter avec userId
  private user: any;
  userList$! :Observable<any>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog, private userService : UserService) { }

  ngOnInit(): void {
    this.user = this.authService.auth$.getValue();
    this.userList$ = this.userService.getAllUsers(this.user.userId);

  }

  displayModal(userId: any) {

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
