import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-form-upd-planning',
  templateUrl: './form-upd-planning.component.html',
  styleUrls: ['./form-upd-planning.component.scss']
})
export class FormUpdPlanningComponent implements OnInit {

  planningForm!: FormGroup

  constructor(private dialogRef: MatDialogRef<FormUpdPlanningComponent>,@Inject(MAT_DIALOG_DATA) public data: {
    data:any;
  }, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.planningForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  save():void {
    if(this.planningForm.valid){
      this.dialogRef.close(this.planningForm.value);
    }
  }

}
