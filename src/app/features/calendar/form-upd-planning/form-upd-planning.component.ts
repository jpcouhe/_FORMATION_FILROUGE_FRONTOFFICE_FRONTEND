import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ValidityFormService} from "../../../shared/services/validify-form/validity-form.service";

@Component({
  selector: 'app-form-upd-planning',
  templateUrl: './form-upd-planning.component.html',
  styleUrls: ['./form-upd-planning.component.scss']
})
export class FormUpdPlanningComponent implements OnInit {

  planningForm!: FormGroup

  constructor(private dialogRef: MatDialogRef<FormUpdPlanningComponent>,@Inject(MAT_DIALOG_DATA) public data: {
    data:any;
  }, private fb : FormBuilder, private snackBar:MatSnackBar,  private validator: ValidityFormService) { }

  ngOnInit(): void {
    this.planningForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  save() {
    if(this.planningForm.valid){
      this.dialogRef.close(this.planningForm.value);
    }
  }

}
