import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../shared/models/User.model";
import {catchError, EMPTY, Observable, switchMap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../shared/services/auth-service/auth.service";
import {GoogleMapsService} from "../../../../shared/services/google-maps-service/google-maps.service";

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.scss'],
})
export class ProfilUpdateComponent implements OnInit {
  @ViewChild('addressText') addressText!: ElementRef;
  @Input() user!: User;

  url!: string;
  profilForm!: FormGroup;
  selectedFile: File | undefined;
  constructor(private formBuilder: FormBuilder, private userService: UserService,private dialog: MatDialog, private snackBar:MatSnackBar, private authService: AuthService, private googleMapService: GoogleMapsService) { }

  ngOnInit(): void {
    this.url = "http://localhost:8080/files/" + this.user.userPicture
    this.profilForm = this.formBuilder.group({
      firstname: [this.user.userFirstname, Validators.required],
      lastname: [this.user.userName, Validators.required],
      city:[this.user.userCity, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.googleMapService.getPlaceAutocomplete(this.addressText);
  }

  onselectFile($event: Event) {
    const target = $event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(target.files[0])
      reader.onload = (event:any) => {
        this.url = event.target.result
      }
    }
  }

  saveProfil() {
      let imgProfil: File | string;
      this.selectedFile ? (imgProfil = this.selectedFile) : (imgProfil = this.url.slice(28))

      let city:string;
      if(this.addressText.nativeElement.value){
        city = this.addressText.nativeElement.value;
      }else{
        city = this.profilForm.get("city")!.value;
      }

    if(this.profilForm.valid){
      const firstname = this.profilForm.get("firstname")!.value
      const lastname = this.profilForm.get("lastname")!.value


      this.userService.updateUser(this.user.userId!, lastname, firstname, city, imgProfil).pipe(
        switchMap(() =>   this.userService.getUserById(this.user.userId!)),
        catchError(() => {
          this.snackBar.open("Impossible", 'Try again!', {
            duration:5000,
            verticalPosition:'top',
            panelClass: ['red-snackbar','login-snackbar'],
          })
          return EMPTY
        })).subscribe(()=>{
        this.snackBar.open("Changes up to date", '', {
          duration:5000,
          verticalPosition:'top',
          panelClass: ['green-snackbar'],
        })
        this.dialog.closeAll();
      })
    }
  }

}
