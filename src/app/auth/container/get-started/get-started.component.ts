import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {catchError, EMPTY, forkJoin, mergeMap, mergeWith, Subscription, switchAll, switchMap, tap} from "rxjs";
import {User} from "../../../shared/models/User.model";
import {UserService} from "../../../shared/services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PlanningService} from "../../../shared/services/planning-service/planning.service";
import {GoogleMapsService} from "../../../shared/services/google-maps-service/google-maps.service";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  @ViewChild('addressText') addressText!: ElementRef;
  protected placeSubscription!: Subscription;
  user!: User;
  url!: string;
  popup: boolean = false;
  selectedFile: HTMLInputElement | undefined;
  updateForm!: FormGroup;
  calendarForm!: FormGroup;

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private planningService: PlanningService,private googleMapService: GoogleMapsService) { }

  ngOnInit(): void {


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

  ngAfterViewInit(): void {
    this.googleMapService.getPlaceAutocomplete(this.addressText);
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


      this.selectedFile ? (imgProfil = this.selectedFile) : (imgProfil = this.url.slice(28))

      let city;
      if(this.addressText.nativeElement.value){
         city = this.addressText.nativeElement.value;
      }else{
         city = this.updateForm.get("city")!.value;
      }
      const titlePlanning = this.updateForm.get('title')!.value;
      const descriptionPlanning = this.updateForm.get('description')!.value;
      const date = new Date()


      const picture = this.url;
      if(this.updateForm.valid){
        this.planningService.create(titlePlanning, descriptionPlanning, date, this.user.userId).subscribe()
        this.userService.updateUser(this.user.userId, this.user.userName, this.user.userFirstname, city, imgProfil).pipe(
          switchMap(() =>   this.userService.getUserById(this.user.userId)),
          catchError((err) =>{
            return EMPTY
          })
        ).subscribe(()=>{
          this.router.navigate(['/accueil/calendar'])
        })
      }
  }

  /*onAddressChange(value: string) {
    console.log(value)
    this.placeSubscription =
      this.googleMapService.placeObservable.subscribe(
        (place) => { console.log('nouvelle adresse : ' +
          place.formatted_address); }
      );
  }*/
}
