import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {catchError, EMPTY, forkJoin, mergeMap, mergeWith, switchAll, switchMap, tap} from "rxjs";
import {User} from "../../../shared/models/User.model";
import {UserService} from "../../../shared/services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PlanningService} from "../../../shared/services/planning-service/planning.service";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {

  user!: User;
  url!: string;
  popup: boolean = false;
  selectedFile: HTMLInputElement | undefined;
  updateForm!: FormGroup;
  calendarForm!: FormGroup;

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private planningService: PlanningService) { }

  ngOnInit(): void {
      //todo requete pour creer un calendrier avec description

      this.authService.auth$.pipe(
        tap((user) => {
          this.user = user;
        })
      ).subscribe();

      this.updateForm = this.formBuilder.group({
        city:['', Validators.required],
        title:['', Validators.required],
        description:['', Validators.required]
      })
  }

  onselectFile($event: any) {
      this.selectedFile = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL($event.target.files[0])
      reader.onload = (event:any) => {
        this.url = event.target.result
      }

  }

  setPopup() {
    this.popup = !this.popup
  }

  setFiles($event: any) {
    this.selectedFile = undefined;
    this.url = $event.target.currentSrc;
  }

  onSubmit() {
      let imgProfil;
      this.selectedFile ? (imgProfil = this.selectedFile) : (imgProfil = this.url)
      //todo gerer les images
      const city = this.updateForm.get("city")!.value;
      const titlePlanning = this.updateForm.get('title')!.value;
      const descriptionPlanning = this.updateForm.get('description')!.value;
      const date = new Date()


      const picture = null;
      if(this.updateForm.valid){
        this.planningService.create(titlePlanning, descriptionPlanning, date, this.user.userId).subscribe()

        //todo Ne me plait pas le getUserById
        this.userService.updateUser(this.user.userId, this.user.username, this.user.userFirstname, city, picture).pipe(
          tap((user)=>{
              this.userService.getUserById(this.user.userId);
              console.log(this.userService.user$.getValue())
              this.router.navigate(['/accueil/calendar'])
          }),
          catchError((err) =>{
            return EMPTY
          })
        ).subscribe()
      }

      //todo requete pour creer un calendrier avec description



  }
}
