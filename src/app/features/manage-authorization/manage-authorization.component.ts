import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";

@Component({
  selector: 'app-manage-authorization',
  templateUrl: './manage-authorization.component.html',
  styleUrls: ['./manage-authorization.component.scss']
})
export class ManageAuthorizationComponent implements OnInit {

  user!: any;
  planningCredentials!:any;
  planningCredentialsEmpty:boolean = true;
  constructor(private authService: AuthService, private planningService: PlanningService) { }

  ngOnInit(): void {

    //todo switchmap/forkmap?

   this.authService.auth$.subscribe((data)=>{
     this.user = data;
     console.log(data)
   })

    this.planningService.getShareUsersByPlanning(this.user.planningsByUserId[0].planningId).subscribe((data)=>{
      this.planningCredentials = data

      if(this.planningCredentials.length == 0){
        this.planningCredentialsEmpty = true;
      }else{
        this.planningCredentialsEmpty = false;
      }
      console.log(this.planningCredentials)
      console.log(this.planningCredentials.length)
    })

  }

  displayModal(userId: any) {
    
  }
}
