import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {User} from "../../../shared/models/User.model";
import {UserService} from "../../../shared/services/user-service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  user!: User;
  url!: string;
  popup: boolean = false;
  selectedFile!: File | undefined;
  updateForm!: FormGroup;
  descriptionCharLength!: number

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private planningService: PlanningService,private googleMapService: GoogleMapsService) { }

  ngOnInit(): void {
      this.descriptionCharLength = 100;

      this.authService.auth$.pipe(
        tap((user) => {
          if(Object.entries(user).length !=0){
            this.user = user as User;
          }
        })
      ).subscribe();

      this.updateForm = this.formBuilder.group({
        city:['', Validators.required],
        title:['', [Validators.required, Validators.maxLength(50)]],
        description:['', [Validators.required, Validators.maxLength(100)]]
      })
  }

  ngAfterViewInit(): void {
    this.googleMapService.getPlaceAutocomplete(this.addressText);
  }

  setValueDescription(event: any) {
    const valueLength = event.target.value.length;
    this.descriptionCharLength = 100 - valueLength;
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

  setPopup() {
    this.popup = !this.popup
  }

  setFiles($event: any) {
    this.selectedFile = undefined;
    this.url = $event.target.currentSrc;
  }

  onSubmit() {
      let imgProfil: File | string;

      this.selectedFile ? (imgProfil = this.selectedFile) : (imgProfil = this.url.slice(28))

      let city: string;

      if(this.addressText.nativeElement.value){
         city = this.addressText.nativeElement.value;
      }else{
         city = this.updateForm.get("city")!.value;
      }
      const titlePlanning:string = this.updateForm.get('title')!.value;
      const descriptionPlanning:string = this.updateForm.get('description')!.value;
      const date: Date = new Date()

      if(this.updateForm.valid){
        this.planningService.create(titlePlanning, descriptionPlanning, date, this.user.userId!).subscribe()

        this.userService.updateUser(this.user.userId!, this.user.userName!, this.user.userFirstname!, city, imgProfil).pipe(
          switchMap(() =>   this.userService.getUserById(this.user.userId!)),
          catchError(() =>{
            return EMPTY
          })
        ).subscribe(()=>{
          this.router.navigate(['/accueil/calendar']).then()
        })
      }
  }

  get titleHasErrorMessage(): string {
    const form: FormControl = (this.updateForm.get('title') as FormControl) ;
    console.log(form)
    return  form.hasError('required') ? 'Titre requis' : form.hasError('maxlength') ? 'Pas plus de 50 caractères ': '';
  }

  get descriptionHasErrorMessage(): string {
    const form: FormControl = (this.updateForm.get('description') as FormControl) ;
    console.log(form)
    return  form.hasError('required') ? 'Description requise' : form.hasError('maxlength') ? 'Pas plus de 100 caractères ': '';
  }

}
