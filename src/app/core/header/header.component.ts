import {Component, OnChanges, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProfilComponent} from "../../features/profil/profil.component";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {User} from "../../shared/models/User.model";
import {UserService} from "../../shared/services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Interaction} from "../../shared/models/Interaction.model";
import {tap} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{
  user!: User;
  displaySharedCalender: boolean = false;
  planningWithInteraction!: Interaction[]
  isParam!:any

  constructor(private router: ActivatedRoute, private dialog : MatDialog, private authService: AuthService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.authService.auth$.subscribe((data) => {
      if(Object.entries(data).length !=0){
        this.user = data as User;
      }
    })
    this.userService.getPlanningWithInteraction(this.user.userId).subscribe((data)=>{
      console.log(data)
      this.planningWithInteraction = data
      this.displaySharedCalender = this.planningWithInteraction.length != 0;
    })
  }


  displayProfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "auto";
    this.dialog.open(ProfilComponent, dialogConfig)
  }

  logout() {
    this.authService.logout()
    this.route.navigateByUrl("/").then()
  }

  goToSharedCalendar(planningId: any, name: string | undefined, firstname: string | undefined) {
      // this.route.navigateByUrl("accueil/calendar/" + planningId).then()
    this.route.navigate(['/accueil/calendar', planningId], {queryParams: {userName:name,userFirstname:firstname}})
  }

  ngOnChanges(): void {
    this.authService.auth$
      .pipe(
        tap((data)=>{
          if(Object.entries(data).length !=0){
            this.user = data as User;
          }
        })
      ).subscribe()
    };


}
