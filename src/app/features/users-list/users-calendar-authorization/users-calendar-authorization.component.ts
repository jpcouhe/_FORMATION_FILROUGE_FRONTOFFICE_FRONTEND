import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PlanningService} from "../../../shared/services/planning-service/planning.service";
import {InteractService} from "../../../shared/services/interact-service/interact.service";
import {BehaviorSubject, catchError, EMPTY, of, ReplaySubject, switchMap, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Interaction} from "../../../shared/models/Interaction.model";

@Component({
  selector: 'app-users-calendar-authorization',
  templateUrl: './users-calendar-authorization.component.html',
  styleUrls: ['./users-calendar-authorization.component.scss']
})
export class UsersCalendarAuthorizationComponent implements OnInit {

  error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  authorizationForm: FormGroup = this.fb.group({
    read: [false],
    write: [false],
    modification: [false]
  })

  interact!: Interaction[];
  isExist!: boolean;


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { userId:number, planningId:number }, private planningService: PlanningService, private dialog: MatDialog, private interactService: InteractService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.interactService.findByUserAndPlanning(this.data.userId, this.data.planningId).subscribe((dataPermission:Interaction[]) => {

      if (dataPermission.length > 0) {
        this.interact = dataPermission
        for (let i = 0; i < dataPermission.length; i++) {

          switch (this.interact[i].permissionsByPermissionId.permissionId) {
            case 1 : {
              this.authorizationForm.patchValue({
                read: true
              })
              break;
            }
            case 2 : {
              this.authorizationForm.patchValue({
                write: true
              })
              break;
            }
            case 3 : {
              this.authorizationForm.patchValue({
                modification: true
              })
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    });

  }


  onSubmit() {
    const read = this.authorizationForm.get('read')!.value
    const write = this.authorizationForm.get('write')!.value
    const modification = this.authorizationForm.get('modification')!.value


    if (read === true) {
      this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 1).pipe(catchError((err) => {
          this.error.next(true)
          return EMPTY
        })
      ).subscribe()
    }else{
        this.interactService.findInteractWithPlanning(this.data.userId, this.data.planningId, 1).pipe(
          tap(isExist => this.isExist = isExist),
          switchMap(isExist => isExist ? this.interactService.deleteInteractWithPlanning(this.data.userId, this.data.planningId, 1) : of(null))
        ).subscribe()
    }

    if (write === true) {
      this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 2).pipe(
        catchError(() => {
          this.error.next(true)
          return EMPTY
        })
      ).subscribe()
    }else{
      this.interactService.findInteractWithPlanning(this.data.userId, this.data.planningId, 2).pipe(
        tap(isExist => this.isExist = isExist),
        switchMap(isExist => isExist ? this.interactService.deleteInteractWithPlanning(this.data.userId, this.data.planningId, 2) : of(null))
      ).subscribe()
    }

    if (modification === true) {
      this.planningService.interactWithPlanning(this.data.userId, this.data.planningId, 3).pipe(catchError((err) => {
          this.error.next(true)
          return EMPTY
        })
      ).subscribe()
    } else {
      this.interactService.findInteractWithPlanning(this.data.userId, this.data.planningId, 3).pipe(
        tap(isExist => this.isExist = isExist),
        switchMap(isExist => isExist ? this.interactService.deleteInteractWithPlanning(this.data.userId, this.data.planningId, 3) : of(null))
      ).subscribe()
    }

    this.dialog.closeAll();
  }

  RemoveWritAndModifIfReadIsFalse($event: any) {
      if($event.checked === false) {
        this.authorizationForm.patchValue({
          write: false,
          modification: false
        })
      }
  }

  setReadIfWriteAndModify($event: any) {
    if ($event.checked === true) {
      this.authorizationForm.patchValue({
        read: true,
      })
    }
  }
}
