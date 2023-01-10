import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/User.model";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profil-delete',
  templateUrl: './profil-delete.component.html',
  styleUrls: ['./profil-delete.component.scss']
})
export class ProfilDeleteComponent implements OnInit {
  @Input() user!: User;
  constructor(private userService: UserService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  deleteUser() {
      this.userService.deleteUser(this.user.userId!).subscribe(() => {
          this.dialog.closeAll();
          this.router.navigateByUrl("/").then();
      })
  }
}
