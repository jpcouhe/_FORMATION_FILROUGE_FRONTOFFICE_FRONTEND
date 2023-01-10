import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "../calendar/form-event/form-event.component";
import {
  UsersCalendarAuthorizationComponent
} from "./users-calendar-authorization/users-calendar-authorization.component";
import {UserService} from "../../shared/services/user-service/user.service";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {User} from "../../shared/models/User.model";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  filteredString: string = "";
  private user: any;

  users!: User[];
  subscription!: Subscription

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog, private userService : UserService) { }

  ngOnInit(): void {
    this.subscription = this.authService.auth$
      .pipe(
        tap((user:User | {})=>{
          this.user = user
        }),
        switchMap(()=>{
            return this.userService.getAllUsers(this.user.userId)
        })
      ).subscribe((data:User[])=>{
        this.users = data
      })
  }

  displayModal(userId: string) {
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
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
