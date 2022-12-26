import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  }, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title : [''],
      start: [''],
      end: ['']
    })
  }

  save() {
    console.log("salut je veux ajouter un événement")
    if(this.eventForm.valid){
        this.dialogRef.close(this.eventForm.value);
    }
  }
}
