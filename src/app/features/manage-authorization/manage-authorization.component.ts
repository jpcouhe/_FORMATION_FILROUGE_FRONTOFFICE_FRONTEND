import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-authorization',
  templateUrl: './manage-authorization.component.html',
  styleUrls: ['./manage-authorization.component.scss']
})
export class ManageAuthorizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //todo récupérer liste des utilisateurs qui peuvent modifier NOTRE calendrier
  }

}
