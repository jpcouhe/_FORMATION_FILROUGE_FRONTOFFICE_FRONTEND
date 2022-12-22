import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";

@Component({
  selector: 'app-profil-password',
  templateUrl: './profil-password.component.html',
  styleUrls: ['./profil-password.component.scss']
})
export class ProfilPasswordComponent implements OnInit {
  @Input() user!: User;
  constructor() { }

  ngOnInit(): void {
  }

}
