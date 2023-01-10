import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidityFormService} from "../../../shared/services/validify-form/validity-form.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  editEventForm!: FormGroup

  constructor(private dialogRef: MatDialogRef<EditEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb : FormBuilder,private validator: ValidityFormService) { }

  ngOnInit(): void {
    this.editEventForm = this.fb.group({
      title : ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: ['',  Validators.required],
    },{
      validator: this.validator.DateRangeValidator("start", "end")
    })
  }

  delete(eventId: string) {
    this.dialogRef.close(eventId)
  }

  get dateRangeError(): string {
    const form: FormControl = (this.editEventForm.get("end") as FormControl)
    return form.hasError("required") ? "Champs requis" : form.hasError('dateRange') ? "La date de fin ne doit pas être inférieur à la date du début" : ""
  }
}
