import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ValidityFormService} from "../../../shared/services/validify-form/validity-form.service";

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {
  eventForm!: FormGroup


  constructor( private dialogRef: MatDialogRef<FormEventComponent>,@Inject(MAT_DIALOG_DATA)
  public data: {
    data:any;
  }, private fb : FormBuilder, private snackBar:MatSnackBar,  private validator: ValidityFormService) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title : ['', Validators.required],
      start: ['', Validators.required],
      end: ['',  Validators.required],
    },{
      validator: this.validator.DateRangeValidator("start", "end")
    })
  }

  save() {
    if(this.eventForm.valid){

        this.dialogRef.close(this.eventForm.value);
    }
  }

  get dateRangeError(): string {
    const form: FormControl = (this.eventForm.get("end") as FormControl)
    return form.hasError("required") ? "Champs requis" : form.hasError('dateRange') ? "La date de fin ne doit pas être inférieur à la date du début" : ""
  }
}
