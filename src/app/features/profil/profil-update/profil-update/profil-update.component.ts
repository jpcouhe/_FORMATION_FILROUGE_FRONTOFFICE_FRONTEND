import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.scss'],
})
export class ProfilUpdateComponent implements OnInit {

  @Input() user!: User;

  url: any;
  profilForm!: FormGroup;
  selectedFile: HTMLInputElement | undefined;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profilForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      city:['']
    });
  }

  onselectFile($event: any) {
    this.selectedFile = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  }

  saveProfil() {
      //todo update user
  }

}
