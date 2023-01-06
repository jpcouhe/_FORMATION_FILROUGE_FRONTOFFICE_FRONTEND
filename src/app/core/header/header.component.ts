import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../../auth/container/signup/signup.component";
import {ProfilComponent} from "../../features/profil/profil.component";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {User} from "../../shared/models/User.model";
import {UserService} from "../../shared/services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanningService} from "../../shared/services/planning-service/planning.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{
  user!: any;
  displaySharedCalender: boolean = false;
  planningWithInteraction!: any
  planning!: any
  sub!:any
  id!:any

  constructor(private dialog : MatDialog, private authService: AuthService, private userService: UserService, private route: Router, private router: ActivatedRoute, private planningService: PlanningService) { }

  ngOnInit(): void {
    this.authService.auth$.subscribe((data) => {
      this.user = data
    })

    this.planningService.planningView$.subscribe((planning) => {
      this.planning = planning
    })

    this.userService.getPlanningWithInteraction(this.user.userId).subscribe((data)=>{
      this.planningWithInteraction = data
      if(this.planningWithInteraction.length == 0){
        this.displaySharedCalender = false
      }else{
        this.displaySharedCalender = true
      }
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
    this.route.navigateByUrl("/")
  }

  goToSharedCalendar(planningId: any) {
      this.route.navigateByUrl("accueil/calendar/" + planningId)
  }

  ngOnChanges(): void {
    this.user = this.authService.auth$.getValue()
    this.planningService.planningView$.getValue()
    console.log(this.planningService.planningView$.getValue())
    };


}
