import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {catchError, EMPTY, tap} from "rxjs";
import {User} from "../../../shared/models/User.model";
import {UserService} from "../../../shared/services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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
  cityForm!: FormGroup;

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
      this.authService.auth$.pipe(
        tap((user) => {
          this.user = user;
        })
      )

      this.cityForm = this.formBuilder.group({
        city:['', Validators.required]
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


      if(this.cityForm.valid){
        this.userService.updateUser(this.user.id, imgProfil, this.user.firstname, this.user.name, this.cityForm.getRawValue()).pipe(
          tap(()=>{
              this.router.navigate(['/accueil'])
          }),
          catchError((err) =>{
            return EMPTY
          })
        ).subscribe()
      }



  }
}
