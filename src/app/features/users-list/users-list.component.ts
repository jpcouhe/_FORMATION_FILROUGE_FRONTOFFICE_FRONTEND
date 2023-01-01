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

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  filteredString: string = "";
  userList$ = this.userService.getAllUsers();
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog, private userService : UserService) { }

  ngOnInit(): void {
    //todo rechercher tout les utilisateurs
  }

  displayModal(userId: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    dialogConfig.data = userId
    this.dialog.open(UsersCalendarAuthorizationComponent, dialogConfig)
  }
}
