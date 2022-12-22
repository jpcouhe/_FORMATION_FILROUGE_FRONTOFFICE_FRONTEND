import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";

@Component({
  selector: 'app-profil-delete',
  templateUrl: './profil-delete.component.html',
  styleUrls: ['./profil-delete.component.scss']
})
export class ProfilDeleteComponent implements OnInit {
  @Input() user!: User;
  constructor() { }

  ngOnInit(): void {
  }

  deleteUser() {
      //todo delete user route
  }
}
