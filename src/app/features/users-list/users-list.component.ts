import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "../calendar/form-event/form-event.component";
import {
  UsersCalendarAuthorizationComponent
} from "./users-calendar-authorization/users-calendar-authorization.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  filteredString: string = "";
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    //todo rechercher tout les utilisateurs
  }

  displayModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    this.dialog.open(UsersCalendarAuthorizationComponent, dialogConfig)
  }
}
